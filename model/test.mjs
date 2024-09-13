import db from "../config/db.config.mjs";

export const getTests = (callback) => {
  const sql = `SELECT * FROM Test`;
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
