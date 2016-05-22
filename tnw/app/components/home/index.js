'use strict'

var fs = require('fs')

module.exports = {
  url: '/',
  controller: ['$scope', 'users', '$state', '$rootScope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state, $rootScope) {

	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }

    $scope.signupButton = function (user) {
    users.signup(user.username, user.password, user.email, user.role, user.firstName, user.lastName)
      .then(function (res) {
        console.log("success!")
        $state.go('home');
        $scope.loginButton(user);
      })
  };

  $scope.loginButton = function (user) {
    console.log("login")
    users.login(user.username, user.password)
      .then(function (res) {
        $rootScope.$broadcast('users.login.success')
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  $scope.goToArticles = function (){
    $state.go('articles.list');
  }

  $scope.goToClassrooms = function (){
    $state.go('classrooms.list');
  }

  $scope.goToFeatures = function (){
    $state.go('features');
  }

}
