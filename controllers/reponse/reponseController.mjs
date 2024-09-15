import {
  createReponse,
  getReponses,
  getReponsesByQuestionId,
  updateReponse,
  deleteReponse,
} from "../../model/reponse.mjs";

export const createReponseController = async (req, res) => {
  const { reponse, is_correct, question_id } = req.body;
  try {
    const result = await createReponse(reponse, is_correct, question_id);
    console.log("Reponse created:", result);
    res.redirect("/reponses");
  } catch (err) {
    console.error("Error creating reponse:", err);
    res.status(500).send("Error creating reponse: " + err.message);
  }
};

export const getReponsesController = async (req, res) => {
  try {
    const result = await getReponses();
    res.render("dashboardFormateur/reponses/reponse", {
      reponses: result,
      title: "Reponses",
    });
  } catch (err) {
    console.error("Error fetching reponses:", err);
    res.status(500).render("dashboardFormateur/reponses/reponse", {
      reponses: [],
      error: "Error fetching reponses: " + err.message,
      title: "Reponses",
    });
  }
};

export const getReponsesByQuestionController = async (req, res) => {
  const { question_id } = req.params;
  try {
    const result = await getReponsesByQuestionId(question_id);
    res.json(result);
  } catch (err) {
    console.error("Error fetching reponses for question:", err);
    res.status(500).json({ error: "Error fetching reponses: " + err.message });
  }
};

export const updateReponseController = async (req, res) => {
  const { id, reponse, is_correct, question_id } = req.body;
  try {
    const result = await updateReponse(id, reponse, is_correct, question_id);
    res.redirect("/reponses");
  } catch (err) {
    console.error("Error updating reponse:", err);
    res.status(500).send("Error updating reponse: " + err.message);
  }
};

export const deleteReponseController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteReponse(id);
    res.redirect("/reponses");
  } catch (err) {
    console.error("Error deleting reponse:", err);
    res.status(500).send("Error deleting reponse: " + err.message);
  }
};
