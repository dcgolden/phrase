/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.users';
}

(function (window, angular, undefined) {
  angular.module('app.users', [])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          .state('users', {
            url: '/users',
            abstract: true,
            template: '<div ui-view></div>'
          })
          .state('users.list', require('./components/list'))
  //       // .state('classrooms.new', require(__dirname + '/components/new'))
  //       // .state('classrooms.show', require(__dirname + '/components/show'))
  //       // .state('classrooms.edit', require(__dirname + '/components/edit'))

     }])
})( window, window.angular)