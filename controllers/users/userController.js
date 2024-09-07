// const User = require('./user.model.js');

// exports.create = async (req, res) => {
//     try {
//         const [result] = await User.create(req.body);
//         res.status(201).json({ id: result.insertId, ...req.body });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.findAll = async (req, res) => {
//     try {
//         const [users] = await User.findAll();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.findOne = async (req, res) => {
//     try {
//         const [users] = await User.findById(req.params.id);
//         if (users.length > 0) {
//             res.json(users[0]);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.update = async (req, res) => {
//     try {
//         const [result] = await User.updateById(req.params.id, req.body);
//         if (result.affectedRows > 0) {
//             res.json({ message: 'User updated successfully' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.delete = async (req, res) => {
//     try {
//         const [result] = await User.deleteById(req.params.id);
//         if (result.affectedRows > 0) {
//             res.json({ message: 'User deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
