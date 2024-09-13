import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'mohammed',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'JSSmartExam',
    connectionLimit: 10, 
    waitForConnections: true,
    queueLimit: 0 
});

const checkConnection = async () => {
    try {
        await db.query('SELECT 1');
        console.log('Database connected successfully.');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

checkConnection();

export default db;