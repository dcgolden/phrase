'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/list',
    //Jest for the role
    controller: ['$scope', 'classrooms', 'users', '$rootScope', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, classrooms, users, $rootScope, $stateParams) {
    /*Tells controller back or menu button*/
  	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

  	    function backButtonPlacer() {
  	        return { name: 'isArticlePageBool', data: false };
  	}
    
    /*Lists all classrooms if admin*/
    if ($scope.activeUser == 'admin') {
        classrooms.list().then(function (res) {
            $scope.classrooms = res
        })
    }
    /*Otherwise lists classrooms made by user*/
    else {
        classrooms.listByUser($scope.activeUser).then(function(res) {
            $scope.classrooms = res
        })
    }
  	
    ////List all the user --testing code 
    //users.list().then(function(res){
    //    $scope.users = res
    //})

    //get current user's metadata using current username
    users.getSession()
    .then(function (o) {
        console.log(o.userCtx.name)
        $scope.$apply(function() {
          users.getUser(o.userCtx.name).then(function (res) {
          $scope.user = res
          })
        })
    })
}
  
