(function(module) {
	 mifosX.controllers = _.extend(module, {
		 CreateModelProvisionmappingController: function(scope, resourceFactory, location,webStorage) {
			 
			 scope.formData={};
		     scope.provisionDatas = {};
		     //scope.itemModelDatas = {};
		     scope.itemTypes = ["SD","HD", "PVR"];
		     
		    resourceFactory.modelProvisionMappingTemplateResource.get(function(data) {
				  scope.provisionDatas = data.provisionDatas;
				  //scope.itemModelDatas = data.itemModelDatas;
			});
		     
		    scope.reset123 = function(){
		          	location.path('/itemmodel');
		  	};
		  	       
		  	scope.submit = function(){
		  		scope.formData.locale = scope.optlang.code;
		     		
	     		resourceFactory.modelProvisionMappingResource.save(scope.formData,function(data){
	     			location.path('/itemmodel');
	     		});	
		    };
			 
			 
		 }
	});
	mifosX.ng.application.controller('CreateModelProvisionmappingController', [
		  '$scope', 
		  'ResourceFactory', 
		  '$location',
		  'webStorage',
    mifosX.controllers.CreateModelProvisionmappingController]).run(function($log) {
		   $log.info("CreateModelProvisionmappingController initialized");
	});
}(mifosX.controllers || {}));