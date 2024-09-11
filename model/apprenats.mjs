import bcrypt from 'bcryptjs';
import db from '../config/db.config.mjs';

const saltRounds = 10;

export class Apprenants {
    static async addEtudiants(etudiants, classeId) {
        try {
            const sql = `
                INSERT INTO Apprenants (
                    email, 
                    password, 
                    date_de_naissance, 
                    date_inscription, 
                    adresse, 
                    classe_id, 
                    firstname, 
                    lastname
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
    
            const queries = etudiants.map(async (etudiant) => {
                const hashedPassword = await bcrypt.hash(etudiant.password, saltRounds);
                return db.query(sql, [
                    etudiant.email,
                    hashedPassword,
                    etudiant.date_de_naissance,
                    etudiant.date_inscription,
                    etudiant.adresse,
                    classeId,
                    etudiant.firstname,
                    etudiant.lastname
                ]);
            });
            await Promise.all(queries);  // Assurez-vous que toutes les requêtes sont résolues
        } catch (error) {
            console.error('Error adding students:', error);
            throw error;
        }
    }
    
    
    

    static async getAllApprenants() {
        try {
            const [rows] = await db.query('SELECT * FROM Apprenants');
            return rows;
        } catch (error) {
            console.error('Error fetching Apprenants:', error);
            throw error;
        }
    }

    static async getApprenantById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Apprenants WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching Apprenant:', error);
            throw error;
        }
    }

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
