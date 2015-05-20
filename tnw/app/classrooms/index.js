/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.classrooms';
}

(function (window, angular, undefined) {
  angular.module('app.classrooms', [])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
         .state('classrooms', {
           url: '/classrooms',
           template: '<div ui-view></div>'
         })
  //       //.state('classrooms.list', require(__dirname + '/components/list'))
  //       // .state('classrooms.new', require(__dirname + '/components/new'))
  //       // .state('classrooms.show', require(__dirname + '/components/show'))
  //       // .state('classrooms.edit', require(__dirname + '/components/edit'))

     }])
})( window, window.angular)