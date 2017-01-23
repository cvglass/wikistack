//will first need to createdb wikistack in terminal
//this will create the database

//Imports Sequelize library, and connects to the PostgrSQL database (created in terminal)
//at the specified location on the server
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

//Defines and creates Page table schema in our PostgrSQL database using Sequelize framework
//includes getter/setter methods and table columns
var Page = db.define('page', {
	title: {type: Sequelize.STRING, allowNull: false},
	urlTitle: {type: Sequelize.STRING, allowNull: false},
	content: {type: Sequelize.TEXT, allowNull: false},
	status: {type: Sequelize.ENUM('open', 'closed')},
	date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW }
	}, {
		getterMethods : {
			urlRoute : function() {
				return "/wiki/" + this.urlTitle;
			}
		},
		hooks: {
			beforeValidate : function generateUrlTitle(page){
				if(page.title){
					page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
				} else {
					page.urlTitle = Math.random().toString(36).substring(2,7);
				}
			}
		}
});
//hooks: since we selected beforeValide,
//before we save our page instance, it's going to run the method
//it's passing the page instance as an argument
//we're not going to return our output, but instead attach to the instance
//of the table we just created (called page)



//Defines and creates User table schema in our PostgrSQL database using Sequelize framework
//includes getter/setter methods and table columns
var User = db.define('user', {
	name: {type: Sequelize.TEXT, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false, isEmail: true}
});

module.exports = {
  Page: Page,
  User: User
};