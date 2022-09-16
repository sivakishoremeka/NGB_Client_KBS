(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewTicketTeamController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal){
			scope.ticketteam = [];
	        //scope.PermissionService = PermissionService;
	        
	        /*scope.gobroadcasterchannelmapping = function(){
	        	webStorage.add("callingTab", {someString: "broadcaster"});
	        };*/
	        resourceFactory.ticketTeamResource.get({ticketteamId: routeParams.id} , function(data) {
	            scope.ticketteam = data;   
	        });
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
	            resourceFactory.ticketTeamResource.remove({ticketteamId: routeParams.id} , {} , function() {
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
  mifosX.ng.application.controller('ViewTicketTeamController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$uibModal',
    mifosX.controllers.ViewTicketTeamController]).run(function($log) {
    $log.info("ViewTicketTeamController initialized");
  });
}(mifosX.controllers || {}));