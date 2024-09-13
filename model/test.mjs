import db from "../config/db.config.mjs";

export const getTests = async () => {
  const sql = `SELECT * FROM Test`;
  try {
    const [result] = await db.query(sql); 
    return result;
  } catch (err) {
    throw err; 
  }
};