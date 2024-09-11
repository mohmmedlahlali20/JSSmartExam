import { Apprenants } from '../../model/apprenats.mjs';

class EtudiantController {
    static etudaints(req, res) {
        res.render('dashboardFormateur/classes/classFormateur', { title: "Add Student" });
    }

    static async addEtudiants(req, res) {
        const { etudaints } = req.body;
        const classeId = req.body.classe_id;

        if (!etudaints || !Array.isArray(etudaints) || etudaints.length === 0) {
            return res.status(400).send('Etudaints data is required and should be a non-empty array.');
        }

        try {
            await Apprenants.addEtudiants(etudaints, classeId);
            res.redirect('/add_etudiant');
        } catch (err) {
            console.error('Error adding etudaints:', err);
            res.status(500).send('Error adding etudaints.');
        }
    }


        static async getEtudiants(req, res) {
            // get all students 
            try {
                const etudiants = await Apprenants.getAllApprenants();
                res.json(etudiants);
            } catch (err) {
                console.error('Error fetching students:', err);
                res.status(500).send('Error fetching students.');
            }
        }
        
    }



export default EtudiantController;

