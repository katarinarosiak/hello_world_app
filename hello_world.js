const express = require('express');
const morgan = require('morgan');
const app = express();


//where to look for pug file, use pug engine
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public')); //where to look for static assets
//express.static - middleware

//loging status
app.use(morgan('common'));

//ROUTING
//render pug file
app.get('/', (req, res) => {
  res.redirect("/english");
});

app.get("/english", (req, res) => {
  res.render("hello-world-english");
});

app.get("/french", (req, res) => {
  res.render("hello-world-french");
});

app.get("/serbian", (req, res) => {
  res.render("hello-world-serbian");
});


app.listen(3000, 'localhost', () => {
  console.log('Listening to port 3000');
});