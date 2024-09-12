import db from '../config/db.config.mjs';

export const createNewClass = async (className, formateurId) => {
    try {
        const [existingClass] = await db.query('SELECT * FROM Classe WHERE formateur_id = ?', [formateurId]);
        if (existingClass.length > 0) {
            throw new Error('Formateur already has a class');
        }
        // console.log('DB Object:', db);

        const sql = 'INSERT INTO Classe (name, formateur_id) VALUES (?, ?)';
        const [result] = await db.query(sql, [className, formateurId]);
        console.log('Insert result:', result);
        return result;
    } catch (err) {
        console.error('Error creating class:', err);
        throw err;
    }
}

export const alreadyHaveClasse = async (formateurId) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as count FROM Classe WHERE formateur_id = ?', [formateurId]);
        console.log('Class count:', rows[0].count);
        return rows[0].count > 0;
    } catch (err) {
        console.error('Error checking if class already exists:', err);
        throw err;
    }
};


// export const getFormateurIdByClassId = async (classId, db) => {
//     try {
//         const [rows] = await db.query('SELECT formateur_id FROM Classe WHERE id = ?', [classId]);
//         if (rows.length > 0) {
//             return rows[0].formateur_id;
//         } else {
//             throw new Error('Class not found');
//         }
//     } catch (error) {
//         console.error('Error fetching formateur ID by class ID:', error);
//         throw error;
//     }
// };

