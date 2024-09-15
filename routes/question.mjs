import  express  from "express";
import QestionController from "../controllers/question/question.mjs";
// import methodOverride from "method-override";

const router = express.Router();
const QuestionController = new QestionController;

// router.use(methodOverride('_method'));

// rendering the forms
router.get('/create', QuestionController.createForm);
router.get('/:id/edit', QuestionController.updateForm);

// all & new
router.route('/')
    .get(QuestionController.getAll)
    .post(QuestionController.create);

// one & update
router.route('/:id')
    .get(QuestionController.getOne)
    .post(QuestionController.update);

// destroy
router.post('/:id/delete', QuestionController.delete);



export default router;