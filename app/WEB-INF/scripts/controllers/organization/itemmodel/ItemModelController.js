(function(module) {
	mifosX.controllers = _.extend(module, {
		ItemModelController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.modelProvisionDatas = [];
			scope.pageItems = [];
			
			scope.modelProvisionFetchFunction = function(offset, limit, callback) {
				resourceFactory.modelProvisionMappingResource.get({ offset : offset, limit : limit }, function(data){
				scope.totalpropeties = data.totalFilteredRecords;
	        	scope.allDatas = data.pageItems;
	        	if(scope.totalpropeties%15 == 0)	
	        		scope.totalPages = scope.totalpropeties/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
	        	callback(data);
				});
		    };
			
		   scope.modelProvisionDatas = paginatorService.paginate( scope.modelProvisionFetchFunction, 14);
			
		   scope.deleteModelProvisionMapping = function(id){
			   scope.modelProvisionMappingId=id;
	          	 $uibModal.open({
	  	                templateUrl: 'deleteModelProvisionMapping.html',
	  	                controller: deleteModelProvisionMappingCtrl,
	  	                resolve:{}
	  	        });
		  };
		  
		  function  deleteModelProvisionMappingCtrl($scope, $uibModalInstance) {
	      		$scope.approve = function () {
	      			 resourceFactory.modelProvisionMappingResource.remove({modelProvisionMappingId: scope.modelProvisionMappingId} , {} , function() {
	      			    location.path('/inventory');
	      			    webStorage.add("callingTab", {someString: "modelProvisionTab" });
	      			    route.reload();
	            });
	              	 $uibModalInstance.dismiss('delete');
	           };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	           };
	       } 
		
		  
		}
	});
	mifosX.ng.application.controller('ItemModelController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.ItemModelController ]).run(
		function($log) {
			$log.info("ItemModelController initialized");
		});
}(mifosX.controllers || {}));