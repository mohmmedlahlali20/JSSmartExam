import SubjectModel from "../../model/sujet.mjs";

export class SubjectController {
    // Create form to create a subject
    createForm = async (req, res) => {
        try {
            if (!req.session.user) {
                throw new Error('User not logged in');
            }


            const formateurId = req.session.user.id;
            const subjects = await SubjectModel.getParents();
            res.render('dashboardFormateur/sujets/create', {
                title: "Create a Subject",
                subjects,
                formateurId,

            });
        } catch (error) {
            console.error('Error fetching subjects:', error);
            res.status(500).json({ error: 'Error fetching subjects' });
        }
    };

    // Create a new subject
    async  createSubject(req, res) {
        try {
            const { title, description, parent_id } = req.body;

            // Convert empty string to null for parent_id
            const parentId = parent_id === '' ? null : parent_id;

            if (!req.session.user) {
                throw new Error('User not logged in');
            }

            const formateur_id = req.session.user.id;
            console.log('Formateur ID:', formateur_id);

            await SubjectModel.createSubject(title, description, parentId, formateur_id);
            console.log(
                title,
                description,
                parentId,
                formateur_id

            )

            res.redirect('/sujets/create');
        } catch (error) {
            console.error('Error creating subject:', error);
            res.status(500).json({ error: 'Error creating subject' });
        }
    }

    // Update form for editing a subject
    updateForm = async (req, res) => {
        const { id } = req.params;
        try {
            const subject = await SubjectModel.getSubjectbyId(id);
            if (!subject) return res.status(404).json({ error: 'Subject not found' });
            const subjects = await SubjectModel.getParents();
            res.render('dashboardFormateur/sujets/edit', { title: 'Edit Subject', subject, subjects });
        } catch (error) {
            console.error('Error fetching subject or subjects:', error);
            res.status(500).json({ error: 'Error fetching subject or subjects for update form' });
        }
    };

    // Get all subjects
    getAll = async (req, res) => {
        try {
            const subjects = await SubjectModel.getAllSubjects();
            const formateur_id = req.session.user;
            console.log(subjects)
            res.status(200).render('dashboardFormateur/sujets/index', { title: 'Subjects List', subjects  , formateur_id});
        } catch (error) {
            console.error('Error fetching subjects:', error);
            res.redirect('/login')
        }
    };

    // Get one subject by ID
    getOne = async (req, res) => {
        const { id } = req.params;
        try {
            const subject = await SubjectModel.getSubjectbyId(id);
            if (!subject) return res.status(404).json({ error: 'Subject not found' });
            const subs = await SubjectModel.getSubsForSubject(id);
            res.status(200).render(`dashboardFormateur/sujets/${id}`, { title: 'Subject details', subject, subs });
        } catch (error) {
            console.error('Error fetching subject:', error);
            res.status(500).json({ error: 'Error fetching subject' });
        }
    };

    // Update an existing subject
    update = async (req, res) => {
        const { id } = req.params;
        const { title, description, parent_id } = req.body;
        try {
            const subject = await SubjectModel.updateSubject(title, description, parent_id, id);
            if (!subject) return res.status(500).json({ error: 'Failed to update subject' });
            res.status(201).redirect(`/sujets/${id}`);
        } catch (error) {
            console.error('Error updating subject:', error);
            res.status(500).json({ error: 'Error updating subject' });
        }
    };

    // Delete a subject
    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await SubjectModel.deleteSubject(id);
            if (!deleted) return res.status(500).json({ error: 'Failed to delete subject' });
            res.status(200).redirect('/sujets');
        } catch (error) {
            console.error('Error deleting subject:', error);
            res.status(500).json({ error: 'Error deleting subject' });
        }
    };
}
