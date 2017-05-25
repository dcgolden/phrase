/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.classrooms';
}

(function (window, angular, undefined) {
  angular.module('app.classrooms', [require('./pouchdb')])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          /*main state name*/
          .state('classrooms', {
            /*main url branch*/
            url: '/classrooms',
            abstract: true,
            /*shows app nav above these states*/
            template: '<div ui-view></div>'
          })
          /*Lists sub states of classrooms and their requirements*/
          .state('classrooms.list', require('./components/list'))
          .state('classrooms.new', require('./components/new'))
          .state('classrooms.show', require('./components/show'))
          .state('classrooms.edit', require('./components/edit'))

     }])
    /*exposes classroom services in a factory*/
    .factory('classrooms', ['pouchDB', 'dbName', require('./services').classrooms])

})( window, window.angular)