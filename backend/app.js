const express = require('express');
const app = express();
const todoRouter = require('./Routes/TodoRoutes');
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use('/', todoRouter);

module.exports = app;
