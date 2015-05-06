'use strict';

describe('Controller: ArticlesArticleidCtrl', function () {

  // load the controller's module
  beforeEach(module('bivitfrontSampleApp'));

  var ArticlesArticleidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticlesArticleidCtrl = $controller('ArticlesArticleidCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
