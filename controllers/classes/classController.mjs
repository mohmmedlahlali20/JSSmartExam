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
    const { className, formateurId } = req.body;


    try {
        await createNewClass(className, formateurId, db);
        req.session.user.
        res.status(201).json({ message: 'Class created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

  