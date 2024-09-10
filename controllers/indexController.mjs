
const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // User is authenticated, proceed to the next middleware/handler
    }

    res.redirect('/login'); // User is not authenticated, redirect to login page
};
export const statique = (req, res) => {
    res.render('statique', { title: 'Statique Page' });
};
