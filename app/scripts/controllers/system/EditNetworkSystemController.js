(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditNetworkSystemController: function(scope, routeParams, resourceFactory, location) {
        scope.formData = {};
    	/*scope.allowedperiods={};*/
    	scope.networkelementId=routeParams.id;
    	
    	
    	 resourceFactory.networkelementtemplateResource.get(function(data) {
	         
	          /*  scope.systemcode = data.systemcode;
	            scope.sytemname = data.systemname;*/
	            scope.statuses= data.statusTypeEnumList;
	            console.log(scope.statuses);
	            
		     });

        resourceFactory.networkelementResource.get({networkelementId: scope.networkelementId, template: 'true'} , function(data) {
        	
            
              scope.formData = {
        		  systemcode:data.systemcode,
        		  systemname:data.systemname,
         		  status:data.status
             };
              
        });
        
        scope.submit = function() {
            resourceFactory.networkelementResource.update({'networkelementId': scope.networkelementId},this.formData,function(data){
             location.path('/viewnetworksystem/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('EditNetworkSystemController', [
  '$scope', 
  '$routeParams', 
  'ResourceFactory', 
  '$location', 
   mifosX.controllers.EditNetworkSystemController]).run(function($log) {$log.info("EditNetworkSystemController initialized");
  });
}(mifosX.controllers || {}));
