import  express  from "express";
import SubjectController from "../controllers/sujet/sujet.mjs";
// import methodOverride from "method-override";

const router = express.Router();
const subjectController = new SubjectController();

// router.use(methodOverride('_method'));

// rendering the forms
router.get('/:id/create', subjectController.createForm.bind(subjectController));
router.get('/:id/edit', subjectController.updateForm.bind(subjectController));

// all & new
router.route('/')
    .get(subjectController.getAll.bind(subjectController))
    .post(subjectController.create.bind(subjectController));

// one & update
router.route('/:id')
    .get(subjectController.getOne.bind(subjectController))
    .post(subjectController.update.bind(subjectController));

// destroy
router.post('/:id/delete', subjectController.delete.bind(subjectController));



export default router;