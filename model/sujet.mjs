import db from '../config/db.config.mjs';

class SubjectModel {
    // Create a subject or sub-subject
    static async createSubject(title, description, parent_id = null, formateur_id) {
        try {
            const sql = `INSERT INTO Sujet (title, description, parent_id, formateur_id)
                         VALUES (?, ?, ?, ?)`;
            const [result] = await db.query(sql, [title, description, parent_id, formateur_id]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating subject:', error);
            throw new Error('Error creating subject');
        }
    }




    // Fetch all Subjects and subs
    static async getAllSubjects() {
        try {
            const [rows] = await db.query(`SELECT * FROM Sujet`);
            return rows;
        } catch (error) {
            console.error('Error fetching subjects:', error);
            throw new Error('Error fetching subjects');
        }
    }

    // Fetch only Subjects (where parent_id is NULL)
    static async getParents() {
        try {
            const [rows] = await db.query(`SELECT * FROM Sujet WHERE parent_id IS NULL`);
            return rows;
        } catch (error) {
            console.error('Error fetching subjects:', error);
            throw new Error('Error fetching subjects');
        }
    }

    // Fetch Subject by id
    // Fetch Subject by id
    static async getSubjectbyId(id) {
        try {
            // Validate id: ensure it is a number
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
                throw new Error(`Invalid id: ${id}`);
            }

            const sql = `SELECT * FROM sujet WHERE id = ?`;
            const [rows] = await db.query(sql, [parsedId]);

            // Check if subject exists
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching subject:', error);
            throw new Error('Error fetching subject');
        }
    }


    // Get sub-subjects for a Subject
    static async getSubsForSubject(id) {
        try {
            const sql = `SELECT * FROM Sujet WHERE parent_id = ?`;
            const [rows] = await db.query(sql, [parseInt(id)]);
            return rows;
        } catch (error) {
            console.error('Error fetching subject:', error);
            throw new Error('Error fetching subject');
        }
    }

    // Update a subject or sub-subject
    static async updateSubject(id, title, description, parent_id) {
        try {
            const sql = `UPDATE Sujet
                       SET title = ?, description = ?, parent_id = ?
                       WHERE id = ?`;
            const [result] = await db.query(sql, [title, description, parent_id, parseInt(id)]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating subject:', error);
            throw new Error('Error updating subject');
        }
    }

    // Delete Subject or Sub-subject
    static async deleteSubject(id) {
        try {
            const sql = `DELETE FROM Sujet WHERE id = ?`;
            const [result] = await db.query(sql, [parseInt(id)]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting subject:', error);
            throw new Error('Error deleting subject');
        }
    }
}

export default SubjectModel;
