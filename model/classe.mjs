import db from '../config/db.config.mjs';

export const createNewClass = async (className, formateurId) => {
    try {
        console.log('Preparing to insert class:', { className, formateurId });
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
        console.log('Class count:', rows[0].count); // Debugging
        return rows[0].count > 0;
    } catch (err) {
        console.error('Error checking if class already exists:', err);
        throw err;
    }
};

