
const classModel = require('../../model/classe');
exports.classe = async (req, res) => {
      res.render('dashboardFormateur/classes/createClass', { title: 'Add new classse' })
};



exports.createClass = async (req, res) => {
      try {
          const { className } = req.body;
  
          if (!className) {
              return res.status(400).json({ error: 'Class name is required' });
          }
  
          await classModel.createClass(className);
  
          return res.status(200).json({ message: 'Class added successfully!' });
      } catch (err) {
          console.error('Error creating class:', err);
          return res.status(500).json({ error: 'Database error' });
      }
  };