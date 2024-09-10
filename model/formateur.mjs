import bcrypt from 'bcryptjs';

export const getFormateurByEmail = async (email, db) => {
    try {
        const [results] = await db.query('SELECT * FROM Formateur WHERE email = ?', [email]);
        if (results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
};


export const createFormateur = async (user, db) => {
    try {
        const sql = `
            INSERT INTO Formateur (firstName, lastName, date_de_naissance, specialite, adresse, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [
            user.firstName, 
            user.lastName, 
            user.date_de_naissance, 
            user.specialite, 
            user.adresse, 
            user.email, 
            user.password
        ]);
        console.log('User successfully inserted');
    } catch (err) {
        console.error('Database insert error:', err);
        throw err;
    }
};

// Function to compare passwords
export const comparePassword = (enteredPassword, storedPassword) => {
    return bcrypt.compareSync(enteredPassword, storedPassword);
};
