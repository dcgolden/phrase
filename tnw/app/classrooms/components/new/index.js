'use strict';
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/new',
    controller: ['$scope', 'classrooms', 'users', '$state', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, classrooms, users, $state, $mdDialog) {
    /*Communicates between two things. We're not sure what this is sorry, but it's needed*/
    var self = this;
    self.tags = [];
    /*Creates a new classroom then goes back to list*/
    $scope.create = function(classroom) {  
        classrooms.create(classroom)
            .then(function(res) {
                $state.go('classrooms.list');
            });
    };
    /*back or menu button*/
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return {
            name: 'isArticlePageBool',
            data: true
        };
    }
    /*Saves the classroom color for color coding classrooms, currently this field is not used anywhere*/
    $scope.saveColor = function() {
        $mdDialog.hide();
        $scope.classroom.color = rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue);
    };
    /*Turns rgb values from color picker into hex*/
    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    /*Hides the ColorPickerDialog*/
    $scope.hide = function() {
        $mdDialog.hide();
        console.log('hidden!');
    };

    /*Initalizes classroom to avoid undefined references*/
    $scope.classroom = {
        name: '',
        description: '',
	    students: {},
        color: ''
    }; 

      /*Lists all users*/
      users.list().then(function (res) {
         $scope.users = res
      })


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
    }

    //delete users from classroom
    $scope.index = {value:0};
    $scope.deleteUser = function() {                 
        //if there are more users in classroom
        if(Object.keys($scope.classroom.students).length > 1){
            //delete selected user
            $scope.classroom.students[$scope.index.value] = null;
            //if your deleted user isn't the last index
            if($scope.index.value != Object.keys($scope.classroom.students).length - 1){
                for(var i = $scope.index.value; i < Object.keys($scope.classroom.students).length; i++){
                    if(i < Object.keys($scope.classroom.students).length - 1){
                        //start at index where you deleted user and replace other user indexs with the next index and stop at the last index
                        $scope.classroom.students[i] = $scope.classroom.students[i+1];
                    }
                }
            }
            console.log("size(del)" + Object.keys($scope.classroom.students).length);
            //delete the last index
            delete $scope.classroom.students[Object.keys($scope.classroom.students).length-1];
            console.log("size(del)" + Object.keys($scope.classroom.students).length);
        }else{
            delete $scope.classroom.students[0];
        }
        console.log("index:" + $scope.index.value);
        console.log("size(del)" + Object.keys($scope.classroom.students).length);
    }



    /*Shows color picker dialog*/
    /*A lot of this code comes from /*https://material.angularjs.org/latest/#/demo/material.components.slider*/
    $scope.ColorDialog = function(ev) {
        $mdDialog.show({
            controller: controller,
            /*Clicking outside the dialog closes it*/
            clickOutsideToClose: true,
            /*Sets scope same as main page*/
            scope: $scope,
            /*Preserves the scope*/
            preserveScope: true,
            /*Unfortunately template html needs to be done like this since we couldn't get templateURL to work*/
            template: '<md-dialog aria-label="popinLogin" ng-class="{loginPopup: setting, signupPopup: !setting}">' +
                '<md-content class="md-padding">' +
                '<div>' +
                '<span class="pageSubTitle">Classroom Color</span>' +
                '<h3>' +
                'RGB' + '<span ng-attr-style="border: 1px solid #333; background: rgb({{color.red}},{{color.green}},{{color.blue}})">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
                '</h3>' +
                '<div layout>' +
                '<div flex="10" layout layout-align="center center">' +
                '<span class="md-body-1">R</span>' +
                '</div>' +
                '<md-slider flex min="0" max="255" ng-model="color.red" aria-label="red" id="red-slider" class="md-primary">' +
                '</md-slider>' +
                '<div flex="20" layout layout-align="center center">' +
                '<input type="number" ng-model="color.red" aria-label="red" aria-controls="red-slider">' +
                '</div>' +
                '</div>' +
                '<div layout>' +
                '<div flex="10" layout layout-align="center center">' +
                '<span class="md-body-1">G</span>' +
                '</div>' +
                '<md-slider flex ng-model="color.green" min="0" max="255" aria-label="green" id="green-slider" class="md-primary">' +
                '</md-slider>' +
                '<div flex="20" layout layout-align="center center">' +
                '<input type="number" class="md-gSlider" ng-model="color.green" aria-label="green" aria-controls="green-slider">' +
                '</div>' +
                '</div>' +
                '<div layout>' +
                '<div flex="10" layout layout-align="center center">' +
                '<span class="md-body-1">B</span>' +
                '</div>' +
                '<md-slider flex ng-model="color.blue" min="0" max="255" aria-label="blue" id="blue-slider" class="md-primary">' +
                '</md-slider>' +
                '<div flex="20" layout layout-align="center center">' +
                '<input type="number" class="rgbSlider" ng-model="color.blue" aria-label="blue" aria-controls="blue-slider">' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<md-button ng-click="saveColor()" class="md-raised md-primary">Save Classroom Color</md-button>' +
                '</div>' +
                '</div>' +
                '</md-content>' +
                '</md-dialog>',
                /*Where the dialog box should animate from. The ev is where you clicked*/
                /*Manifests itself as ng-click=colorDialog(ev)*/
            targetEvent: ev
        });
    };
}
