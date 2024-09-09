const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const crypto = require('crypto');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const classe = require('./model/classe');
const indexRouter = require('./routes/index');
const db =require('./config/db.config');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
console.log(secretKey)
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  
}));
 

// midlware
app.use((req, res, next) => {
  req.db = db; 
  next();
});
  app.use(async (req, res, next) => {
    try {
      if (req.session && req.session.user) {
        const formateurId = req.session.user.id;
        const hasClass = await classe.alreadyHaveClasse(req.db, formateurId);
        res.locals.hasClass = hasClass;
      } else {  
        res.locals.hasClass = false;
      }
      res.locals.user = req.session && req.session.user ? req.session.user : null;
      next();
    } catch (err) {
      console.error('Error in middleware:', err);
      next(err);
    }
  });



app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
