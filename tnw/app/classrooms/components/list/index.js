'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/list',
  controller: ['$scope', 'classrooms', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, classrooms) {
  /*Tells controller back or menu button*/
	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

	    function backButtonPlacer() {
	        return { name: 'isArticlePageBool', data: false };
	}
  /*Lists all classrooms*/
  classrooms.list().then(function (res) {
    $scope.classrooms = res
  })
}