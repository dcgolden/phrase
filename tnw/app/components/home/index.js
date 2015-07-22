'use strict'

var fs = require('fs')

module.exports = {
  url: '/',
  controller: ['$scope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope) {

	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }

}