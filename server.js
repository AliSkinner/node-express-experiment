const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to appand to sever.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'HomePage',
    welcomeMessage: 'Welcome to the site',
  });
});

app.get('/about', (req, res) => {
  let context = {
    pageTitle: 'About Page',
  };
  res.render('about.hbs', context);
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  });
});

app.get('/projects', (req, res) => {
  let context = {
    pageTitle: 'Projects Page',
    placeholder: 'projects to be displayed here.'
  };
  res.render('projects.hbs', context);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
