import bcrypt from 'bcryptjs';
import { getFormateurByEmail, comparePassword } from '../../model/formateur.mjs';
import db from '../../config/db.config.mjs';
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login request:', req.body);
        const formateur = await getFormateurByEmail(email, db);
        if (!formateur) {
            return res.redirect('/login');
        }
        const isMatch = await comparePassword(password, formateur.password);
        if (!isMatch) {
            return res.redirect('/login');
        }
        req.session.user = formateur;
        res.redirect('/statique');

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
    });
};


