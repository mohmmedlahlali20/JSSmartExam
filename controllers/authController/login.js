const userModel = require('../../model/formateur');

exports.login = async (req, res) => {
  console.log('Request Body:', req.body);
    const { email, password } = req.body;
    console.log('Email:', email); 
    console.log('Password:', password); 

    try {
        const user = await userModel.getUserByEmail(email, req.db);
        console.log('User from DB:', user); 

        if (!user || !userModel.comparePassword(password, user.password)) {
            return res.render("auth/login", { title: "Login Page", error: "Invalid email or password" });
        }

        req.session.user = { email };
        return res.redirect('/dashboard');
    } catch (err) {
        console.error('Login error:', err);
        res.render("auth/login", { title: "Login Page", error: "An error occurred" });
    }
};
