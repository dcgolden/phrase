'use strict';

var fs = require('fs');

module.exports = {
    url: '/new',
    controller: ['$scope', 'classrooms', '$state', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, classrooms, $state, $mdDialog) {
    var self = this;
    self.tags = [];

    $scope.create = function(classroom) {
        classrooms.create(classroom)
            .then(function(res) {
                $state.go('classrooms.list');
            });
    };

    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return {
            name: 'isArticlePageBool',
            data: true
        };
    }

    $scope.saveColor = function() {
        $mdDialog.hide();
        $scope.classroom.color = rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue);
    };

    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    $scope.hide = function() {
        $mdDialog.hide();
        console.log('hidden!');
    };

    $scope.classroom = {
        name: '',
        description: '',
        color: ''
    };

    $scope.ColorDialog = function(ev) {
        $mdDialog.show({
            controller: controller,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
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

            targetEvent: ev
        });
    };
}
