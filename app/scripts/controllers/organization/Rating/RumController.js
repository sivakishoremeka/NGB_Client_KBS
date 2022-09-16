(function(module) {
	mifosX.controllers = _.extend(module, {
		RumController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.formData = {};
			scope.reset123=function(){
	    		location.path('/rating');
	        };
	        scope.FieldNamesDatas=[];
	        scope.templateData=[];
	        scope.chargeCodeData=[];
	        scope.expression=null;
	        
	   scope.fieldData = function(tempalteId){    
	    resourceFactory.rumTemplateResource.get({tempalteId:tempalteId},function(data) {
	    	
			 scope.FieldNamesDatas=data;
		 
	    });
	   } 
	   
	    resourceFactory.usageMetricTemplateResource.get(function(data) {
	    	
			scope.templateData = data.templateData;
			scope.chargeCodeData = data.chargeCodeData;
		
	    });
	    
	    scope.fieldChange = function(fieldName){
	    	
	    	console.log("fieldName");
	    	console.log(fieldName);
	    	if(scope.expression !=null){
	    		scope.expression = scope.expression+fieldName;
	    	}else {
	    		scope.expression = fieldName;
	    	}
	    	
	    	scope.formData.rumExpression = scope.expression;
	     }
	    
	    
	    scope.rumChange = function(rumexrpression){
	    	console.log("rumexrpression");
	    	console.log(rumexrpression);
	    	scope.expression = rumexrpression;
	    	
	    }
	    
	        scope.submit = function() {   
	        	console.log(scope.formData);
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