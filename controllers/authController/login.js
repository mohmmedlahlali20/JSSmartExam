    const userModel = require('../../model/formateur');
    const bcrypt = require('bcryptjs');



    exports.login = async (req, res) => {
    
        const { email, password } = req.body;
    

    
        try {
            const user = await userModel.getFormateurByEmail(email, req.db);
            
    
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
    
            res.redirect('/statique');
        } catch (err) {
            console.error('Login error:', err);
            res.render("auth/login", { title: "Login Page", error: "An error occurred during login" });
        }
    };
    
    
    


    exports.logout = (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.redirect('/dashboard'); 
            }
            res.redirect('/login');
        });
    };