(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateNetworkSystemController: function(scope, resourceFactory, location) {
			  
			  scope.statusDatas = [];
			  //scope.itemDatas = [];
		      // scope.planDatas = [];
			  scope.formData = {};  
			  
		     
			  
			  resourceFactory.networkelementtemplateResource.getTemplateData({} , function(data) {
		         
	         
	            scope.statuses= data.statusTypeEnumList;
	            console.log(scope.statuses);
	            
		     });
		     
		     /*scope.getBothItem = function(itemCode, itemDescription){
		        	return itemCode+"--"+itemDescription;
		        };
		        
	        scope.reset123 = function(){
	       	    webStorage.add("callingTab", {someString: "networkelement" });
	          };*/
	        scope.submit = function() {  
	        	
	            resourceFactory.networkelementResource.save(scope.formData, function(data){
	            		location.path('/mappingconfig');
	            	
	            });
	        };
			  
		}
  });
  mifosX.ng.application.controller('CreateNetworkSystemController', [
      '$scope',
      'ResourceFactory',
      '$location', 
  mifosX.controllers.CreateNetworkSystemController ]).run(function($log) {
       $log.info("CreateNetworkSystemController initialized");
  });
}(mifosX.controllers || {}));