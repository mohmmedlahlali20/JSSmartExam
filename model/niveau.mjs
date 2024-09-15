import db from "../config/db.config.mjs";

export const createNiveau = (niveau, description, max, min) => {
  const sql =
    "INSERT INTO Niveau(niveau, description, max, min) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [niveau, description, max, min], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const getNiveaux = () => {
  const sql = "SELECT * FROM Niveau";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const updateNiveau = (id, niveau, description, max, min) => {
  const sql =
    "UPDATE niveau SET Niveau = ?, description = ?, max = ?, min = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [niveau, description, max, min, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const deleteNiveau = (id) => {
  const sql = "DELETE FROM Niveau WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
