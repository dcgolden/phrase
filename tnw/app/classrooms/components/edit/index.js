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
    $scope.index = {value:0};
    $scope.deleteUser = function() {                 
        //set selected user to null
        $scope.classroom.students[$scope.index.value] = null;
        //if there are more users in classroom
        if(Object.keys($scope.classroom.students).length > 0){
            //if your deleted user isn't the last index
            if($scope.index.value != Object.keys($scope.classroom.students).length - 1){
                for(var i = $scope.index.value; i < Object.keys($scope.classroom.students).length; i++){
                    if(i < Object.keys($scope.classroom.students).length - 1){
                        //start at index where you deleted user and replace other user indexs with the next index and stop at the last index
                        $scope.classroom.students[i] = $scope.classroom.students[i+1];
                    }
                }
            }
            //delete the last index
            delete $scope.classroom.students[Object.keys($scope.classroom.students).length-1];
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
