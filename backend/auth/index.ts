import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pg from 'pg';

const { Client } = pg;

interface CloudFunctionEvent {
    httpMethod: string;
    headers: Record<string, string>;
    queryStringParameters?: Record<string, string>;
    body?: string;
    isBase64Encoded: boolean;
}

interface CloudFunctionContext {
    requestId: string;
    functionName: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'ustaztime-secret-key-2025';
const DATABASE_URL = process.env.DATABASE_URL;

async function getDbClient() {
    const client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    return client;
}

export const handler = async (event: CloudFunctionEvent, context: CloudFunctionContext): Promise<any> => {
    const { httpMethod, body } = event;

    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            body: '',
            isBase64Encoded: false
        };
    }

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    if (httpMethod === 'POST') {
        try {
            const data = JSON.parse(body || '{}');
            const { email, password, action } = data;

            if (!email || !password) {
                return {
                    statusCode: 400,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ error: 'Email and password required' })
                };
            }

            const client = await getDbClient();

            if (action === 'register') {
                const checkQuery = `SELECT id FROM users WHERE email = '${email}'`;
                const existing = await client.query(checkQuery);

                if (existing.rows.length > 0) {
                    await client.end();
                    return {
                        statusCode: 409,
                        headers,
                        isBase64Encoded: false,
                        body: JSON.stringify({ error: 'User already exists' })
                    };
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const insertQuery = `
                    INSERT INTO users (email, password_hash, full_name, role) 
                    VALUES ('${email}', '${hashedPassword}', '${data.full_name || 'Пользователь'}', '${data.role || 'teacher'}') 
                    RETURNING id, email, full_name, role, created_at
                `;
                const result = await client.query(insertQuery);
                const user = result.rows[0];

                const token = jwt.sign(
                    { userId: user.id, email: user.email, role: user.role },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                await client.end();

                return {
                    statusCode: 201,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ 
                        token, 
                        user: {
                            id: user.id,
                            email: user.email,
                            fullName: user.full_name,
                            role: user.role
                        }
                    })
                };
            }

            const query = `SELECT id, email, password_hash, full_name, role FROM users WHERE email = '${email}'`;
            const result = await client.query(query);

            if (result.rows.length === 0) {
                await client.end();
                return {
                    statusCode: 401,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ error: 'Invalid credentials' })
                };
            }

            const user = result.rows[0];
            const isValid = await bcrypt.compare(password, user.password_hash);

            if (!isValid) {
                await client.end();
                return {
                    statusCode: 401,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ error: 'Invalid credentials' })
                };
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            await client.end();

            return {
                statusCode: 200,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ 
                    token, 
                    user: {
                        id: user.id,
                        email: user.email,
                        fullName: user.full_name,
                        role: user.role
                    }
                })
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    return {
        statusCode: 405,
        headers,
        isBase64Encoded: false,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};