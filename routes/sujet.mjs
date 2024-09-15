import express from "express";
import { SubjectController } from '../controllers/sujet/sujet.mjs';

const router = express.Router();
const subjectController = new SubjectController();

// Rendering the forms
router.get('/create', subjectController.createForm);


router.post('/create', subjectController.createSubject);

// All & new subjects
router.route('/all-subjects')
    .get(subjectController.getAll)
    .post(subjectController.updateForm);

// One & update subject
router.route('/:id')
    .get(subjectController.getOne)
    .put(subjectController.update);

// Destroy subject (optional if needed)
// router.delete('/:id', subjectController.delete);

export default router;
