import { Apprenants } from '../../model/apprenats.mjs'; 
import {getClassByFormateurID} from '../../model/formateur.mjs'

class EtudiantController {
    static async etudaints(req, res) {
        try {
            if (!req.session || !req.session.user) {
                return res.redirect('/login');
            }

            const formateurId = req.session.user.id;
            const classe = await getClassByFormateurID(formateurId);

            if (!classe) {
                return res.status(404).send('Class not found');
            }

            const classeId = classe.id;
            const etudiants = await Apprenants.getAllApprenants(classeId);


            res.render('dashboardFormateur/classes/classFormateur', {
                title: "Add Student",
                etudiants: etudiants,
                classeId: classeId,  
            });
        } catch (err) {
            console.error('Error fetching students:', err);
            res.status(500).send('Error fetching students.');
        }


    }
    static async addEtudiants(req, res) {
        const { etudiants } = req.body;
    
        console.log('Received data:', req.body); 
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
    
        try {
            if (!etudiants || !Array.isArray(etudiants)) {
                throw new Error('Invalid data format');
            }
    
            await Apprenants.addEtudiants(etudiants);
    
            res.status(201).json({ message: 'Student added successfully' });
        } catch (error) {
            console.error('Error adding students:', error);
            res.status(400).json({ message: error.message });
        }
    }
    
    
    static async deleteStudent(req, res) {
        const { id } = req.params;
        try {
            await Apprenants.deleteApprenant(id);
            res.json({ message: 'Student deleted successfully' });
        } catch (err) {
            console.error('Error deleting student:', err);
            res.status(400).json({ message: err.message });
        }
    }


    static async updateStudent (req, res) {
        const studentId = req.params.id;
        const updatedData = req.body;

        // console.log('students update' , studentId, updatedData);
    
        try {
            await Apprenants.updateApprenant(studentId, updatedData);
            res.status(200).json({ message: 'Student updated successfully' });
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ message: 'Failed to update student' });
        }
    };
    
    
}



export default EtudiantController;


 



// static async getStudentsByClass(req, res) {
//     const { classId } = req.params;
//     try {
//         const etudiants = await Apprenants.getApprenantsByClasse(classId);
//         res.json(etudiants);
//     } catch (err) {
//         console.error('Error fetching students by class:', err);
//         res.status(500).send('Error fetching students by class.');
//     }
// }

// static async getStudentsByFormateur(req, res) {
//     const { formateurId } = req.params;
//     try {
//         const etudiants = await Apprenants.getApprenantsByFormateur(formateurId);
//         res.json(etudiants);
//     } catch (err) {
//         console.error('Error fetching students by formateur:', err);
//         res.status(500).send('Error fetching students by formateur.');
//     }
// }
