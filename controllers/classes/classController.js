
const classe = require('../../model/classe');



exports.classe = async (req, res) => {
      const formateurId = req.session.user.id;

      try {
            const hasClass = await classe.alreadyHaveClasse(req.db, formateurId);

            if (hasClass) {
                  return res.redirect('/statique');
            }

            res.render('dashboardFormateur/classes/createClass', { title: 'Add new classse' });
      } catch (err) {
            console.error('Error checking formateur class:', err);
            res.status(500).send('An error occurred');
      }
};

exports.createClass = async (req, res) => {
      const { className } = req.body;
      const formateurId = req.session.user.id;

      if (!className) {
            return res.status(400).send('Class name is required');
      }

      try {
            const result = await classe.createClass(req.db, className, formateurId);
            console.log('Class created successfully:', result);
            res.redirect('/add_etudiant');
      } catch (err) {
            console.error('Error creating class:', err);
            res.status(500).send('Error creating class');
      }
};

