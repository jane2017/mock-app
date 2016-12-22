describe('searchController', function() {
  beforeEach(module('ui.router'));
  beforeEach(module('mets'));
  beforeEach(module('mets.common'));
  beforeEach(module('mets.search'));

  var $controller, $stateProvider;

  beforeEach(function () {
    inject(function (_$controller_, _$stateProvider_) {
      $controller = _$controller_;
      $stateProvider = _$stateProvider_;
    });
  });

  describe('search result', function() {
    it('sets rules and check results', function () {
      expect($controller.getStateOptions()[0]).toBeDefined(); 
    });

  });

});

