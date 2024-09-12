import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { alreadyHaveClasse } from './model/classe.mjs';
import session from 'express-session';
// import crypto from 'crypto';
import indexRouter from './routes/index.mjs';
import db from './config/db.config.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'sessionOfJSSMARTEXAM',
  resave: false,
  saveUninitialized: true,
  cookie: {

    secure: false
  }

}));

app.use(async (req, res, next) => {
  try {
    const user = req.session?.user;
    if (user) {
      const hasClass = await alreadyHaveClasse(user.id); 
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
});





app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
