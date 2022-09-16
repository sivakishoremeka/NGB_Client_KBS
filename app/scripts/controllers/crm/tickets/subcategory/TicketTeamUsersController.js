(function(module) {
  mifosX.controllers = _.extend(module, {
	  TicketTeamUsersController: function(scope, resourceFactory,location,$uibModal,route,paginatorService,webStorage) {
		
		    scope.ticketteams = [];
			scope.pageItems = [];
			scope.ticketMappings = [];
		  
		 /* var callingTab = webStorage.get('callingTab',null);
	        if(callingTab === null){
	        	callingTab="";
	        }else{
		  		  scope.displayTab=callingTab.someString;
			 		 
				  if(scope.displayTab == "broadcaster"){
					  scope.broadcasterTab =  true;
					  webStorage.remove('callingTab');
				  }else if(scope.displayTab == "channel"){ 
					  scope.channelTab =  true;
					  webStorage.remove('callingTab');
				  }else if(scope.displayTab == "channelmapping"){
					  scope.channelmappingTab =  true;
					  webStorage.remove('callingTab');
				  }else{
					  webStorage.remove('callingTab');
			       }
	        }*/
			
			scope.routeToticketteam = function(clientId){
		        location.path('/viewticketteam/'+ clientId);
			};   
	          
			scope.routeToTicketMapping = function(id){
	          location.path('/viewticketmapping/'+ id);
		 	};
	        
			scope.ticketteamFetchFunction = function(offset, limit, callback) {
				  resourceFactory.ticketTeamResource.get({offset: offset, limit: limit}, function(data) {
					  	scope.totalpropeties = data.totalFilteredRecords;
			        	scope.allDatas = data.pageItems;
			        	if(scope.totalpropeties%15 == 0)	
			        		scope.totalPages = scope.totalpropeties/15;
			        	else
			        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
			        	callback(data);
			        });
			  };
			  
			  scope.ticketTeam = function () {
				  scope.ticketteams = paginatorService.paginate(scope.ticketteamFetchFunction, 14);
		    		
		      };
		      
		      scope.ticketmappingFetchFunction = function(offset, limit, callback) {
				  resourceFactory.ticketMappingResource.get({offset: offset, limit: limit}, function(data) {
					  	scope.totalpropeties = data.totalFilteredRecords;
			        	scope.allDatas = data.pageItems;
			        	if(scope.totalpropeties%15 == 0)	
			        		scope.totalPages = scope.totalpropeties/15;
			        	else
			        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
			        	callback(data);
			        });
			  };
			  
			  scope.ticketMapping = function () {
				  scope.ticketMappings = paginatorService.paginate(scope.ticketmappingFetchFunction, 14);
		    		
		    	};
		    	
		    	
			 
			
		    	scope.deleteTicketteam = function(id){
					  console.log("hi");
					  scope.ticketteamId=id;
			         	 $uibModal.open({
			 	                templateUrl: 'ticketteam.html',
			 	                controller: ticketteamDelete,
			 	                resolve:{}
			 	        });
			  };
			  function  ticketteamDelete($scope, $uibModalInstance) {
		     		$scope.approve = function () {
		            resourceFactory.ticketTeamResource.remove({ticketteamId: scope.ticketteamId} , {} , function() {
		            	route.reload();
		              location.path('/ticketteamusers');
		             });
		            	$uibModalInstance.dismiss('delete');
		          };
		             $scope.cancel = function () {
		            	 $uibModalInstance.dismiss('cancel');
		           };
		      }
			  
			scope.deleteticketmapping = function(id){
				console.log("hi");
				scope.ticketmappingId = id;
				$uibModal.open({
					templateUrl: 'ticketmapping.html',
					controller: ticketmappingDelete,
					resolve:{}
				});
			}

		  function ticketmappingDelete($scope,$uibModalInstance){
				$scope.approve = function () {
					resourceFactory.ticketMappingResource.remove({ticketmappingId: scope.ticketmappingId}, {} ,function (){
						route.reload();
						location.path('/ticketteamusers');
						
					});
					$uibModalInstance.dismiss('delete');
				};
				$scope.cancel = function (){
					$uibModalInstance.dismiss('cancel');
				};
			}
		  
		 
		 
	  }
  });
  mifosX.ng.application.controller('TicketTeamUsersController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route',
     'PaginatorService',
     'webStorage',
     mifosX.controllers.TicketTeamUsersController]).run(function($log) {
    $log.info("TicketTeamUsersController initialized");
  });
}(mifosX.controllers || {}));
