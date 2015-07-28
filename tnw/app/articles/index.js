'use strict';
/* commonjs package manager support (eg componentjs) */
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'app.articles';
}

(function (window, angular, undefined) {
  angular.module('app.articles', [require('./pouchdb')])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          /*main State name*/
          .state('articles', {
            /*Main url branch*/
            url: '/articles',
            abstract: true,
            /*This is what shows the app nav on top of these states*/
            template: '<div ui-view></div>'
          })
          /*List all sub state names in articles and their required files */
          .state('articles.list', require('./components/list'))
          .state('articles.new', require('./components/new'))
          .state('articles.url', require('./components/url'))
          .state('articles.pdf', require('./components/pdf'))
          .state('articles.show', require('./components/show'))
          .state('articles.edit', require('./components/edit'))

     }])
    /*AngularJS Factories to expose the services of articles and classrooms*/
    /*This allows us to get list of classrooms from the articles context*/
    .factory('classrooms', ['pouchDB', 'dbName', require('../classrooms/services').classrooms])
    .factory('articles', ['pouchDB', 'dbName', require('./services').articles]);

})( window, window.angular);