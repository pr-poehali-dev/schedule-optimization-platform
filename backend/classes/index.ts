import pg from 'pg';

const { Client } = pg;

interface CloudFunctionEvent {
    httpMethod: string;
    body?: string;
    queryStringParameters?: Record<string, string>;
}

const DATABASE_URL = process.env.DATABASE_URL;

export const handler = async (event: CloudFunctionEvent): Promise<any> => {
    const { httpMethod, body, queryStringParameters } = event;

    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token'
            },
            body: '',
            isBase64Encoded: false
        };
    }

    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    try {
        const client = new Client({ connectionString: DATABASE_URL });
        await client.connect();

        if (httpMethod === 'GET') {
            const schoolId = queryStringParameters?.school_id || '1';
            const result = await client.query(`SELECT * FROM classes WHERE school_id = ${schoolId} ORDER BY grade, name`);
            await client.end();
            return {
                statusCode: 200,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ classes: result.rows })
            };
        }

        if (httpMethod === 'POST') {
            const data = JSON.parse(body || '{}');
            const { name, grade, students_count, school_id } = data;
            const result = await client.query(`
                INSERT INTO classes (school_id, name, grade, students_count)
                VALUES (${school_id || 1}, '${name}', ${grade}, ${students_count || 0})
                RETURNING *
            `);
            await client.end();
            return {
                statusCode: 201,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ class: result.rows[0] })
            };
        }

        await client.end();
        return { statusCode: 405, headers, isBase64Encoded: false, body: JSON.stringify({ error: 'Method not allowed' }) };
    } catch (error: any) {
        return { statusCode: 500, headers, isBase64Encoded: false, body: JSON.stringify({ error: error.message }) };
    }
};