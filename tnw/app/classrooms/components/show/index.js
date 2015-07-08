'use strict';

var fs = require('fs');

module.exports = {
    url: '/:id',
    controller: ['$scope', 'classrooms', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, classrooms, $stateParams) {
    classrooms.get($stateParams.id)
        .then(function(doc) {
            $scope.classroom = doc;
        });

    classrooms.getArticles($stateParams.id)
        .then(function(res) {
            $scope.articles = res;
        });
}
