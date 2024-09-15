import db from '../config/db.config.mjs';

class QuestionModel 
{
    // Create a Qestion
    static async createQst(type, question, points, nbr_reponse, sujet_id, niveau_id, test_id) {
      try {
        const sql = `INSERT INTO question (type, question, points, nbr_reponse, sujet_id, niveau_id, test_id)
                     VALUES (?,?,?,?,?,?.?) `;
        const [result] = await db.query(sql, [type, question, points, nbr_reponse, sujet_id, niveau_id, test_id]);
        return result.insertId;
      } catch (error) {
        console.error('Error creating Question:', error);
        throw new Error('Error creating Question');
      }
    }

    // Fetch all Subjects and subs
    static async getAllQsts() {
      try {
          const [rows] = await db.query(`SELECT q.type, q.question, q.points, q.nbr_reponse, 
                                         s.title, n.niveau, m.type, m.path, r.reponse, r.is_correct             
                                         FROM question q 
                                         LEFT JOIN sujet s ON q.sujet_id = s.id
                                         LEFT JOIN niveau n ON q.niveau_id = n.id 
                                         LEFT JOIN media m ON q.id = m.question_id
                                         LEFT JOIN reponse r ON q.id = r.question_id`);
          return rows;
      } catch (error) {
          console.error('Error fetching questionsquestion:', error);
          throw new Error('Error fetching questionsquestion');
      }
    }
     
    // Fetch Question by id
    static async getQstbyId(id) {
      try {
          const sql = `SELECT q.type, q.question, q.points, q.nbr_reponse, 
                        s.title, n.niveau, m.type, m.path, r.reponse, r.is_correct             
                        FROM question q 
                        LEFT JOIN sujet s ON q.sujet_id = s.id
                        LEFT JOIN niveau n ON q.niveau_id = n.id 
                        LEFT JOIN media m ON q.id = m.question_id
                        LEFT JOIN reponse r ON q.id = r.question_id 
                        WHERE q.id = ?`;
          const [row] = await db.query(sql, [parseInt(id)]);
          if (row) return row[0];
                    return null;
      } catch (error) {
        console.error('Error fetching question:', error);
        throw new Error('Error fetching question');
      }
    }   
    
    // Update a Qst
    static async updateQst(id,type, question, points, nbr_reponse, sujet_id, niveau_id, test_id) {
      try {
          const sql = `UPDATE Question
                          SET type = ?, question = ?, points = ?, nbr_reponse = ?, sujet_id = ?, niveau_id = ?, test_id = ?
                          WHERE id = ?`;
          const [result] = await db.query(sql, [type, question, points, nbr_reponse, sujet_id, niveau_id, test_id, parseInt(id)]);
          return result.affectedRows > 0;
      } catch (error) {
        console.error('Error updating question:', error);
        throw new Error('Error updating question');
      }
    }

    // Delete Question
    static async deleteQst(id) {
      try {
        const sql = `DELETE FROM Question WHERE id = ?`;
        const [result] = await db.query(sql, [parseInt(id)]);
        return result.affectedRows > 0;
      } catch (error) {
        console.error('Error deleting question:', error);
        throw new Error('Error deleting question');
      }
    }
    
}

export default QuestionModel;

  console.log(QuestionModel.updateQst('2', 'QSU', 'hhhhhhhh', 45, 1, 1, 1));