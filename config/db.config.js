
const mysql = require('mysql2');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    /**
     * Connect to the database.
     * 
     * This function connects to the database server specified in the
     * constructor. If the connection is successful, it logs a success message
     * to the console. If the connection fails, it logs an error message to the
     * console.
     */

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }
            console.log('Connected to database.');
        });
    }

    /**
     * Execute a SQL query on the database.
     * 
     * This function takes a SQL query string and an optional array of
     * arguments to be passed to the query. It returns a Promise that resolves
     * with the query results, or rejects with an error if the query fails.
     * 
     * @param {string} sql - A SQL query string.
     * @param {array} args - An array of arguments to pass to the query.
     * @returns {Promise} A Promise that resolves with the query results, or
     * rejects with an error if the query fails.
     */
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Database;
