var handlebars = require('express-handlebars');

// Connect mySQL
var hbs = handlebars.create({
    defaultLayout: 'main',
    partialsDir: 'views/partials',
    extname: '.hbs'
});

module.exports = hbs;