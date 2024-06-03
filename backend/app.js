const express = require('express');
const userRouter = require('./routes/userRoutes');
// const classRouter = require('./routes/classRoutes');

const app = express();
const cors = require('cors');
// const fs = require('fs');
const globalErrorHandler = require('./utils/errorHandler');
const AppError = require('./utils/AppError');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter); 

// app.use('/api/classes', classRouter);

// Handling undefined routes
app.all('*', (req, res, next) => {
  return next(new AppError(404, 'This route does not exist'));
});

app.use(globalErrorHandler);

module.exports = app;
