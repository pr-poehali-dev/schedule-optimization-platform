const pg = require('pg');
const { Client } = pg;
const DATABASE_URL = process.env.DATABASE_URL;

exports.handler = async (event) => {
    const { httpMethod, queryStringParameters } = event;

    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: '',
            isBase64Encoded: false
        };
    }

    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    if (httpMethod === 'GET') {
        try {
            const client = new Client({ connectionString: DATABASE_URL });
            await client.connect();

            const schoolId = queryStringParameters?.school_id || '1';

            const teachersCount = await client.query(`SELECT COUNT(*) as count FROM teachers WHERE school_id = ${schoolId} AND is_active = true`);
            const classesCount = await client.query(`SELECT COUNT(*) as count FROM classes WHERE school_id = ${schoolId}`);
            const subjectsCount = await client.query(`SELECT COUNT(*) as count FROM subjects WHERE school_id = ${schoolId}`);

            await client.end();

            return {
                statusCode: 200,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({
                    teachers: parseInt(teachersCount.rows[0].count),
                    classes: parseInt(classesCount.rows[0].count),
                    subjects: parseInt(subjectsCount.rows[0].count),
                    schedules: 0
                })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers,
                isBase64Encoded: false,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    return { statusCode: 405, headers, isBase64Encoded: false, body: JSON.stringify({ error: 'Method not allowed' }) };
};