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

  /*888             this section is for the mdDialog... login and signup                     888*/

  /*sets 'setting' to true on default... setting=true means login is shown... false means signup*/
  $scope.setting = true;

  /*the configuration for the mdDialog... ev is where the button was clicked*/
  $scope.LoginDialog = function(ev) {
    /*sets setting to true on each initialization of the dialog*/
    $scope.setting = true;
    /*what is shown*/
    $mdDialog.show({
        /*the controller we use is this controller*/
        controller: controller,
        /*clicking outside closes the dialog*/
        clickOutsideToClose: true,
        /*what is actually displayed... i tried using 'templateUrl:' instead but was errored out:*/
        /*template can only have one head... my template does only have one... idk whats wrong*/
        template: '<md-dialog aria-label="popinLogin" ng-class="{loginPopup: setting, signupPopup: !setting}">'+              //set a class depending on signup or login
                    '<md-content class="md-padding">'+ 
                      '<div class="pageTitle">Hi there!</div>'+
                      '<div class="popupAnimate" ng-if="setting">'+                                                           //if setting is true, show this div (login)
                        '<div>'+
                          '<a href class="loginPopupSubheader" ng-click="SignUpDialog()"> New to Phrase? Sign Up</a>'+        //clicking this makes setting false (signup)
                        '</div>'+
                        '<form name="Login" ng-submit="loginButton(user)" novalidate>'+                                       //dont use HTML5 validation on forms with 'novalidate'
                          '<div>'+
                            '<md-input-container flex class="loginPopupUsername">'+
                              '<label>Username</label>'+
                              '<input type="text" name="username" ng-model="user.username" required>'+                        //make username required
                              '<div class="errors" ng-messages="Login.username.$error" ng-show="Login.username.$touched">'+   //show an error if user clicked into the field and out without entering a username
                                '<div ng-message="required">Required</div>'+                                                  //message to display if they didnt fulfill "required"
                              '</div>'+
                            '</md-input-container>'+
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
                      '<div ng-if="!setting">'+                                                                           //if setting is false, show this div (signup)
                        '<div>'+
                          '<a class="loginPopupSubheader" href ng-click="LoginDialogTrue()"> Have an account? Login</a>'+ //clicking this makes setting true (signup)
                        '</div>'+
                        '<form name="Signup" ng-submit="signupButton(user)" novalidate>'+                                 //dont use HTML5 validation
                          '<div>'+
                            '<md-input-container flex class="signupPopupRole">'+
                              '<label>Role</label>'+
                              '<md-select name="role" ng-model="user.role" required>'+                                    //make 'role' required
                                '<md-option value="student">Student</md-option>'+
                                '<md-option value="teacher">Teacher</md-option>'+
                              '</md-select>'+
                              '<div class="errors" ng-messages="Signup.role.$error" ng-show="Signup.role.$touched">'+     //show an error if user clicked and did not complete
                                '<div ng-message="required">Required</div>'+                                              //message to display if user didnt fulfill 'required'
                              '</div>'+
                            '</md-input-container>'+
                            '<div class="signupPopupNameContainer">'+
                              '<md-input-container flex class="signupPopupFirstName">'+
                                '<label>First Name</label>'+
                                '<input type="text" name="firstName" ng-model="user.firstName" ng-maxlength="40" required>'+        //make first name required, also give it a max length
                                '<div class="errors" ng-messages="Signup.firstName.$error" ng-show="Signup.firstName.$touched">'+   //show an error if user clicked and did not complete or too long
                                  '<div ng-message="required">Required</div>'+                                                      //message to display if user didnt fulfill 'required'
                                  '<div ng-message="maxlenght">First name too long!</div>'+                                         //message to display if user didnt fulfill 'maxlength'
                                '</div>'+
                              '</md-input-container>'+
                              '<md-input-container flex class="signupPopupLastName">'+
                                '<label>Last Name</label>'+
                                '<input type="text" name="lastName" ng-model="user.lastName" ng-maximum="40" required>'+            //make last name required, also goive it a max length
                                '<div class="errors" ng-messages="Signup.lastName.$error" ng-show="Signup.lastName.$touched">'+     //show an error if user clicked and did not complete or too long
                                  '<div ng-message="required">Required</div>'+                                                      //message to display if user didnt fulfill 'required'
                                  '<div ng-message="maxlenght">Last name too long!</div>'+                                          //message to display if user didnt fulfill 'maxlength'
                                '</div>'+
                              '</md-input-container>'+
                            '</div>'+
                            '<md-input-container flex class="signupPopupUsername">'+
                              '<label>Username</label>'+
                              '<input type="text" name="username" ng-model="user.username" ng-maxlength="26" required>'+            //make username required, also give it a max length
                              '<div class="errors" ng-messages="Signup.username.$error" ng-show="Signup.username.$touched">'+       //show an error if user clicked and did not complete or too long
                                '<div ng-message="required">Required</div>'+                                                        //message to display if user didnt fulfill 'required'
                                '<div ng-message="maxlength">Username is too long!</div>'+                                          //message to display if user didnt fulfill 'maxlength'
                              '</div>'+
                            '</md-input-container>'+
                            '<div class="signupPopupPasswordContainer">'+
                              '<md-input-container class="signupPopupPassword" flex>'+
                                '<label>Password</label>'+
                                '<input type="password" name="pass" ng-model="user.password" ng-minlength="6" ng-maxlength="254" required>'+  //make password required, maxlength, minlength
                                '<div class="errors" ng-messages="Signup.pass.$error" ng-show="Signup.pass.$touched">'+                       //show an error if user clicked and did not complete, too long, or too short
                                  '<div ng-message="required">Required</div>'+                                                                //message to display if user didnt fulfill 'required'
                                  '<div ng-message="maxlength">Password is too long!</div>'+                                                  //message to display if user didnt fulfill 'maxlength'
                                  '<div ng-message="minlength">Password is too short!</div>'+                                                 //message to display if user didnt fulfill 'minlength'
                                '</div>'+
                              '</md-input-container>'+
                              '<md-input-container class="signupPopupCPassword" flex>'+
                                '<label>Confirm Password</label>'+
                                '<input type="password" name="cPass" ng-model="cPassword" compare-to="user.password" required>'+    //make check password required, also give it 'compare-to' directive from 'app/index.js'
                                '<div class="errors" ng-messages="Signup.cPass.$error" ng-show="Signup.cPass.$touched">'+           //show an error if user clicked and did not complete, or not match password
                                  '<div ng-message="required">Passwords do not match</div>'+                                        //message to display if user didnt fulfill 'compare-to' !!no message for required... maybe add one?!!
                                '</div>'+
                              '</md-input-container>'+
                            '</div>'+
                            '<md-input-container class="signupPopupEmail" flex>'+
                              '<label>Email</label>'+
                              '<input type="email" name="email" ng-model="user.email" ng-maxlength="100" required>'+          //make email required, maxlength
                              '<div class="errors" ng-messages="Signup.email.$error" ng-show="Signup.email.$touched">'+       //show an error if user clicked and did not complete, too long
                                '<div ng-message="required">Required</div>'+                                                  //message to display if user didnt fulfill 'required'
                                '<div ng-message="maxlength">Email is too long!</div>'+                                       //message to display if user didnt fulfill 'maxlength'
                              '</div>'+
                            '</md-input-container>'+
                          '</div>'+
                          '<div class="md-actions" layout="row">'+
                            '<span flex></span>'+
                            '<md-button type="button" class="loginPopupCancel" ng-click="cancel()">'+                         //cancel the mdDialog
                              '<span class="pageSubTitle">Cancel</span>'+
                            '</md-button>'+
                            '<md-button type="submit" ng-disabled="Signup.$invalid" class="loginPopupLogin md-raised md-primary"> Signup </md-button>'+   //signup!
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