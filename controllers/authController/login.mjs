import bcrypt from 'bcryptjs';
import { getFormateurByEmail, comparePassword } from '../../model/formateur.mjs';
import db from '../../config/db.config.mjs';
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login request:', req.body);

        const formateur = await getFormateurByEmail(email, db);
        // console.log('Formateur fetched:', formateur);  //done

        if (!formateur) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, formateur.password);
        //console.log('Password match result:', isMatch); // return true

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        
        //console.log('Setting session:', formateur);
        req.session.user = formateur;

        
        // console.log('Session after setting user:', req.session);

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


