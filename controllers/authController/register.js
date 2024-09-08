const formateurModel = require('../../model/formateur'); 
const bcrypt = require('bcryptjs');

exports.getRegisterPage = (req, res) => {
    res.render('auth/register', { title: 'Register', error: null });
};

exports.register = async (req, res) => {
    const { firstName, lastName, date_de_naissance, adresse, email, password, confirmPassword, specialite } = req.body;

    if (!firstName || !lastName || !date_de_naissance || !adresse || !email || !password || !confirmPassword || !specialite) {
        return res.render('auth/register', { title: 'Register', error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.render('auth/register', { title: 'Register', error: 'Passwords do not match' });
    }

    try {
        const existingUser = await formateurModel.getUserByEmail(email, req.db);

        if (existingUser) {
            return res.render('auth/register', { title: 'Register', error: 'Email already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await formateurModel.createUser({ firstName, lastName, date_de_naissance, adresse, email, password: hashedPassword, specialite }, req.db);

        res.redirect('/login');
    } catch (err) {
        console.error('Registration error:', err);
        res.render('auth/register', { title: 'Register', error: 'An error occurred' });
    }
};
