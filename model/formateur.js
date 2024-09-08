const bcrypt = require('bcryptjs');

exports.getUserByEmail = (email, db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Formateur WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};
exports.createUser = (user, db) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO Formateur (firstName, lastName, date_de_naissance, specialite, adresse, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user.firstName, user.lastName, user.date_de_naissance, user.specialite, user.adresse, user.email, user.password],
            (err) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return reject(err);
                }
                console.log('User successfully inserted');
                resolve();
            }
        );
    });
};


exports.comparePassword = (enteredPassword, storedPassword) => {
    return bcrypt.compareSync(enteredPassword, storedPassword);
};
