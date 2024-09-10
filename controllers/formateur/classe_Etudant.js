const EtudaintModel = require('../../model/apprenats'); 


exports.etudaints = (req, res) => {
    const classeId = req.session.user.classeId;
    console.log(classeId)
    res.render('dashboardFormateur/classes/classFormateur', {
        title: "Add Student",
        classeId: classeId
    });

};
exports.addEtudaints = async (req, res) => {
    const { etudaints } = req.body;
    const classeId = req.body.classe_id;  

    if (!etudaints || !Array.isArray(etudaints) || etudaints.length === 0) {
        return res.status(400).send('Etudaints data is required and should be a non-empty array.');
    }

    try {
        await EtudaintModel.addEtudaints(req.db, etudaints, classeId);
        res.redirect('/add_etudiant');
    } catch (err) {
        console.error('Error adding etudaints:', err);
        res.status(500).send('Error adding etudaints.');
    }
};