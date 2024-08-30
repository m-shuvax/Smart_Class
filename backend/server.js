
const dotenv = require('dotenv')
const app = require("./app");
const connectDB = require('./utils/connectDB')

dotenv.config()

connectDB(process.env.MONGO)
.then(()=>{
console.log("The data base has been connected");
})
.catch(err=> console.log(err.message))

const port = process.env.PORT
const server = app.listen(port, '127.0.0.1' , ()=>{
    console.log(`Server is listening on port ${port}`);
})