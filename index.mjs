import express from 'express';
import path from 'path';
import morgan from 'morgan';
import crypto from 'crypto';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { createNewClass, alreadyHaveClasse } from './model/classe.mjs'; // Named imports
import indexRouter from './routes/index.mjs'; // Import the router
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

const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }  
}));

app.use((req, res, next) => {
  req.db = db; 
  next();
});

app.use(async (req, res, next) => {
  console.log(req.session)
  try {
    if (req.session && req.session.user) {
      const formateurId = req.session.user.id;
      const hasClass = await alreadyHaveClasse(req.db, formateurId);
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
