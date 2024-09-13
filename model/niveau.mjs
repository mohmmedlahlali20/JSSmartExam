import db from "../config/db.config.mjs";

export const createNiveau = (niveau, description, max, min, callback) => {
  const sql =
    "INSERT INTO niveau(niveau, description, max, min) VALUES (?, ?, ?, ?)";
  db.query(sql, [niveau, description, max, min], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

export const getNiveaux = (callback) => {
  const sql = "SELECT * FROM niveau";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

export const updateNiveau = (id, niveau, description, max, min, callback) => {
  const sql =
    "UPDATE niveau SET niveau = ?, description = ?, max = ?, min = ? WHERE id = ?";
  db.query(sql, [niveau, description, max, min, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

export const deleteNiveau = (id, callback) => {
  const sql = "DELETE FROM niveau WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
