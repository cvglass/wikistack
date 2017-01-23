const express = require('express');
const app = express();
const route = require('./routes/wiki')
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const models = require('./models');

app.use(express.static('public')); //where css or pictures or others files are

// plugs in our wiki router called "route"
//routes in "route" need not include "/wiki", can just be "/"
app.use('/wiki', route);

var env = nunjucks.configure('views', {noCache: true});
//'view' is where html files are
app.set('view engine', 'html');
//what types of files nunjucks will render

app.engine('html', nunjucks.render);
//tells express when gets html files with res.render
//call nunjucks.render

app.use(morgan("dev"));

//Updates are database/tables/schema with what's been changed on the server side
//Occurs everytime we connect to the server to the client
//will catch errors if there are problems connecting etc.
//NOTE done asynchronously with promises and .then/.catch chains
models.User.sync({})
	.then(function (){
		return models.Page.sync({})
	}).then(function (){
		app.listen(3000, function(){
		console.log('looks good');
		});
	}).catch(console.error);

