'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
    /*This part exposes this module to rest of app*/
module.exports = {
    url: '/:id/edit',
    controller: ['$scope', 'classrooms', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller($scope, classrooms, $state, $stateParams) {
    /*Tells controller if page should have back or menu button*/
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return {
            name: 'isArticlePageBool',
            data: true
        };
    }
    /*Get the classroom by the id in $stateParams */
    classrooms.get($stateParams.id)
        .then(function(doc) {
            $scope.classroom = doc
        })
    /*Saves classrooms edits*/
    $scope.update = function(classroom) {
        classrooms.update(classroom)
            .then(function(res) {
                $state.go('classrooms.show', {
                    id: classroom._id
                })
            })
    }
}
