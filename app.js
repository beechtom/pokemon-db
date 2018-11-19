var express    = require('express'),
    hbs        = require('./middlewares/hbs'),
    method     = require('method-override'),
    bodyParser = require('body-parser'),
    routes     = require('./routes/index');

// Initialize app
var app = express();

// Initialize handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));

// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Method-override
app.use(method('_method'))

// IMPORT ROUTES
app.use('/', routes);

// Index Page
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(5050, function() {
    console.log("Process started on port 5050. Press CTRL-C to terminate.");
});