import {
  createNiveau,
  getNiveaux,
  updateNiveau,
  deleteNiveau,
} from "../../model/niveau.mjs";

export const createNiveauController = (req, res) => {
  const { niveau, description, max, min } = req.body;

  createNiveau(niveau, description, max, min, (err, result) => {
    if (err) {
      console.error("Error creating niveau:", err);
      return res.status(500).send("Error creating niveau: " + err.message);
    }
    console.log("Niveau created:", result);
    res.redirect("/niveaux");
  });
};

export const getNiveauxController = (req, res) => {
  getNiveaux((err, result) => {
    if (err) {
      console.error("Error fetching niveaux:", err);
      return res.status(500).render("dashboardFormateur/niveaux/niveau", {
        niveaux: [],
        error: "Error fetching niveaux: " + err.message,
        title: "Niveau",
      });
    }
    res.render("dashboardFormateur/niveaux/niveau", {
      niveaux: result,
      title: "Niveau",
    });
  });
};

export const updateNiveauController = (req, res) => {
  const { id, niveau, description, max, min } = req.body;

  updateNiveau(id, niveau, description, max, min, (err, result) => {
    if (err) {
      console.error("Error updating niveau:", err);
      return res.status(500).send("Error updating niveau: " + err.message);
    }
    res.redirect("/niveaux");
  });
};

export const deleteNiveauController = (req, res) => {
  const { id } = req.params;

  deleteNiveau(id, (err, result) => {
    if (err) {
      console.error("Error deleting niveau:", err);
      return res.status(500).send("Error deleting niveau: " + err.message);
    }
    res.redirect("/niveaux");
  });
};
