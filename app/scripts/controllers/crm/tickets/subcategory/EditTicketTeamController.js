(function(module) {
	mifosX.controllers = _.extend(module, {
		EditTicketTeamController: function(scope, routeParams, resourceFactory, location) {
			
			scope.formData = {};
			scope.ticketteamId=routeParams.id;
			
			resourceFactory.ticketTeamResource.get({ticketteamId: routeParams.id, template: 'true'} , function(data) {
				
				scope.formData = {
						userId:data.userId,
						teamCode:data.teamCode,
						teamDescription:data.teamDescription,
						teamCategory:data.teamCategory,
						status:data.status,
						teamEmail:data.teamEmail,
		        		  
		             };
				});
				scope.submit = function() {   
		            resourceFactory.ticketTeamResource.update({'ticketteamId': scope.ticketteamId}, scope.formData,function(data){
		            	location.path('/viewticketteam/' + data.resourceId);
		          });
		        };		
		}
	});
	mifosX.ng.application.controller('EditTicketTeamController', [
	 '$scope', 
	 '$routeParams', 
	 'ResourceFactory', 
	 '$location', 
	mifosX.controllers.EditTicketTeamController]).run(function($log) {
	  $log.info("EditTicketTeamController initialized");
	});	
}(mifosX.controllers || {}));