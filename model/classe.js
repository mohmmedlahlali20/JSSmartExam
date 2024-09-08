const createClass = async (db, className, formateurId) => {
  return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Classe (name, formateur_id) VALUES (?, ?)';
      db.query(sql, [className, formateurId], (err, result) => {
          if (err) {
              return reject(err);
          }
          resolve(result);
      });
  });
};
const alreadyHaveClasse = async (db, formateurId) => {
  try {
      const [rows] = await db.query('SELECT COUNT(*) as count FROM Classe WHERE formateur_id = ?', [formateurId]);
      return rows[0].count > 0; 
  } catch (err) {
      console.error('Error in alreadyHaveClasse:', err);
      throw err;
  }
};

module.exports = {
    createClass,
    alreadyHaveClasse
};