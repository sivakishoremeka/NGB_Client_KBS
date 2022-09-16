(function(module) {
	mifosX.controllers = _.extend(module, {
		EditRumController : function(scope, resourceFactory, location, route, routeParams) {
			
			scope.formData = {};
			scope.ratableId=routeParams.id;
			
			resourceFactory.ratableusagemetricResource.get({ratableId: routeParams.id, template: 'true'} , function(data) {
				
				scope.formData = {
						chargeCodeId:data.chargeCodeId,
						templateId:data.templateId,
						rumName:data.rumName,
						rumExpression:data.rumExpression,
		             };
				});
				scope.submit = function() {   
		            resourceFactory.ratableusagemetricResource.update({'ratableId': scope.ratableId}, scope.formData,function(data){
		            	location.path('/viewrum/' + data.resourceId);
		          });
		        };		
		}
	});
	mifosX.ng.application.controller('EditRumController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$route', 
	'$routeParams', 
	mifosX.controllers.EditRumController ]).run(
		function($log) {
			$log.info("EditRumController initialized");
		});
}(mifosX.controllers || {}));