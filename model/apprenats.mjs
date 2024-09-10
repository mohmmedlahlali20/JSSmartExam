import bcrypt from 'bcryptjs';
import db from '../config/db.config.mjs';

const saltRounds = 10;

export class Apprenants {
    // Add students to the database
    static async addEtudiants(etudiants, classeId) {
        try {
            const sql = `
                INSERT INTO Apprenants (firstname, lastname, email, password, date_de_naissance, date_inscription, adresse, classe_id)
                VALUES (?,?,?,?,?,?,?,?)
            `;

            const queries = etudiants.map(async (etudiant) => {
                const hashedPassword = await bcrypt.hash(etudiant.password, saltRounds);
                return db.query(sql, [
                    etudiant.firstname,
                    etudiant.lastname,
                    etudiant.email,
                    hashedPassword,
                    etudiant.date_de_naissance,
                    etudiant.date_inscription,
                    etudiant.adresse,
                    classeId
                ]);
            });

            const results = await Promise.all(queries);
            return results;
        } catch (error) {
            console.error('Error inserting students:', error);
            throw error;
        }
    }

    // Fetch all students
    static async getAllApprenants() {
        try {
            const [rows] = await db.query('SELECT * FROM Apprenants');
            return rows;
        } catch (error) {
            console.error('Error fetching Apprenants:', error);
            throw error;
        }
    }

    // Fetch a student by ID
    static async getApprenantById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Apprenants WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching Apprenant:', error);
            throw error;
        }
    }

    // Update a student's details
    static async updateApprenant(id, updatedApprenant) {
        try {
            const hashedPassword = await bcrypt.hash(updatedApprenant.password, saltRounds);
            const [rows] = await db.query('UPDATE Apprenants SET firstname = ?, lastname = ?, email = ?, password = ?, date_de_naissance = ?, date_inscription = ?, adresse = ? WHERE id = ?', [
                updatedApprenant.firstname,
                updatedApprenant.lastname,
                updatedApprenant.email,
                hashedPassword,
                updatedApprenant.date_de_naissance,
                updatedApprenant.date_inscription,
                updatedApprenant.adresse,
                id
            ]);
            return rows;
        } catch (error) {
            console.error('Error updating Apprenant:', error);
            throw error;
        }
    }

    // Delete a student
    static async deleteApprenant(id) {
        try {
            const [rows] = await db.query('DELETE FROM Apprenants WHERE id = ?', [id]);
            return rows;
        } catch (error) {
            console.error('Error deleting Apprenant:', error);
            throw error;
        }
    }

    static async getApprenantsByClasse(classeId) {
        try {
            const [rows] = await db.query('SELECT * FROM Apprenants WHERE classe_id = ?', [classeId]);
            return rows;
        } catch (error) {
            console.error('Error fetching Apprenants by Classe:', error);
            throw error;
        }
    }

    // Fetch students by formateur
    static async getApprenantsByFormateur(formateurId) {
        try {
            const [rows] = await db.query('SELECT Apprenants.* FROM Apprenants INNER JOIN Classe ON Apprenants.classe_id = Classe.id WHERE Classe.formateur_id = ?', [formateurId]);
            return rows;
        } catch (error) {
            console.error('Error fetching Apprenants by Formateur:', error);
            throw error;
        }
    }
}
