export function isAuthenticated(req, res, next) {
    console.log('User session:', req.session.user);
    console.log('User speciality:', req.session.user ? req.session.user.specialite : 'undefined');

    if (req.session && req.session.user) {
        req.user = req.session.user;

        if (req.user.specialite) {
            return next();
        } else {
            console.log('User has no speciality');
            return res.redirect('/statique');
        }
    } else {
        console.log('No user session found');
        return res.redirect('/login');
    }
}
