(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewTemplateDefController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal){
			scope.templatedf = [];
			scope.templateId = routeParams.id;
			
	        scope.PermissionService = PermissionService;
	        
	        
	        resourceFactory.templateResource.get({templateId: routeParams.id} , function(data) {
	            scope.templatedf = data.templateDatas[0];
	            console.log(scope.templatedf);
	            
	        });
	        
		} 
	});
  mifosX.ng.application.controller('ViewTemplateDefController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$uibModal',
    mifosX.controllers.ViewTemplateDefController]).run(function($log) {
    $log.info("ViewTemplateDefController initialized");
  });
}(mifosX.controllers || {}));