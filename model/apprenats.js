const bcrypt = require('bcryptjs');
const saltRounds = 10;

const addEtudaints = async (db, etudaints, classeId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO Apprenants (fisrtname, lasttname, email, password, date_de_naissance, date_inscription, adresse, classe_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const queries = etudaints.map((etudiant) =>
            new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = await bcrypt.hash(etudiant.password, saltRounds);
                    
                    db.query(sql, [
                        etudiant.fisrtname,
                        etudiant.lasttname,
                        etudiant.email,
                        hashedPassword,
                        etudiant.date_de_naissance,
                        etudiant.date_inscription,
                        etudiant.adresse,
                        classeId
                    ], (err, result) => {
                        if (err) {
                            console.error('Database insert error:', err);
                            return reject(err);
                        }
                        resolve(result);
                    });
                } catch (err) {
                    console.error('Hashing error:', err);
                    reject(err);
                }
            })
        );

        Promise.all(queries)
            .then((results) => resolve(results))
            .catch((err) => {
                console.error('Error with Promise.all:', err);
                reject(err);
            });
    });
};





module.exports = {
    addEtudaints
};
