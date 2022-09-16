(function(module) {
	mifosX.controllers = _.extend(module, {
		EditUomController : function(scope, resourceFactory, location, route, routeParams) {
			
			scope.formData = {};
			scope.uomId=routeParams.id;
			
			resourceFactory.unitofmeasurementResource.get({uomId: routeParams.id, template: 'true'} , function(data) {
				
				scope.formData = {
						Name:data.Name,
						Description:data.Description,
		             };
				});
				scope.submit = function() {   
		            resourceFactory.unitofmeasurementResource.update({'uomId': scope.uomId}, scope.formData,function(data){
		            	location.path('/viewuom/' + data.resourceId);
		          });
		        };		
		}
	});
	mifosX.ng.application.controller('EditUomController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$route', 
	'$routeParams', 
	mifosX.controllers.EditUomController ]).run(
		function($log) {
			$log.info("EditUomController initialized");
		});
}(mifosX.controllers || {}));