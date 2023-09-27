const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT

//Define API Routes
const indexApiRoutes = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//Calling API Routes
app.use('/api',indexApiRoutes)


app.listen(PORT,() => {
    console.log(`server listening on ${PORT}`);
})
