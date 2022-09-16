(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateTicketMappingController: function(scope,webStorage, routeParams, location,$uibModal, resourceFactory,$rootScope) {
			
			scope.formData = {};
			scope.AppUserDatas =[];
			scope.availableUsers = [];
		    scope.selectedUsers = [];
			scope.allowed = [];
		    scope.restricted = [];
			scope.TicketTeamMappingDatas = [];
			scope.formData.userId = [];
			
			resourceFactory.ticketMappingTemplateResource.get(function(data) {
				  scope.TicketTeamMappingDatas = data.TicketTeamMappingData;
				  scope.availableUsers = data.availableUsers;
				  scope.allowedUsers = data.availableUsers;
				  scope.AppUserDatas = angular.copy(data.AppUserData);
			});
			
			
			scope.restrict = function(){
	            for(var i in this.allowed)
	            {
	                for(var j in scope.availableUsers){
	                    if(scope.availableUsers[j].id == this.allowed[i])
	                    {
	                        var temp = {};
	                        temp.id = this.allowed[i];
	                        temp.name = scope.availableUsers[j].username;
	                        scope.selectedUsers.push(temp);
	                        scope.allowedUsers.splice(j,1);
	                    }
	                }
	            }
	        };
	        
	        scope.allow = function(){
	            for(var i in this.restricted)
	            {
	                for(var j in scope.selectedUsers){
	                    if(scope.selectedUsers[j].id == this.restricted[i])
	                    {
	                        var temp = {};
	                        temp.id = this.restricted[i];
	                        temp.username = scope.selectedUsers[j].name;
	                        scope.availableUsers.push(temp);
	                        scope.selectedUsers.splice(j,1);
	                    }
	                }
	            }
	        };
			
			scope.reset123=function(){
	    		location.path('/ticketteamusers');
	        	webStorage.add("callingTab", {someString: "tickes" });
	        };
	        
	        scope.submit = function() {
	        	
	        	scope.formData.userId = [];
	        	scope.formData.locale = "en";
	        	var temp = [];
	             for(var i in scope.selectedUsers){
	                 temp[i] = scope.selectedUsers[i].id;
	             }
	             scope.formData.userId = temp;
	             //delete scope.formData.userDetails;
	             
	            resourceFactory.ticketMappingResource.save(scope.formData,function(data){
	            	location.path('/ticketteamusers');
	        		webStorage.add("callingTab", {someString: "tikets" });
	          });
	        };
	
			
		

			 /*scope.formData = {};
			 scope.planDatas = [];
			 scope.availablePlans = [];
		     scope.selectedPlans = [];
			 scope.allowed = [];
		     scope.restricted = [];
		     scope.formData.planDetails = [];
		     scope.TicketTeamMappingDatas = [];
			 
			 resourceFactory.ticketMappingTemplateResource.get(function(data) {
				  scope.availablePlans = data.AppUserData;
				  scope.allowedPlans = data.AppUserData;
				  scope.TicketTeamMappingDatas = data.TicketTeamMappingData;
			 });
			 
			 scope.restrict = function(){
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availablePlans){
		                    if(scope.availablePlans[j].id == this.allowed[i])
		                    {
		                        var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.name = scope.availablePlans[j].username;
		                        scope.selectedPlans.push(temp);
		                        scope.allowedPlans.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedPlans){
		                    if(scope.selectedPlans[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.username = scope.selectedPlans[j].name;
		                    
		                        scope.availablePlans.push(temp);
		                        scope.selectedPlans.splice(j,1);
		                    }
		                }
		            }
		        };
			 
			 scope.reset123=function(){
		    		location.path('/catalogemapping');
		        };
		        
		        scope.submit = function() {  
		        	scope.formData.planDetails = [];
		        	//console.log(scope.selectedPlans);
		        	scope.formData.locale = "en";
		             for(var i in scope.selectedPlans){
		                 scope.formData.planDetails.push(scope.selectedPlans[i]);
		             }
		        	//scope.formData.planDetails = scope.selectedPlans;
		            resourceFactory.salescatalogeResource.save(scope.formData,function(data){
		            	location.path('/salescataloges');
		            });
		        	var temp = [];
		             for(var i in scope.selectedPlans){
		                 temp[i] = scope.selectedPlans[i].id;
		             }
		             scope.formData.planDetails = temp;
		             resourceFactory.ticketMappingResource.save(this.formData,function(data){
		             		location.path('/catalogemapping');
		              });
		         
		        };*/
		 
		
		
		
		
		
		}
		       
	});
	mifosX.ng.application.controller('CreateTicketMappingController', [
	    '$scope',
	    'webStorage', 
	    '$routeParams', 
	    '$location',
	    '$uibModal', 
	    'ResourceFactory',
	    '$rootScope',
    mifosX.controllers.CreateTicketMappingController]).run(function($log) {
	    	$log.info("CreateTicketMappingController initialized");
	});
}(mifosX.controllers || {}));