'use strict';
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/:id/edit',
    controller: ['$scope', 'articles', 'classrooms', '$stateParams', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, classrooms, $stateParams, $state) {

    /*Tells controller if it should have back or menu button*/
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: true };
    }
    /*Gets the article referenced in stateParams*/
    articles.get($stateParams.id)
    .then(function(doc) {
        $scope.article = doc;
        console.log(doc);
    });
    /*Gets list of all classrooms for the classroom picker*/
    classrooms.list()
        .then(function(classRes) {
            $scope.classrooms = classRes;
        });

    /*Saves the updated article to database and goes to newly updated article*/    
    $scope.update = function(article) {
        articles.update(article).then(function() {
            $state.go('articles.show', {
                id: article._id
            });
        });
    };
}
