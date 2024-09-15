import QuestionModel from "../../model/question.mjs";
import SubjectModel from "../../model/sujet.mjs";
import {getNiveaux} from "../../model/niveau.mjs";

export default class QestionController {
    
    createForm = async (req, res) => {
        try {
            const subjects = await SubjectModel.getAllSubjects();
            const niveaux = await getNiveaux();
            res.render('dashboardFormateur/questions/createQst', {title : "create a question", subjects, niveaux});
        } catch (error) {
            console.error('Error fetching data:', error);
            res.render('error', { title: 'Error', message: 'Error fetching data' });
        }
    }
    
    updateForm = async (req, res) => {
        const { id } = req.params;
        try {
            const qst = await QuestionModel.getQstbyId(id);
            const subjects = await SubjectModel.getAllSubjects();
            const niveaux = await getNiveaux();
            if (!qst)  return res.render('error', { title: 'Not Found', message: 'Qestiom not found' });
            res.render('dashboardFormateur/questions/editQst', { title: 'Edit Question', qst, subjects, niveaux });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.render('error', { title: 'Error', message: 'Error fetching data for update form' });
        }
    }

    create = async (req, res) => {
        const {type, question, points, nbr_reponse, sujet_id, niveau_id, test_id} = req.body;
        try {
            const result = await QuestionModel.createQst(type, question, points, nbr_reponse, sujet_id, niveau_id, test_id);
            if(!result) return res.status(500).render('error', { title: 'Not Found', message: 'question not inserted' });
            res.status(201).redirect('/quesion');
        } catch (error) {
            console.error('Error creating question:', error);
            res.render('dashboardFormateur/questions/create', { title: 'Create Question', error: 'Error creating question' });
        }
    }

    getAll = async (req, res) => {
        try {
            const questions = await QuestionModel.getAllQsts();
            if(!questions) return res.status(500).render('error', { title: 'Not Found', message: 'failed to fetch data' });
            res.status(200).render('dashboardFormateur/questions', { title: 'Questions List', questions });
        } catch (error) {
            console.error('Error fetching questions:', error);
            res.render('error', { title: 'Error', message: 'Error fetching questions' });
        }
    }

    getOne = async (req, res) => {
        const {id} = req.params;
        try {
            const question = await QuestionModel.getQstbyId(id);
            if(!question) return res.status(404).render('error', { title: 'Not Found', message: 'failed to fetch question' });
            res.status(200).redirect(`/questions/${id}`, { title: 'Question details', question });
        } catch (error) {
            console.error('Error fetching question:', error);
            res.render('error', { title: 'Error', message: 'Error fetching question' });
        }
    }


    update = async (req, res) => {
        const {id} = req.params;
        const {type, question, points, nbr_reponse, sujet_id, niveau_id, test_id} = req.body;
        try {
            const question = await QuestionModel.updateQst(id, type, question, points, nbr_reponse, sujet_id, niveau_id, test_id);
            if(!question) return res.status(500).render('error', { title: 'Not Found', message: 'failed to fetch data' });
            res.status(201).redirect(`/questions/${id}`)
        } catch (error) {
            console.error('Error updating question:', error);
            res.status(201).render('dashboardFormateur/questions/edit', { title: 'Edit question', question: { id, type, question, points, nbr_reponse, sujet_id, niveau_id, test_id }, error: 'Error updating question' });
        }

    }

    delete = async (req, res) => {
        const {id} = req.params;
        try {
            const deleted = await QuestionModel.deleteQst(id);
            if(!deleted) return res.status(500).render('error', { title: 'error', message: 'failed to delete' });
            res.status(200).redirect('/questions')
        } catch (error) {
            console.error('Error deleting question:', error);
            res.status(500).render('error', { title: 'Error', message: 'Error deleting question' });
        }
    }
}
