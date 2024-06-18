const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors');
const AppError = require('./utils/AppError');


app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}))

app.use(express.json())
app.use('/api', router )
 
app.all('*', (req, res, next)=>{
  return next(new AppError (404, 'This route does not exist'))
})
app.use(AppError)


module.exports = app;
