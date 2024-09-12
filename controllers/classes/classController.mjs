import { createNewClass, alreadyHaveClasse } from '../../model/classe.mjs';

export const showClasse = async (req, res) => {
    const formateurId = req.session.user.id;
    try {
        const hasClass = await alreadyHaveClasse(formateurId);

        if (hasClass) {
            return res.redirect('/statique');
        }

        res.render('dashboardFormateur/classes/createClass', { title: 'Add new class' });
    } catch (err) {
        console.error('Error checking formateur class:', err);
        res.status(500).send('An error occurred');
    }
};




export const createClass = async (req, res) => {
    const { className } = req.body;
    const formateurId = req.session.user.id; 

    console.log('Request body:', req.body);
    console.log('Formateur ID from session:', formateurId);

    if (!className || !formateurId) {
        return res.status(400).json({ message: 'Class name and formateur ID are required.' });
    }

    try {
        await createNewClass(className, formateurId);
        res.status(201).json({ success: true, message: 'Class created successfully' });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

  