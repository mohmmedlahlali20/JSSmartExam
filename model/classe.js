const db = require('../config/db.config'); 

exports.createClass = (className) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Classes (name) VALUES (?)';
        db.query(sql, [className], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
