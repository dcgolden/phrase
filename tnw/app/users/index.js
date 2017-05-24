/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.users';
}

(function (window, angular, undefined) {
  angular.module('app.users', [require('./pouchdb')])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          /*name of main state*/
          .state('users', {
            /*main state url branch*/
            url: '/users',
            abstract: true
            /*shows app-nav above state*/,
            template: '<div ui-view></div>'
          })
          /*substates and their requirements*/
          .state('users.signup', require('./components/signup'))
          .state('users.login', require('./components/login'))
          .state('users.changePassword', require('./components/change-password'))
          .state('users.show', require('./components/show'))
          .state('users.notify', require('./components/notify'))

          //CHANGED THIS
          .state('users.list', require('./components/list'))

     }])
    /*intiliazes users factory*/
    .factory('users', ['pouchDB', 'remoteUserDbName', require('./services').users])
})( window, window.angular)
