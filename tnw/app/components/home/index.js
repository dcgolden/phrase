'use strict'

var fs = require('fs')

module.exports = {
  url: '/',
  controller: ['$scope', 'users', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state) {

	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }

    $scope.signupButton = function (user) {
    users.signup(user.username, user.password, user.email, user.role, user.firstName, user.lastName)
      .then(function (res) {
        console.log("success!")
        $state.go('artilces.list');
        $scope.loginButton(user);
      })
  };

}