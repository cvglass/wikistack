const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

router.get('/', function(req, res, next){
	//res.redirect('/');
	Page.findAll({
	}).then( (page) => {
		res.render('index', {pages : page});
	}).catch (next);
});

router.post('/', function(req, res, next){
	var page = Page.build({
		title: req.body.title,
		content: req.body.content
	});

	page.save()
	.then((page)=>{
		//res.json(page);
		//we have access to the page.urlTitle because it automatically
		//validated and created it before the page.save() above
		res.redirect(page.urlTitle);
	})
	.catch((error) => {
		throw error;
	});
});

router.get('/add', function(req, res, next){
	res.render('addpage');
	//does not need leading "/" or ".html"
});

router.get('/:urlTitle', function(req, res, next){
	//findOne, findAll (and everything in Sequelize) returns a promise
	//hence the .then chained to it
	Page.findOne({
		where: {urlTitle: req.params.urlTitle}
		//attributes: ['title']
	}).then( (page) => {
		//res.json(page);
		res.render('wikipage', {page : page});
	}).catch (next);
});




module.exports = router;






