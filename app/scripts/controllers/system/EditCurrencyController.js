(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditCurrencyController: function(scope, routeParams, resourceFactory, location) {

		  scope.formData = {};
		  scope.currencyId=routeParams.id;
	  
		  resourceFactory.currencyConfigResource.get({currencyId: routeParams.id, template: 'true'} , function(data) {
				
			  scope.selectAction(data);
			 
				/*scope.formData = {
						  code:data.code,
						  nameCode:data.nameCode,
						  decimalPlaces:data.decimalPlaces,
						  countryCode:data.countryCode,
						  name:data.name,
						  countryName:data.countryName,
		            	  displaySymbol:data.displaySymbol,
		        		  
		             };*/
				});
		  
		  
		  
		  scope.selectAction = function(data) {
			  console.log("hi");
		    	if(data.type== 'Currency'){
	    			 scope.formData = {
		    		            "code":data.code,
		    		            "decimalPlaces":data.decimalPlaces,
		    		            "countryCode":data.countryCode,
		    		            "nameCode":data.nameCode,
		    		            "name":data.name,
		    		            "countryName":data.countryName,
		    		            "displaySymbol":data.displaySymbol,
		    		            "type":data.type,
		    		            "locale":"en",
	    			 }
	    			console.log(scope.formData) 
	    			 
		    	} 
		    	else if(data.type == 'Non-Currency')
		    		scope.formData = {
		    			"code":data.code,
    		            "nameCode":data.nameCode,
    		            "decimalPlaces":data.decimalPlaces,
    		            "countryCode":data.countryCode,
    		            "type":data.type, 
    		            "name":data.name,
    		            "locale":"en",
  		                
			 }
		    	
	           
	        };
		  
		  scope.submit = function() {   
	            resourceFactory.updateCurrencysResource.update({'currencyId': scope.currencyId}, scope.formData,function(data){
	            	location.path('/currencyconfig/');
	          });
	        };	
	  
	  }
  });
  mifosX.ng.application.controller('EditCurrencyController', [
	  '$scope', 
	  '$routeParams', 
	  'ResourceFactory', 
	  '$location',
    mifosX.controllers.EditCurrencyController]).run(function($log) {
    $log.info("EditCurrencyController initialized");
  });
}(mifosX.controllers || {}));