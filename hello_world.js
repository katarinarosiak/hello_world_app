const express = require('express');
const morgan = require('morgan');
const app = express();

const COUNTRY_DATA = [
  {
    path: "/english",
    flag: "flag-of-United-States-of-America.png",
    alt: "US Flag",
    title: "Go to US English site",
  },
  {
    path: "/french",
    flag: "flag-of-France.png",
    alt: "Drapeau de la france",
    title: "Aller sur le site français",
  },
  {
    path: "/serbian",
    flag: "flag-of-Serbia.png",
    alt: "Застава Србије",
    title: "Идите на српски сајт",
  },
  {
    path: "/polish",
    flag: "flag-of-Poland.png",
    alt: "Polish Flag",
    title: "Idź do strony po polsku"
  }
];

const LANGUAGE_CODES = {
  english: "en-US",
  french: "fr-FR",
  serbian: "sr-Cryl-rs",
  polish: "pl-PL",
};

//where to look for pug file, use pug engine
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public')); //where to look for static assets
//express.static - middleware

//loging status
app.use(morgan('common'));

//view helper - property of app.local.
app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? "current" : "";
};

//ROUTING
//render pug file
app.get('/', (req, res) => {
  res.redirect("/english");
});

app.get("/:language", (req, res, next) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];
  if (!languageCode) {
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: languageCode,
    });
  }
});
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

// listening to specified port
app.listen(3000, 'localhost', () => {
  console.log('Listening to port 3000');
});
