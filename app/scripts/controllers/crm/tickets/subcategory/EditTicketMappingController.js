(function(module) {
	mifosX.controllers = _.extend(module, {
		EditTicketMappingController: function(scope, routeParams, location, resourceFactory) {
			
			scope.formData = {};
			scope.ticketmappingId=routeParams.id;
			scope.availableUserss = [];
		    scope.selectedUserss = [];
			scope.allowed = [];
		    scope.restricted = [];
			scope.TicketTeamMappingDatas = [];
			 scope.formData.userId = [];
			
			
			
			 resourceFactory.ticketMappingResource.get({ticketmappingId: routeParams.id, template: 'true'} , function(data) {
				 
				  scope.TicketTeamMappingDatas = data.TicketTeamMappingData;
				  scope.appUserDatas = data.appUserDatas;
	    		  
	    		  scope.formData = {
	    				   teamId:data.teamId,
	            		  
	              };
	    		    scope.availableUserss = data.availableUsers;
		            scope.selectedUserss = data.selectedUsers;
	        });
			
			 
			 /*scope.restrict = function(){
		            for(var i in scope.allowed)
		            {
		                for(var j in scope.availableUserss){
		                    if(scope.availableUserss[j].id == scope.allowed[i])
		                    {
		                        scope.selectedUserss.push(scope.availableUserss[j]);
		                        scope.availableUserss.splice(j,1);
		                    }
		                }
		            }
		        };
		        scope.allow = function(){
		            for(var i in scope.restricted)
		            {
		                for(var j in scope.selectedUserss){
		                    if(scope.selectedUserss[j].id == scope.restricted[i])
		                    {
		                        scope.availableUserss.push(scope.selectedUserss[j]);
		                        scope.selectedUserss.splice(j,1);
		                    }
		                }
		            }
		        };*/
			 
		        
		        scope.restrict = function(){
		            for(var i in scope.allowed)
		            {
		                for(var j in scope.availableUserss){
		                    if(scope.availableUserss[j].id == scope.allowed[i])
		                    {
		                        scope.selectedUserss.push(scope.availableUserss[j]);
		                        scope.availableUserss.splice(j,1);
		                    }
		                }
		            }
		        };
		        scope.allow = function(){
		            for(var i in scope.restricted)
		            {
		                for(var j in scope.selectedUserss){
		                    if(scope.selectedUserss[j].id == scope.restricted[i])
		                    {
		                        scope.availableUserss.push(scope.selectedUserss[j]);
		                        scope.selectedUserss.splice(j,1);
		                    }
		                }
		            }
		        };
		        
			
				scope.submit = function() {
					
					console.log(scope.selectedUserss);
					scope.formData.userId = [];
		             for(var i in scope.selectedUserss){
		            	 scope.formData.userId[i] = scope.selectedUserss[i].userId;
		             }		             
		             scope.formData.locale = scope.optlang.code;
					
					
		            resourceFactory.ticketMappingResource.update({'ticketmappingId': scope.ticketmappingId}, scope.formData,function(data){
		            	location.path('/viewticketmapping/' + data.resourceId);
		          });
		        };		
		}
		       
	});
	mifosX.ng.application.controller('EditTicketMappingController', [
	    '$scope',
	    '$routeParams', 
	    '$location',
	    'ResourceFactory',
    mifosX.controllers.EditTicketMappingController]).run(function($log) {
	    	$log.info("EditTicketMappingController initialized");
	});
}(mifosX.controllers || {}));