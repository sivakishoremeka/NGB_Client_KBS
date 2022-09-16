(function(module) {
	mifosX.controllers = _.extend(module, {
		AssignedTicketController: function(scope,webStorage, routeParams, location,$uibModal, resourceFactory, paginatorService,PermissionService,$rootScope,dateFilter,route) {
			
			scope.openTickets = [];
			scope.todayDate = new Date();
			var numberOfDaysToSubtract = 7;
			scope.fromDate = scope.todayDate.setDate(scope.todayDate.getDate() - numberOfDaysToSubtract);
			scope.toDate = new Date();
			/*scope.validTo = new Date();*/
			scope.statusType = "";
			scope.statusDatas =[];
			scope.ticketteams = [];
			scope.pageItems = [];
			scope.ticketMappings = [];

			
			scope.routeToticket = function(id){
	        	if(PermissionService.showMenu('READ_CLIENT'))
	        		location.path('/viewclient/'+id);
	        	webStorage.add("callingTab", {someString: "Tickets" });
	        };
	        
	        scope.tabActive = function(){
	       	   webStorage.add("callingTab", {someString: "Tickets" });
	        };
	         
		        scope.openTicketFetchFunction = function(offset, limit, callback) {
		        	if($rootScope.hasPermission('LIST_TICKET')){
		        	resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit}, function(data) {
						  	scope.totalpropeties = data.totalFilteredRecords;
				        	scope.allDatas = data.pageItems;
				        	if(scope.totalpropeties%15 == 0)	
				        		scope.totalPages = scope.totalpropeties/15;
				        	else
				        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
				        	callback(data);
				        });
				  };
	          };
	          
	          resourceFactory.ticketResourceTemplate.get(function(data) {
	 	    	 scope.statusDatas = data.statusData;
	 	    	 
	 	    	for(var i=0;i<scope.statusDatas.length;i++){
	 	    		if(scope.statusDatas[i].mCodeValue=='OPEN'){
	              		scope.statusTypes=scope.statusDatas[i].mCodeValue;
	              	}
	            }
	 	         
	 	    });
	          
	     /*   scope.openTickets = paginatorService.paginate(scope.openTicketFetchFunction, 14);*/
	        
	        scope.getTicketHistory=function(offset, limit, callback){
	        	resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit, fromDate : scope.fromDate, toDate :scope.toDate, statusType :scope.statusType}, callback);

			};
	        
	        scope.getTrans=function(fromDate,toDate,statusTypes){
				
				scope.fromDate = angular.copy(dateFilter(fromDate,'yyyy-MM-dd'));
				scope.toDate = angular.copy(dateFilter(toDate,'yyyy-MM-dd'));
				scope.statusType = statusTypes;
				scope.openTickets = paginatorService.paginate(scope.getTicketHistory, 14);
				console.log(scope.openTickets);
				
			};
	        
	        /* if($rootScope.hasPermission('READ_TICKET')){
				   scope.getOpenTickets = function () {
				          	
				   		scope.openTickets = paginatorService.paginate(scope.openTicketFetchFunction, 14);
				   };
               };*/
	        
	        /*if($rootScope.hasPermission('READ_TICKET')){
		        scope.getclosedTickets = function () {
		            
		        	scope.openTickets = paginatorService.paginate(scope.closedTicketFetchFunction, 14);
		        };
	        };
	        
	        if($rootScope.hasPermission('READ_TICKET')){
		        scope.getWorkingTickets = function () {
		        	
		        	scope.openTickets = paginatorService.paginate(scope.workingTicketFetchFunction, 14);
		        };
	        };
	        
	        if($rootScope.hasPermission('READ_TICKET')){
		        scope.getOverDueTickets = function () {
		        	
		        	scope.openTickets = paginatorService.paginate(scope.overDueTicketFetchFunction, 14);
		        };
	        };
	        
	        if($rootScope.hasPermission('READ_TICKET')){
		        scope.getAssignedTickets = function () {
		        	
		        	scope.openTickets = paginatorService.paginate(scope.assignedTicketFetchFunction, 14);
		        };
	        };*/
	        
	        /*scope.openTicketFetchFunction = function(offset, limit, callback) {
	        	
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OPEN'} , callback);
			};*/
			
		    /*scope.closedTicketFetchFunction = function(offset, limit, callback) {
				
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'CLOSED'} , callback);
		   };
		   
		   scope.workingTicketFetchFunction = function(offset, limit, callback) {
				
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'WORKING'} , callback);
		   };
		   
		   scope.overDueTicketFetchFunction = function(offset, limit, callback) {
				
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OVERDUE'} , callback);
		   };
		   
		   scope.assignedTicketFetchFunction = function(offset, limit, callback) {
				
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'ASSIGNED'} , callback);
		   };
		   
		   scope.searchTickets = function(filterText) {
	  			scope.openTickets = paginatorService.paginate(scope.searchTickets123, 14);
	       };
	       
	       scope.searchTickets123 = function(offset, limit, callback) {
	    	  resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit , 
	    		 sqlSearch: scope.filterText } , callback); 
	      };*/    
			
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
		              location.path('/assignedtickets');
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
					templateUrl: 'deleteticketmapping.html',
					controller: ticketmappingDelete,
					resolve:{}
				});
			}
  
		  function ticketmappingDelete($scope,$uibModalInstance){
				$scope.approve = function () {
					resourceFactory.ticketMappingResource.remove({ticketmappingId: scope.ticketmappingId}, {} ,function (){
						route.reload();
						location.path('/assignedtickets');
						
					});
					$uibModalInstance.dismiss('delete');
				};
				$scope.cancel = function (){
					$uibModalInstance.dismiss('cancel');
				};
			}
			
			 scope.routeToticket = function(clientId){
		            location.path('/viewclient/id/'+ clientId);
		     };
		          
		     scope.routeToticketteam = function(clientId){
			        location.path('/viewticketteam/'+ clientId);
			 };   
		          
		     scope.routeToTicketMapping = function(id){
		          location.path('/viewticketmapping/'+ id);
			 };
		
	   }
		       
	});
	mifosX.ng.application.controller('AssignedTicketController', [
	    '$scope',
	    'webStorage', 
	    '$routeParams', 
	    '$location',
	    '$uibModal', 
	    'ResourceFactory',
	    'PaginatorService',
	    'PermissionService', 
	    '$rootScope',
	    'dateFilter',
	    '$route',
    mifosX.controllers.AssignedTicketController]).run(function($log) {
	    	$log.info("AssignedTicketController initialized");
	});
}(mifosX.controllers || {}));