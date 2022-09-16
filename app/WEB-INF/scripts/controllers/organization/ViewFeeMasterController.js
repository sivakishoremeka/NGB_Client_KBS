(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewFeeMasterController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal) {
        scope.PermissionService = PermissionService;
        
        scope.feeMasterData = [],scope.regionDatas = [],scope.feeMasterRegionPricesDatas = [],scope.availbleRegions = [];
        resourceFactory.feeMasterResource.get({id: routeParams.id} , function(data) {
            scope.feeMasterData = data.feeMasterData;
            scope.regionDatas = data.regionDatas;
            scope.feeMasterRegionPricesDatas = data.feeMasterRegionPricesDatas;
            
            for(var i in scope.feeMasterRegionPricesDatas){
            	for(var j in  scope.regionDatas){
            		if(scope.regionDatas[j].id == scope.feeMasterRegionPricesDatas[i].regionId){
            			scope.availbleRegions.push({
            										"amount" : scope.feeMasterRegionPricesDatas[i].amount,
            										"regionName" : scope.regionDatas[j].regionName,
            			});
            			break;
            		}
            	}
            }
           
        });

        scope.deleteFeeMaster = function (){
        	$uibModal.open({
	                templateUrl: 'approve.html',
	                controller: approveCtrl,
	                resolve:{}
	            });
        };
        
    	function  approveCtrl($scope, $uibModalInstance) {
    		$scope.approve = function () {
            	resourceFactory.feeMasterResource.remove({id: routeParams.id} , {} , function() {
            		$uibModalInstance.dismiss('delete');
                  location.path('/feemaster');
            });
         };
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
          };
        }
    }
  });
  mifosX.ng.application.controller('ViewFeeMasterController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$uibModal',
    mifosX.controllers.ViewFeeMasterController]).run(function($log) {
    $log.info("ViewFeeMasterController initialized");
  });
}(mifosX.controllers || {}));
