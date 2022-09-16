(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewUomController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal){
			scope.uom = [];
			
	        scope.PermissionService = PermissionService;
	        
	        
	        resourceFactory.unitofmeasurementResource.get({uomId: routeParams.id} , function(data) {
	            scope.uom = data;
	           
	        });
	        
		} 
	});
  mifosX.ng.application.controller('ViewUomController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$uibModal',
    mifosX.controllers.ViewUomController]).run(function($log) {
    $log.info("ViewUomController initialized");
  });
}(mifosX.controllers || {}));