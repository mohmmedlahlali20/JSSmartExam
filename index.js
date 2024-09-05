const express = require('express');
const app = express();
const path = require('path');

const indexRouter = require('./routes/index');
require('dotenv').config();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
