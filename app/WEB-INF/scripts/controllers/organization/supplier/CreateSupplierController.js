(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateSupplierController: function(scope,webStorage,resourceFactory, location) {
      
    	scope.formData = {};
    	
        scope.submit = function() {   
            resourceFactory.supplierResource.save(this.formData,function(data){
            		location.path('/supplier');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateSupplierController', ['$scope','webStorage','ResourceFactory', '$location', mifosX.controllers.CreateSupplierController]).run(function($log) {
    $log.info("CreateSupplierController initialized");
  });
}(mifosX.controllers || {}));
