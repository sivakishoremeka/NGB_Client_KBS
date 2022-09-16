(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewRumController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal){
			scope.rum = [];
			
	        scope.PermissionService = PermissionService;
	        
	        
	        resourceFactory.ratableusagemetricResource.get({ratableId: routeParams.id} , function(data) {
	            scope.rum = data;
	           
	        });
	        
		} 
	});
  mifosX.ng.application.controller('ViewRumController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$uibModal',
    mifosX.controllers.ViewRumController]).run(function($log) {
    $log.info("ViewRumController initialized");
  });
}(mifosX.controllers || {}));