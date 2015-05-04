'use strict';

describe('Controller: ClassroomsClassroomidCtrl', function () {

  // load the controller's module
  beforeEach(module('bivitfrontSampleApp'));

  var ClassroomsClassroomidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassroomsClassroomidCtrl = $controller('ClassroomsClassroomidCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
