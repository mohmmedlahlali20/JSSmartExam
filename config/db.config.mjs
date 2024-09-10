import mysql from 'mysql2/promise';

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'mohammed',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'JSSmartExam',
});

export default db;
