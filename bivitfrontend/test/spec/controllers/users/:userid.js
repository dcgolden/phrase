'use strict';

describe('Controller: UsersUseridCtrl', function () {

  // load the controller's module
  beforeEach(module('bivitfrontSampleApp'));

  var UsersUseridCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersUseridCtrl = $controller('UsersUseridCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
