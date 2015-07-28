'use strict';
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/:id',
    controller: ['$scope', 'articles', '$stateParams', '$state', '$http', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};


function controller($scope, articles, $stateParams, $state, $http, $mdDialog) {
    articles.get($stateParams.id).then(function(doc) {
        $scope.article = doc;
    });
    /*Very hackily initalizes annotations after loading data on an article show*/
    /*This was the only way we managed to get annotator to work, since the angularJS*/
    /*paradigm of switching views before urls confused the uri matching*/
    $scope.$on('$viewContentLoaded', function() {
        /*Tells annotator to store URI of newly created annotations*/
        var pageUri = function() {
            return {
                beforeAnnotationCreated: function(ann) {
                    ann.uri = window.location.href;
                }
            };
        };

        var app = new annotator.App()
            .include(annotator.ui.main, {
                /*This was meant to limit annotatiing to only Article Pages but it didn't work*/
                //element: document.querySelector('#articleCardForAnnotation')
            })
            .include(annotator.storage.http, {
                /*The Linode Server running elasticsearch and Annotator-store*/
                prefix: 'http://173.255.227.92:5000'
            })
            /*Includes pageUri as a field in the annotations*/
            .include(pageUri);

        app.start()
            .then(function() {
                /*If not loading directly on articlePage you may need an artifical timeout*/
                /*to deal with AngularJS and the aforementioned URI Problem, it is commented out below*/
                //setTimeout(function() {
                app.annotations.load({
                    uri: window.location.href
                });
                //}, 300);
            });
    });
    /*Tells controller if page should have back or menu button*/
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return {
            name: 'isArticlePageBool',
            data: true
        };
    }
    /*Deletes article with given id*/
    var remove = function(id) {

        articles.remove(id).then(function(res) {
            $state.go('articles.list');
        });
    };


    /*mdDialog for showing a delete prompt*/
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
