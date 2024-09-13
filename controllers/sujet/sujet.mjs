import SubjectModel from "../../model/sujet.mjs";

class SubjectController {
    
    async createForm(req, res) {
        try {
            const subjects = await SubjectModel.getParents();
            res.render('dashboardFormateur/sujets/create', {title : "create a subject", subjects});
        } catch (error) {
            console.error('Error fetching subjects:', error);
            res.render('error', { title: 'Error', message: 'Error fetching subjects' });
        }
    }
    
    async updateForm(req, res) {
        const { id } = req.params;
        try {
            const subject = await SubjectModel.getSubjectbyId(id);
            if (!subject)  return res.render('error', { title: 'Not Found', message: 'Subject not found' });
            const subjects = await SubjectModel.getParents();
            res.render('dashboardFormateur/sujets/edit', { title: 'Edit Subject', subject, subjects });
        } catch (error) {
            console.error('Error fetching subject or subjects:', error);
            res.render('error', { title: 'Error', message: 'Error fetching subject or subjects for update form' });
        }
    }

    async create(req, res){
        const {title, description, parent_id} = req.body;
        try {
            const result = await SubjectModel.createSubject(title, description, parent_id);
            if(!result) return res.status(500).render('error', { title: 'Not Found', message: 'Subject not inserted' });
            res.status(201).redirect('/sujets');
        } catch (error) {
            console.error('Error creating subject:', error);
            res.render('dashboardFormateur/sujets/create', { title: 'Create Subject', error: 'Error creating subject' });
        }
    }

    async getAll(req, res){
        try {
            const subjects = await SubjectModel.getAllSubjects();
            if(!subjects) return res.status(500).render('error', { title: 'Not Found', message: 'failed to fetch data' });
            res.status(200).render('dashboardFormateur/sujets/index', { title: 'Subjects List', subjects });
        } catch (error) {
            console.error('Error fetching subjects:', error);
            res.render('error', { title: 'Error', message: 'Error fetching subjects' });
        }
    }

    async getOne(req, res){
        const {id} = req.params.id;
        try {
            const subject = await SubjectModel.getSubjectbyId(id);
            if(!subject) return res.status(404).render('error', { title: 'Not Found', message: 'failed to fetch data' });
            const subs = await SubjectModel.getSubsForSubject(id);
            res.status(200).render(`dashboardFormateur/sujets/${id}`, { title: 'Subject details', subject, subs });
        } catch (error) {
            console.error('Error fetching subject:', error);
            res.render('error', { title: 'Error', message: 'Error fetching subject' });
        }
    }

    // async getSubs(req, res){
        
    // }

    async update(req, res){
        const {id} = req.params.id;
        const {title, description, parent_id} = req.body;
        try {
            const subject = await SubjectModel.updateSubject(title, description, parent_id, id);
            if(!subject) return res.status(500).render('error', { title: 'Not Found', message: 'failed to fetch data' });
            res.status(201).redirect(`/sujets/${id}`)
        } catch (error) {
            console.error('Error updating subject:', error);
            res.status(201).render('dashboardFormateur/sujets/edit', { title: 'Edit Subject', subject: { id, title, description, parent_id }, error: 'Error updating subject' });
        }

    }

    async delete(req, res){
        const {id} = req.params.id;
        try {
            const deleted = await SubjectModel.deleteSubject(id);
            if(!deleted) return res.status(500).render('error', { title: 'error', message: 'failed to delete' });
            res.status(200).redirect('/sujets')
        } catch (error) {
            console.error('Error deleting subject:', error);
            res.status(500).render('error', { title: 'Error', message: 'Error deleting subject' });
        }
    }
}

export default SubjectController;