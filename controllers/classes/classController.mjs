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

    if (!className || typeof className !== 'string') {
        return res.status(400).send('Class name is required and must be a string');
    }

    try {
        console.log('Creating class:', className, 'Formateur ID:', formateurId);

        const result = await createNewClass(className, formateurId);
        console.log('Class created successfully:', result);
        res.status(200).json({ message: 'Class created successfully' }); // Respond with JSON

    } catch (err) {
        console.error('Error creating class:', err);
        res.status(500).send('Error creating class');
    }
};

  