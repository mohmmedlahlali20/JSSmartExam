
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
const mysql = require('mysql2');
const Swal = require('sweetalert2');

const indexRouter = require('./routes/index');

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'mohammed',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'JSSmartExam',
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use((req, res, next) => {
  if (req.session && req.session.user) {
      res.locals.user = req.session.user; 
  } else {
      res.locals.user = null;  
  }
  next();
});
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
