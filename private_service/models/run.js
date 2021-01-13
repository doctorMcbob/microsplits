'use strict'

const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define("Run", {
	game : {
	    type      : Sequelize.STRING,
	    allowNull : false,
	},

	catagory : {
	    type      : Sequelize.STRING,
	    allowNull : false,
	},

	splits : {
	    type         : Sequelize.JSON,
	    allowNull    : false,
	    defaultValue : {},
	},

	time : {
	    type      : Sequelize.INTEGER,
	    allowNull : true,
	}
    })
}
