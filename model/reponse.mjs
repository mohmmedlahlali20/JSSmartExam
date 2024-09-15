import db from "../config/db.config.mjs";

export const createReponse = (reponse, is_correct, question_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Reponse(reponse, is_correct, question_id) VALUES (?, ?, ?)";
    db.query(sql, [reponse, is_correct, question_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getReponses = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Reponse WHERE deleted_at IS NULL";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getReponsesByQuestionId = (question_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM Reponse WHERE question_id = ? AND deleted_at IS NULL";
    db.query(sql, [question_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const updateReponse = (id, reponse, is_correct, question_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE Reponse SET reponse = ?, is_correct = ?, question_id = ? WHERE id = ?";
    db.query(sql, [reponse, is_correct, question_id, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const deleteReponse = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE Reponse SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
