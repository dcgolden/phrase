'use strict'

var fs = require('fs')

module.exports = function (users) {
  return {
    restrict: 'E',
    controller: ['$scope', 'users', '$state', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', '$rootScope', '$stateParams', '$window', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
  }
}

function controller ($scope, users, $state, $mdSidenav, $mdUtil, $log, $mdDialog, $rootScope, $stateParams, $window) {

  /*sets default for backbutton appearing to be false*/
  $scope.isArticlePage = false;

  /*watched for the $emit() function*/
  $scope.$on('isArticlePageBool', function( event, bool ){
    $scope.isArticlePage = bool; /*sets variable = to passed value*/
  });

  /*function for the back button*/
  $scope.goBack = function(){
    $window.history.back(); /*possible bug. this takes you back one page like hitting back button in the browser*/
    $scope.isArticlePage = false; /*resets the value to false once you go back one page. listens for $emit() to set ot true*/
  }

  /*function for going to view: home*/
  $scope.goHome = function(){
    $state.go('home') /*takes you to view: home*/
  }

  /*fucntion for toggling the nav bar*/
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

  /*begins above function with nav bar labled 'left' useful for more than one nav bar if needed*/
  $scope.toggleLeft = buildToggler('left');

  /*gets the current user session*/
  function getSession () {
    users.getSession()
    .then(function (o) {
      console.log(o.userCtx.name)
      $scope.$apply(function() {
        $scope.activeUser = o.userCtx.name /*sets activeUser to the user's username*/
      })
    })
    .catch(function(e) {
      $scope.$apply(function() {
        $scope.activeUser = null  
      })
    })
  }

  /*runs above function after a login*/
  $scope.$on('users.login.success', getSession);

  /*runs getSession() *above* on page load*/
  getSession();
  
  $scope.logout = function () {
    users.logout().then(function() {
      $scope.$apply(function() {
        $scope.activeUser = null
        $state.go('home')
      })
    })
  }

  /*888             this section is for the login mdDialog                    888*/
  /*the configuration for the mdDialog... ev is where the button was clicked*/
  $scope.LoginDialog = function(ev) {
    /*what is shown*/
    $mdDialog.show({
        /*the controller we use is this controller*/
        controller: controller,
        /*clicking outside closes the dialog*/
        clickOutsideToClose: true,
        template: '<md-dialog aria-label="popinLogin" ng-class="loginPopup">'+
                    '<md-content class="md-padding">'+ 
                      '<div class="pageTitle">Login to Phrase</div>'+
                      '<div class="popupAnimate">'+
                        '<form name="Login" ng-submit="loginButton(user)" novalidate>'+                                       //dont use HTML5 validation on forms with 'novalidate'
                          '<div>'+
                            '<md-input-container flex class="loginPopupUsername">'+
                              '<label>Username</label>'+
                              '<input type="text" name="username" ng-model="user.username" required>'+                        //make username required
                              '<div class="errors" ng-messages="Login.username.$error" ng-show="Login.username.$touched">'+   //show an error if user clicked into the field and out without entering a username
                                '<div ng-message="required">Required</div>'+                                                  //message to display if they didnt fulfill "required"
                              '</div>'+
                            '</md-input-container>'+
			    '<br/>'+
                            '<md-input-container class="loginPopupPassword" flex>'+
                              '<label>Password</label>'+
                              '<input type="password" name="pass" ng-model="user.password" required>'+                      //make passord required
                              '<div class="errors" ng-messages="Login.pass.$error" ng-show="Login.password.$touched">'+     //show an error is user clicked into the field and out without entering a password
                                '<div ng-message="required">Required</div>'+                                                //message to display if they didnt fulfill "required"
                              '</div>'+
                            '</md-input-container>'+
                          '</div>'+
                          '<div class="md-actions" layout="row">'+
                            '<span flex></span>'+
                            '<md-button type="button" class="loginPopupCancel" ng-click="cancel()">'+                     //cancel button closes the dialog
                              '<span class="pageSubTitle">Cancel</span>'+
                            '</md-button>'+
                            '<md-button type="submit" ng-disabled="Login.$invalid" class="loginPopupLogin md-raised md-primary">Login</md-button>'+ //logs the user in
                          '</div>'+
                        '</form>'+
                      '</div>'+
                    '</md-content>'+
                  '</md-dialog>',
        /*ev is used allowing the dialog to open from where the user clicked*/
        targetEvent: ev,
      })
  }

  /*sets setting to true exposing login*/
  $scope.LoginDialogTrue = function() {
    $scope.setting = true;
  }

  /*sets setting to false exposing signup*/
  $scope.SignUpDialog = function() {
    $scope.setting = false;
  }

  /*logs the user in*/
  $scope.loginButton = function (user) {
    console.log("login")
    users.login(user.username, user.password) /*all the params we need for a login*/
      .then(function (res) {
        $rootScope.$broadcast('users.login.success')
        $mdDialog.hide() /*closes the dialog*/
      })
      .catch(function (err) {
        console.log(err) /*if password or username is wrong. no way for user to tell ATM*/
      })
  }

  /*signs the user up*/
  $scope.signupButton = function (user) {
    $mdDialog.hide() /*closes the dialog*/
    /*all the params we want to save about the user*/
    users.signup(user.username, user.password, user.email, user.role, user.firstName, user.lastName)
      .then(function (res) { /*wait for a promise*/
        console.log("success!")
        $state.go('home'); /*send the user home after a signup*/
        $scope.loginButton(user);/*log the user in after a signup*/
      })
  };
  
  /*function to close the dialoge*/
  $scope.hide = function() {
    $mdDialog.hide();
    console.log("hidden!")
  };

  /*function to cancel out of the dialog*/
  $scope.cancel = function() {
    $mdDialog.cancel();
    console.log("canceled!")
  };

  /*function to reply from a dialog*/
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};
