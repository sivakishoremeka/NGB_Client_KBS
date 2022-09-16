(function(module) {
	mifosX.controllers = _.extend(module, {
		UomController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.formData = {};
			scope.reset123=function(){
	    		location.path('/rating');
	        };
	        
	        scope.submit = function() {   
	        	scope.formData.locale = "en";
	            resourceFactory.unitofmeasurementResource.save(scope.formData,function(data){
	            	location.path('/rating');
	        		
	          });
	        };
	
		
		}
	});
	mifosX.ng.application.controller('UomController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.UomController ]).run(
		function($log) {
			$log.info("UomController initialized");
		});
}(mifosX.controllers || {}));