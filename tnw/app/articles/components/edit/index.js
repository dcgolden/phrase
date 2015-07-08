'use strict';

var fs = require('fs');

module.exports = {
    url: '/:id/edit',
    controller: ['$scope', 'articles', 'classrooms', '$stateParams', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, classrooms, $stateParams, $state) {

    var article = "test";

    articles.get($stateParams.id)
    .then(function(doc) {
        $scope.article = doc;
        console.log(doc);
    });
    
    classrooms.list()
        .then(function(classRes) {
            $scope.classrooms = classRes;
        });


    $scope.update = function(article) {
        articles.update(article).then(function() {
            $state.go('articles.show', {
                id: article._id
            });
        });
    };
}
