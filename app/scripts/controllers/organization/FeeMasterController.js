(function(module) {
  mifosX.controllers = _.extend(module, {
	  FeeMasterController: function(scope,webStorage, resourceFactory, location,$rootScope,PermissionService,$uibModal,route) {
		  
		  scope.PermissionService = PermissionService;
		  scope.feeMasterDatas = [];
		  resourceFactory.feeMasterResource.query(function(data){
			  scope.feeMasterDatas = data;
		  });
		  
		  scope.routeTo = function(id){
			  location.path('/viewfeemaster/'+id);
		  };
		  
		  scope.deleteFeeMaster = function (id){
			  $uibModal.open({
		                templateUrl: 'approve.html',
		                controller: approveCtrl,
		                resolve: {
		                    id: function () {
		                      return id;
		                    }
		                  }
		            });
	        };
	        
	    	function  approveCtrl($scope, $uibModalInstance,id) {
	    		$scope.approve = function () {
	            	resourceFactory.feeMasterResource.remove({id: id} , {} , function() {
	            		$uibModalInstance.dismiss('delete');
	            	  route.reload();
	            });
	         };
	            $scope.cancel = function () {
	            	 $uibModalInstance.dismiss('cancel');
	          };
	        }
	  }
  });
  mifosX.ng.application.controller('FeeMasterController', ['$scope','webStorage', 'ResourceFactory', '$location','$rootScope','PermissionService','$uibModal','$route', mifosX.controllers.FeeMasterController]).run(function($log) {
    $log.info("FeeMasterController initialized");
  });
}(mifosX.controllers || {}));
