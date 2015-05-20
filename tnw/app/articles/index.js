/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.articles';
}

(function (window, angular, undefined) {
  angular.module('app.articles', [])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          .state('articles', {
            url: '/articles',
            abstract: true,
            template: '<div ui-view></div>'
          })
          .state('articles.list', require('./components/list'))
  //       // .state('articles.new', require(__dirname + '/components/new'))
  //       // .state('articles.show', require(__dirname + '/components/show'))
  //       // .state('articles.edit', require(__dirname + '/components/edit'))

     }])
})( window, window.angular)