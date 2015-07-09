'use strict'

var fs = require('fs')

module.exports = function (users) {
  return {
    restrict: 'E',
    controller: ['$scope', 'users', '$state', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', '$rootScope', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
  }
}

function controller ($scope, users, $state, $mdSidenav, $mdUtil, $log, $mdDialog, $rootScope, $stateParams) {

  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug('toggle ' + navID + ' is done');
            });
        },300);

    return debounceFn;
  }

  $scope.toggleLeft = buildToggler('left');

  function getSession () {
    users.getSession()
    .then(function (o) {
      console.log(o.userCtx.name)
      $scope.$apply(function() {
        $scope.activeUser = o.userCtx.name  
      })
    })
    .catch(function(e) {
      $scope.$apply(function() {
        $scope.activeUser = null  
      })
    })
  }

  $scope.$on('users.login.success', getSession)

  getSession()
  
  $scope.logout = function () {
    users.logout().then(function() {
      $scope.$apply(function() {
        $scope.activeUser = null
        $state.go('home')
      })
    })
  }

  $scope.setting = true;

  $scope.LoginDialog = function(ev) {
    $scope.setting = true;
    $mdDialog.show({
        controller: controller,
        clickOutsideToClose: true,
        template: '<md-dialog aria-label="popinLogin" class="loginPopup"> <div ng-if="setting"> <md-content class="md-padding"> <div class="pageTitle">Hi there!</div> <div> <a class="loginPopupSubheader" ui-sref="home" ng-click="SignUpDialog()"> New to Phrase? Sign Up</a> </div> <form name="Login" ng-submit="login(user)"> <div> <md-input-container flex class="loginPopupUsername"> <label>Username</label> <input type="text" ng-model="user.username"> </md-input-container> <md-input-container class="loginPopupPassword" flex> <label>Password</label> <input type="password" ng-model="user.password"> </md-input-container> </div> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button class="loginPopupCancel" ng-click="SignUpDialog()"> Sign Up </md-button> <md-button class="loginPopupLogin" ng-click="login(user)" class="md-raised md-primary"> Login </md-button> </div> </md-dialog> </div> <div ng-if="!setting"> <md-content class="md-padding"> <div class="pageTitle">Hi there!</div> <div> <a class="loginPopupSubheader" ui-sref="home" ng-click="LoginDialogTrue()"> Have an account? Login</a> </div> <form name="Signup" ng-submit="Signup(user)"> <div> <md-input-container flex class="loginPopupUsername"> <label>Username</label> <input type="text" ng-model="user.username"> </md-input-container> <md-input-container class="loginPopupPassword" flex> <label>Password</label> <input type="password" ng-model="user.password"> </md-input-container> </div> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button class="loginPopupCancel" ng-click="LoginDialogTrue()"> Login </md-button> <md-button class="loginPopupLogin" ng-click="signup(user)" class="md-raised md-primary"> Signup </md-button> </div> </div> </md-dialog>',
        targetEvent: ev,
      })
  }

  $scope.LoginDialogTrue = function() {
    $scope.setting = true;
  }

  $scope.SignUpDialog = function() {
    $scope.setting = false;
  }

  $scope.login = function (user) {
    $mdDialog.hide()
    users.login(user.username, user.password)
      .then(function (res) {
        $rootScope.$broadcast('users.login.success')
        $state.go('home')
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  $scope.signup = function (user) {
    $mdDialog.hide()
    users.signup(user.username, user.password, user.email)
      .then(function (res) {
        $state.go('users.login')
      })
  }
  $scope.hide = function() {
    $mdDialog.hide();
  }
};