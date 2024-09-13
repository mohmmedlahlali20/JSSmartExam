
import {Formateur} from '../../model/formateur.mjs';
import { Apprenants } from '../../model/apprenats.mjs'; 
import db from '../../config/db.config.mjs';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login request:', req.body);

        let user = await Formateur.getFormateurByEmail(email, db) || await Apprenants.getStudentByEmail(email);
        
        if (user) {
            const isMatch = await Formateur.comparePassword(password, user.password);
            if (!isMatch) {
                console.log('Password mismatch');
                return res.redirect('/login'); 
            }
            
            req.session.user = user;
            console.log('User authenticated:', req.session.user);

            if (user.specialite) {
                return res.redirect('/statique');
            } else {
                return res.redirect('/Students');
            }
        }

        console.log('User not found');
        return res.redirect('/login');

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


