import {
  createNiveau,
  getNiveaux,
  updateNiveau,
  deleteNiveau,
} from "../../model/niveau.mjs";

// Create Niveau Controller
export const createNiveauController = async (req, res) => {
  const { niveau, description, max, min } = req.body;

  try {
    const result = await createNiveau(niveau, description, max, min); // Await the promise
    console.log("Niveau created:", result);
    res.redirect("/niveaux");
  } catch (err) {
    console.error("Error creating niveau:", err);
    res.status(500).send("Error creating niveau: " + err.message);
  }
};

// Get Niveaux Controller
export const getNiveauxController = async (req, res) => {
  try {
    const result = await getNiveaux(); // Await the promise
    res.render("dashboardFormateur/niveaux/niveau", {
      niveaux: result,
      title: "Niveau",
    });
  } catch (err) {
    console.error("Error fetching niveaux:", err);
    res.status(500).render("dashboardFormateur/niveaux/niveau", {
      niveaux: [],
      error: "Error fetching niveaux: " + err.message,
      title: "Niveau",
    });
  }
};

// Update Niveau Controller
export const updateNiveauController = async (req, res) => {
  const { id, niveau, description, max, min } = req.body;

  try {
    const result = await updateNiveau(id, niveau, description, max, min); // Await the promise
    res.redirect("/niveaux");
  } catch (err) {
    console.error("Error updating niveau:", err);
    res.status(500).send("Error updating niveau: " + err.message);
  }
};

// Delete Niveau Controller
export const deleteNiveauController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteNiveau(id); // Await the promise
    res.redirect("/niveaux");
  } catch (err) {
    console.error("Error deleting niveau:", err);
    res.status(500).send("Error deleting niveau: " + err.message);
  }
};
