// const userModel = require('../model/formateur');

// exports.getData = async (req, res) => {
//     try {
//         // Ensure user is logged in and email is stored in session
//         if (!req.session.user || !req.session.user.email) {
//             return res.redirect('/login');  // Redirect to login if not logged in
//         }

//         const userEmail = req.session.user.email;
        
//         // Fetch user data from the database
//         const user = await userModel.getUserByEmail(userEmail, req.db);
        
//         if (user) {
//             // Render view with user data
//             res.render('layouts/navbar', { user });  // Pass user data to the template
//         } else {
//             res.render('layouts/navbar', { user: null });
//         }
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
