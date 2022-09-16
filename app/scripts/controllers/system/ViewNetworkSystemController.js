(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewNetworkSystemController: function(scope, routeParams , location,resourceFactory, $uibModal) {
        scope.networksystem = {};
        //scope.PermissionService = PermissionService;
        
        resourceFactory.networkelementResource.get({networkelementId: routeParams.id} , function(data) {
            scope.networksystem = data;
           
        });

        scope.deleteNetworkSystem = function (){
        	$uibModal.open({
	                templateUrl: 'networksystem.html',
	                controller: approve,
	                resolve:{}
	            });
        };
        
    	function  approve($scope, $uibModalInstance) {
    		$scope.approve = function () {
            	resourceFactory.networkelementResource.remove({networkelementId: routeParams.id} , {} , function() {
                  location.path('/mappingconfig');
            });
            	$uibModalInstance.dismiss('delete');
         };
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
          };
        }
    }
  });
  mifosX.ng.application.controller('ViewNetworkSystemController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    '$uibModal',
    mifosX.controllers.ViewNetworkSystemController]).run(function($log) {
    $log.info("ViewNetworkSystemController initialized");
  });
}(mifosX.controllers || {}));
