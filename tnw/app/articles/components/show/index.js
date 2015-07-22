'use strict';

var fs = require('fs');


module.exports = {
    url: '/:id',
    controller: ['$scope', 'articles', '$stateParams', '$state', '$http', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};


function controller($scope, articles, $stateParams, $state, $http, $mdDialog) {
    articles.get($stateParams.id).then(function(doc) {
        $scope.article = doc;
    });


    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return {
            name: 'isArticlePageBool',
            data: true
        };
    }

    var remove = function(id) {

        articles.remove(id).then(function(res) {
            $state.go('articles.list');
        });
    };
    var url = "http://bivit-dev.iriscouch.com/annotator/_design/annotator/_view/annotations?include_docs=true&key="
    var currentURL = JSON.stringify(window.location.href);
    var escapedCurrentURL = currentURL.replace("#", "\\u0023");
    var fullURl = url + escapedCurrentURL 
    console.log(fullURl);

    $http.get(fullURl)
        .success(function(data) {
            $scope.annotations = data;
            console.log(data);
        });

    /*articles.dlAnns()
        .then(function(res) {
            $scope.annoations = res;
            console.log(res);
        });*/
    $scope.showConfirm = function(id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Would you like to delete this article?')
            .content('This will delete it forever.')
            .ariaLabel('Article Delete')
            .ok('Delete')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            remove(id);
            console.log('deleted!');
        }, function() {});
    };
}
