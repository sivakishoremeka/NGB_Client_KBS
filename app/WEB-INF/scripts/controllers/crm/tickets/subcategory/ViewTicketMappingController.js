(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewTicketMappingController: function(scope, routeParams , location, resourceFactory , PermissionService, $uibModal){
			
			scope.ticketMapping = [];
	        scope.PermissionService = PermissionService;
	        
	        
	        resourceFactory.ticketMappingResource.get({ticketmappingId: routeParams.id} , function(data) {
	        	scope.selectedUserss = data.selectedUsers;
	        	scope.teamId = data.teamId;
	        	 /*scope.ticketMapping = data;  */  
	        });
			
			
			scope.deleteTicketmapping = function(id){
				  scope.ticketmappingId=id;
		         	 $uibModal.open({
		 	                templateUrl: 'ticketmapping.html',
		 	                controller: ticketmappingDelete,
		 	                resolve:{}
		 	        });
		  };
		  function  ticketmappingDelete($scope, $uibModalInstance) {
	     		$scope.approve = function () {
	            resourceFactory.ticketMappingResource.remove({ticketmappingId: routeParams.id} , {} , function() {
	              location.path('/assignedtickets');
	             });
	            	$uibModalInstance.dismiss('delete');
	          };
	             $scope.cancel = function () {
	            	 $uibModalInstance.dismiss('cancel');
	           };
	       }	
			
			
		} 
	});
  mifosX.ng.application.controller('ViewTicketMappingController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$uibModal',
    mifosX.controllers.ViewTicketMappingController]).run(function($log) {
    $log.info("ViewTicketMappingController initialized");
  });
}(mifosX.controllers || {}));