/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.classrooms';
}

(function (window, angular, undefined) {
  angular.module('app.classrooms', [require('angular-pouchdb')])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          .state('classrooms', {
            url: '/classrooms',
            abstract: true,
            template: '<div ui-view></div>'
          })
          .state('classrooms.list', require('./components/list'))
          .state('classrooms.new', require('./components/new'))
          .state('classrooms.show', require('./components/show'))
          .state('classrooms.edit', require('./components/edit'))

     }])
    .factory('classrooms', ['pouchDB', 'dbName', require('./services').classrooms])
})( window, window.angular)