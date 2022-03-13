//imports 
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true }))
app.use(express.static("uploads"))

// database connection
const db = require('./config/keys').mongoURI
mongoose.connect(db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: true,
   useCreateIndex: true 
}).then(() => console.log('connected to the database!')).catch((err) => console.log(err));

// routes prefix
app.use('/api/post', require("./routes/routes"))

//static directory -
app.use(express.static(path.join(__dirname, 'public')))

//use the passport middleware
app.use(passport.initialize());

//Bring in the Passport
require('./config/passport')(passport);

//Bring in the users route
const users = require('./routes/api/users');
app.use('/api/users', users);

// start server
app.listen(port, () => console.log(`server running at http://localhost:${port}`))
