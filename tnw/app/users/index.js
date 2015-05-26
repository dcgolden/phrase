/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.users';
}

(function (window, angular, undefined) {
  angular.module('app.users', [require('./pouchdb')])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          .state('users', {
            url: '/users',
            abstract: true,
            template: '<div ui-view></div>'
          })
          .state('users.signup', require('./components/signup'))
          .state('users.login', require('./components/login'))
          .state('users.changePassword', require('./components/change-password'))
          .state('users.show', require('./components/show'))

     }])
    .factory('users', ['pouchDB', 'remoteUserDbName', require('./services').users])
})( window, window.angular)