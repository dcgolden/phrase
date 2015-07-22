'use strict'

var fs = require('fs')

module.exports = {
  url: '/list',
  controller: ['$scope', 'classrooms', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, classrooms) {

	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

	    function backButtonPlacer() {
	        return { name: 'isArticlePageBool', data: false };
	}

  classrooms.list().then(function (res) {
    $scope.classrooms = res
  })
}