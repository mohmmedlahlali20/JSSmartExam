import bcrypt from 'bcryptjs';
import db from '../config/db.config.mjs';


export class Formateur {

    static getFormateurByEmail = async (email, db) => {
        const [rows] = await db.query('SELECT * FROM Formateur WHERE email = ?', [email]);
        return rows[0];
    };
    
    
    
    
    
    static createFormateur = async (user, db) => {
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
    
    static comparePassword = async (enteredPassword, storedPassword) => {
        return bcrypt.compare(enteredPassword, storedPassword);
    };
    
    
    static getClassByFormateurID = async (formateurId) => {
        try {
            const [rows] = await db.query('SELECT * FROM Classe WHERE formateur_id = ?', [formateurId]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching class by formateur ID:', error);
            throw error;
        }
    };



}


