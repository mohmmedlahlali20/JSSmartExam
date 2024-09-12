import bcrypt from 'bcryptjs';
import db from '../config/db.config.mjs';

const saltRounds = 10;

export class Apprenants {
    static async addEtudiants(etudiants) {
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
                etudiant.classe_id, 
                etudiant.firstname,
                etudiant.lastname,

                console.log('Inserting student:', {
                    email: etudiant.email,
                    password: hashedPassword,
                    date_de_naissance: etudiant.date_de_naissance,
                    date_inscription: etudiant.date_inscription,
                    adresse: etudiant.adresse, // Log the address value
                    classe_id: etudiant.classe_id,
                    firstname: etudiant.firstname,
                    lastname: etudiant.lastname
                })
            ]);
        });

        
        await Promise.all(queries); 
    } catch (error) {
        console.error('Error adding students:', error);
        throw error;
    }
}



static async updateApprenant (id, updatedData) {
    const { firstname, lastname, email, password, date_de_naissance, date_inscription, adresse } = updatedData;
    try {
        const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : null;

        const [result] = await db.query(
            'UPDATE Apprenants SET firstname = ?, lastname = ?, email = ?, password = IFNULL(?, password), date_de_naissance = ?, date_inscription = ?, adresse = ? WHERE id = ?',
            [firstname, lastname, email, hashedPassword, date_de_naissance, date_inscription, adresse, id]
        );
        return result;
    } catch (error) {
        throw new Error('Error updating apprenant: ' + error.message);
    }
};
    static async deleteApprenant(id) {
        try {
            const [result] = await db.query('DELETE FROM Apprenants WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error('Error deleting Apprenant:', error);
            throw error;
        }
    }

         static async getAllApprenants(classeId) {
        try {
            const query = `
                SELECT a.id, a.email, a.date_de_naissance, a.date_inscription, a.adresse, a.firstname, a.lastname, c.name as classe_name 
                FROM Apprenants a 
                JOIN Classe c ON a.classe_id = c.id
                WHERE a.classe_id = ?;
            `;
            const [rows] = await db.query(query, [classeId]);
            return rows;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }

    // static async getApprenantsByClasse(classeId) {
    //     try {
    //         const [rows] = await db.query('SELECT * FROM Apprenants WHERE classe_id = ?', [classeId]);
    //         console.log(classeId)
    //         return rows;
    //     } catch (error) {
    //         console.error('Error fetching Apprenants by Classe:', error);
    //         throw error;
    //     }
    // }

    // static async getApprenantsByFormateur(formateurId) {
    //     try {
    //         const [rows] = await db.query('SELECT Apprenants.* FROM Apprenants INNER JOIN Classe ON Apprenants.classe_id = Classe.id WHERE Classe.formateur_id = ?', [formateurId]);
    //         return rows;
    //     } catch (error) {
    //         console.error('Error fetching Apprenants by Formateur:', error);
    //         throw error;
    //     }
    // }
   
    // static async getApprenantById(id) {
    //     try {
    //         const [rows] = await db.query('SELECT * FROM Apprenants WHERE id = ?', [id]);
    //         return rows[0];
    //     } catch (error) {
    //         console.error('Error fetching Apprenant:', error);
    //         throw error;
    //     }
    // }
}
