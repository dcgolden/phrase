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

  $scope.$on('users.login.success', getSession);

  getSession();
  
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
        template: '<md-dialog aria-label="popinLogin" ng-class="{loginPopup: setting, signupPopup: !setting}">'+ 
                    '<md-content class="md-padding">'+
                      '<div class="pageTitle">Hi there!</div>'+
                      '<div class="popupAnimate" ng-if="setting">'+
                        '<div>'+
                          '<a href class="loginPopupSubheader" ng-click="SignUpDialog()"> New to Phrase? Sign Up</a>'+
                        '</div>'+
                        '<form name="Login" ng-submit="loginButton(user)">'+
                          '<div>'+
                            '<md-input-container flex class="loginPopupUsername">'+
                              '<label>Username</label>'+
                              '<input type="text" ng-model="user.username">'+
                            '</md-input-container>'+
                            '<md-input-container class="loginPopupPassword" flex>'+
                              '<label>Password</label>'+
                              '<input type="password" ng-model="user.password">'+
                            '</md-input-container>'+
                          '</div>'+
                          '<div class="md-actions" layout="row">'+
                            '<span flex></span>'+
                            '<md-button type="button" class="loginPopupCancel" ng-click="cancel()">'+
                              '<span class="pageSubTitle">Cancel</span>'+
                            '</md-button>'+
                            '<md-button type="submit" class="loginPopupLogin md-raised md-primary" ng-click="loginButton(user)">Login</md-button>'+
                          '</div>'+
                        '</form>'+
                      '</div>'+
                      '<div ng-if="!setting">'+
                        '<div>'+
                          '<a class="loginPopupSubheader" href ng-click="LoginDialogTrue()"> Have an account? Login</a>'+
                        '</div>'+
                        '<form name="Signup" ng-submit="signupButton(user)">'+
                          '<div>'+
                            '<md-checkbox class="signupPopupType" ng-model="user.typeBox" aria-label="typeCheckbox">'+
                              '{{user.type}}'+
                            '</md-checkbox>'+
                            '<md-input-container flex class="signupPopupUsername">'+
                              '<label>Username</label>'+
                              '<input type="text" name="username" ng-model="user.username">'+
                            '</md-input-container>'+
                            '<div class="signupPopupPasswordContainer">'+
                              '<md-input-container class="signupPopupPassword" flex>'+
                                '<label>Password</label>'+
                                '<input type="password" name="pass" ng-model="user.password">'+
                              '</md-input-container>'+
                              '<md-input-container class="signupPopupCPassword" flex>'+
                                '<label>Confirm Password</label>'+
                                '<input type="password" name="cPass" ng-model="user.cPassword">'+
                              '</md-input-container>'+
                            '</div>'+
                            '<md-input-container class="signupPopupEmail" flex>'+
                              '<label>Email</label>'+
                              '<input type="email" name="email" ng-model="user.email">'+
                            '</md-input-container>'+
                          '</div>'+
                          '<div class="md-actions" layout="row">'+
                            '<span flex></span>'+
                            '<md-button type="button" class="loginPopupCancel" ng-click="cancel()">'+
                              '<span class="pageSubTitle">Cancel</span>'+
                            '</md-button>'+
                            '<md-button type="submit" class="loginPopupLogin md-raised md-primary" ng-click="signupButtton(user)"> Signup </md-button>'+
                          '</div>'+
                        '</form>'+
                      '</div>'+
                    '</md-content>'+
                  '</md-dialog>',
        targetEvent: ev,
      })
  }

  $scope.LoginDialogTrue = function() {
    $scope.setting = true;
  }

  $scope.SignUpDialog = function() {
    $scope.setting = false;
  }

  $scope.loginButton = function (user) {
    $mdDialog.hide()
    console.log("login")
    users.login(user.username, user.password)
      .then(function (res) {
        $rootScope.$broadcast('users.login.success')
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  $scope.signupButton = function (user) {
    console.log("signup")
    $mdDialog.hide()
    users.signup(user.username, user.password, user.email)
      .then(function (res) {
        $state.go('articles.list')
      })
  };
  
  $scope.hide = function() {
    $mdDialog.hide();
    console.log("hidden!")
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
    console.log("canceled!")
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};