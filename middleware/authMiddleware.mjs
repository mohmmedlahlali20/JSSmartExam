import { Classe } from '../model/classe.mjs';

export default class Middleware {
    
    // static async isStudent(req, res, next) {
    //     const user = req.session?.user;
    //     if (user) {
    //         const isStudent = await Classe.isStudent(user.id);
    //         console.log('User:', user.id, 'Is student:', isStudent);
    //         res.locals.isStudent = isStudent;
    //     } else {
    //         res.locals.isStudent = false;
    //     }
    //     res.locals.user = user || null;
    //     next();
    // }

    static isAuthenticated(req, res, next) {

    
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

    static async alreadyHaveClasse(req, res, next) {
        try {
            const user = req.session?.user;
            if (user) {
                const hasClass = await Classe.alreadyHaveClasse(user.id); 
                console.log('User:', user.id, 'Has class:', hasClass);
                res.locals.hasClass = hasClass;
            } else {
                res.locals.hasClass = false;
            }
            res.locals.user = user || null;
            next();
        } catch (err) {
            console.error('Error in middleware:', err);
            next(err);
        }
    }



    //static  setSubjectSession(req, res, next) {
        //if (req.body && req.body.subjectId) {
            //if (!req.session.sujet) {
            //    req.session.sujet = {};
          //  }
          //  req.session.sujet.currentSubjectId = req.body.subjectId;
      //  }
       // next();
   // }

   // static getSubjectFromSession(req, res, next) {
      //  if (req.session.sujet) {
       //     req.currentSubjectId = req.session.sujet.currentSubjectId;
       // }
      //  next();
  //  }
}
