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
}

const DATABASE_URL = process.env.DATABASE_URL;

async function getDbClient() {
    const client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    return client;
}

export const handler = async (event: CloudFunctionEvent, context: CloudFunctionContext): Promise<any> => {
    const { httpMethod, body, queryStringParameters } = event;

    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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

    try {
        const client = await getDbClient();

        if (httpMethod === 'GET') {
            const schoolId = queryStringParameters?.school_id || '1';
            const query = `
                SELECT id, first_name, last_name, middle_name, email, phone, 
                       is_active, created_at 
                FROM teachers 
                WHERE school_id = ${schoolId}
                ORDER BY last_name, first_name
            `;
            const result = await client.query(query);
            await client.end();

            return {
                statusCode: 200,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ teachers: result.rows })
            };
        }

        if (httpMethod === 'POST') {
            const data = JSON.parse(body || '{}');
            const { first_name, last_name, middle_name, email, phone, school_id } = data;

            if (!first_name || !last_name) {
                await client.end();
                return {
                    statusCode: 400,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ error: 'First name and last name required' })
                };
            }

            const query = `
                INSERT INTO teachers (school_id, first_name, last_name, middle_name, email, phone)
                VALUES (${school_id || 1}, '${first_name}', '${last_name}', '${middle_name || ''}', '${email || ''}', '${phone || ''}')
                RETURNING *
            `;
            const result = await client.query(query);
            await client.end();

            return {
                statusCode: 201,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ teacher: result.rows[0] })
            };
        }

        if (httpMethod === 'PUT') {
            const data = JSON.parse(body || '{}');
            const { id, first_name, last_name, middle_name, email, phone, is_active } = data;

            if (!id) {
                await client.end();
                return {
                    statusCode: 400,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ error: 'ID required' })
                };
            }

            const query = `
                UPDATE teachers 
                SET first_name = '${first_name}', 
                    last_name = '${last_name}', 
                    middle_name = '${middle_name || ''}',
                    email = '${email || ''}',
                    phone = '${phone || ''}',
                    is_active = ${is_active !== undefined ? is_active : true}
                WHERE id = ${id}
                RETURNING *
            `;
            const result = await client.query(query);
            await client.end();

            return {
                statusCode: 200,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ teacher: result.rows[0] })
            };
        }

        if (httpMethod === 'DELETE') {
            const id = queryStringParameters?.id;
            if (!id) {
                await client.end();
                return {
                    statusCode: 400,
                    headers,
                    isBase64Encoded: false,
                    body: JSON.stringify({ error: 'ID required' })
                };
            }

            const query = `UPDATE teachers SET is_active = false WHERE id = ${id}`;
            await client.query(query);
            await client.end();

            return {
                statusCode: 200,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ success: true })
            };
        }

        await client.end();
        return {
            statusCode: 405,
            headers,
            isBase64Encoded: false,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            headers,
            isBase64Encoded: false,
            body: JSON.stringify({ error: error.message })
        };
    }
};