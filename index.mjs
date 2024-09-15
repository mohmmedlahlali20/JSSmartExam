import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import session from 'express-session';
import indexRouter from './routes/index.mjs';
import studentsRouter from './routes/studentsRouter.mjs';
import sujetRouter from './routes/sujet.mjs';
import db from './config/db.config.mjs';

import Middleware from './middleware/authMiddleware.mjs';  

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
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/sujet', sujetRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
