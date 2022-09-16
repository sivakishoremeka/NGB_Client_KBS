(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateRateQtyTierController : function(scope, resourceFactory, location, $uibModal, route,paginatorService, routeParams) {
			
			scope.formData = {};
			scope.templateData = {};
			scope.range = [];
			scope.rate=[];
			
			resourceFactory.usageRateQuantityTierTemplateResource.get(function(data) {
				 scope.rate=data;
				 console.log(scope.rum);
			 });
			
			resourceFactory.timePeriodByTimeModelResource.get({timeModelId:routeParams.timeModelId},function(data) {
		    	 console.log(data);
		    	scope.timePeriodData=data;
				
			 
		    });
			
			scope.reset123=function(){
	    		location.path('/rating');
	        };
	        
	       /* scope.addCreateRateQtyTierData = function(){
		         if(scope.startRange && scope.endRange){
		         	scope.templateData.startRange = scope.startRange;
		         	scope.templateData.endRange = scope.endRange;
		         	scope.range.push(scope.templateData);
		        	 console.log(scope.range);
		        	 delete scope.templateData.startRange;
		        	 delete scope.templateData.endRange;
		         }
		         
		         scope.startRange = undefined;
		         scope.endRange = undefined;
		       };*/
	        
	        
	        
	        
	        scope.addCreateRateQtyTierData = function(){
		         if(scope.startRange && scope.endRange){
		        	   
		                scope.range.push({startRange:scope.startRange, 
		                	locale:scope.optlang.code,
		                	endRange:scope.endRange
		    });
		                
		                scope.startRange = undefined;
				        scope.endRange = undefined;
             
		         }
		       };
	        
	       
		       scope.getBothrate = function(planPriceId,rumName,timemodelName){
					return planPriceId+"--"+rumName+"--"+timemodelName;
		        };
		        
		        
		        scope.removeRange = function (index) {
		            scope.range.splice(index,1);
		        };
	        
	        
	        scope.submit = function() {   
	        	scope.formData.locale = "en";
	        	scope.formData.range =new Array();
            	 if (scope.range.length > 0) {	                     
                     for (var i in scope.range) {
	                   scope.formData.range.push({
	                	   startRange : scope.range[i].startRange,
	                	   endRange : scope.range[i].endRange,
									
						});
                     };
                   }
	            resourceFactory.usageRateQuantityTier.save(scope.formData,function(data){
	            	location.path('/rating');
	        		
	          });
	        };
	
		
		}
	});
	mifosX.ng.application.controller('CreateRateQtyTierController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	'$routeParams',
	mifosX.controllers.CreateRateQtyTierController ]).run(
		function($log) {
			$log.info("CreateRateQtyTierController initialized");
		});
}(mifosX.controllers || {}));