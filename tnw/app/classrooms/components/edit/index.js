'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/:id/edit',
    controller: ['$scope', 'classrooms', 'users', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller($scope, classrooms, users, $state, $stateParams) {
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

      /*Lists all users*/
      users.list().then(function (res) {
         $scope.users = res
      })
      //edit users
      $scope.showEdit = false;
      $scope.editUsers = function() {
        $scope.showEdit = ! $scope.showEdit;
      }

    //delete users from classroom
    //bug if you delete anyone but the last index -> last index gets messed up
    $scope.index = {value:0};
    $scope.deleteUser = function() {
        delete $scope.classroom.students[$scope.index.value];
        console.log("size(del):" + Object.keys($scope.classroom.students).length);
        console.log("current index(del): " + $scope.index.value);
        if(Object.keys($scope.classroom.students).length > 0){
            if($scope.index.value != Object.keys($scope.classroom.students).length){
                for(var i = $scope.index.value; i < Object.keys($scope.classroom.students).length; i++){
                    if(i < Object.keys($scope.classroom.students).length - 1){
                        $scope.classroom.students[i] = $scope.classroom.students[i+1];
                    }
                }
            }
            delete $scope.classroom.students[Object.keys($scope.classroom.students).length - 1];
        }
    }

    //check for duplicate or invalid entries
    var size = 0;
    $scope.addUser = function() {
        var isAlreadyInClassroom = false;
        if($scope.classroom.students[0] != null){
            size = Object.keys($scope.classroom.students).length;
            if($scope.user == null){
                console.log("null");
            }else{
                for(var a = 0; a < size; a++){
                    if(JSON.stringify($scope.classroom.students[a].name) == JSON.stringify($scope.user.name)){
                        isAlreadyInClassroom = true;
                    }
                }
                if(isAlreadyInClassroom == false){
                    $scope.classroom.students[size] = $scope.user;
                    size++;
                }else{
                    console.log("already in classroom");
                }   
            } 
        }else{
            if($scope.user == null){
                console.log("null");
            }else{
                $scope.classroom.students = {};
                $scope.classroom.students[0] = $scope.user;
                size++;
            }
        }
        // for(var i = 0; i < Object.keys($scope.classroom.students).length; i++){
        //     console.log("people in classroom(add): " + JSON.stringify($scope.classroom.students[i].firstName));
        // }
        console.log("size(add):" + Object.keys($scope.classroom.students).length);
    }

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
