(function(module) {
	 mifosX.controllers = _.extend(module, {
		 CreateSubcategoryController: function(scope, resourceFactory, location) {
			
			 scope.formData = {};
		     scope.problemsDatas = {};

			 
		     resourceFactory.ticketResourceTemplate.get(function(data) {
		    	 
		    	 scope.problemsDatas = data.problemsDatas;
		        
		     	});
		     
		     
		        scope.submit = function() {
		        scope.formData.locale = scope.optlang.code;
		        console.log(scope.formData);	
		             
		             resourceFactory.subcategoryResource.save(scope.formData,function(data){
		             		location.path('/subcategories');
		             });
		             
		        };
		   }
	 });
	 
mifosX.ng.application.controller('CreateSubcategoryController', [
	     '$scope', 
	     'ResourceFactory', 
	     '$location',
	      
mifosX.controllers.CreateSubcategoryController]).run(function($log) {
$log.info("CreateSubcategoryController initialized");
});
}(mifosX.controllers || {}));
