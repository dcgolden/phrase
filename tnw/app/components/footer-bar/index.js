'use strict'

var fs = require('fs')

module.exports = function(users) {
  return{
	restrict: 'E',
	controller: ['$scope', 'users', '$state', '$rootScope', controller],
	template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
  }
}

function controller ($scope, users, $state, $rootScope) {

	}