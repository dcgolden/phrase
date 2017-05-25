'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/list',
  controller: ['$scope', 'users', controller],
}

function controller ($scope, users) {
  /*Tells controller back or menu button*/
	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

	    function backButtonPlacer() {
	        return { name: 'isArticlePageBool', data: false };
	}
  /*Lists all users*/
  users.list().then(function (res) { 
    $scope.users = res
  })

}