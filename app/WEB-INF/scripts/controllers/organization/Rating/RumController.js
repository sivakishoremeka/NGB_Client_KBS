(function(module) {
	mifosX.controllers = _.extend(module, {
		RumController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.formData = {};
			scope.reset123=function(){
	    		location.path('/rating');
	        };
	        scope.rum=[];
	        scope.FieldNamesDatas=[];
	        
	    resourceFactory.rumTemplateResource.get(function(data) {
	    	
			 scope.rum=data;
			 console.log(scope.rum);
		 });
	        
	    resourceFactory.usageMetricTemplateResource
		.get(function(data) {
			scope.FieldNamesDatas = data.FieldNamesDatas;
		});
	        scope.submit = function() {   
	        	scope.formData.locale = "en";
	            resourceFactory.ratableusagemetricResource.save(scope.formData,function(data){
	            	location.path('/rating');
	        		
	          });
	        };
	
		
		}
	});
	mifosX.ng.application.controller('RumController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.RumController ]).run(
		function($log) {
			$log.info("RumController initialized");
		});
}(mifosX.controllers || {}));