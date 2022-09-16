(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateTicketTeamController: function(scope,webStorage, location, resourceFactory) {
			
			scope.formData = {};
            scope.AppUserDatas =[];
            scope.statuses = ["ACTIVE","INACTIVE"];
			
			resourceFactory.ticketTeamResourceTemplateResource.get(function(data) {
				  scope.AppUserDatas = angular.copy(data.AppUserData);
				  
			});
			scope.reset123=function(){
	    		location.path('/ticketteamusers');
	        	webStorage.add("callingTab", {someString: "tickets" });
	        };
	        
	        scope.submit = function() {   
	        	scope.formData.locale = "en";
	            resourceFactory.ticketTeamResource.save(scope.formData,function(data){
	            	location.path('/ticketteamusers');
	        		webStorage.add("callingTab", {someString: "tickets" });
	          });
	        };
	        
	        
	        
	        
			
			
		}
		       
	});
	mifosX.ng.application.controller('CreateTicketTeamController', [
	    '$scope',
	    'webStorage', 
	    '$location',
	    'ResourceFactory',
    mifosX.controllers.CreateTicketTeamController]).run(function($log) {
	    	$log.info("CreateTicketTeamController initialized");
	});
}(mifosX.controllers || {}));