'use strict'

var fs = require('fs')

module.exports = {
  url: '/list',
  controller: ['$scope', 'articles', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, articles) {
  articles.list().then(function (docs) {
    $scope.articles = docs
  })
}