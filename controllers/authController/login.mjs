
import bcrypt from 'bcryptjs';

import { getFormateurByEmail } from '../../model/formateur.mjs';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getFormateurByEmail(email, req.db);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.render("auth/login", { title: "Login Page", error: "Invalid email or password" });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            specialite: user.specialite,
        };

        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                return res.render("auth/login", { title: "Login Page", error: "Session error occurred" });
            }

            res.redirect('/statique');
        });
        
    } catch (err) {
        console.error('Login error:', err);
        res.render("auth/login", { title: "Login Page", error: "An error occurred during login" });
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


