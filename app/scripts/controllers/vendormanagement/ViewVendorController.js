(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewVendorController: function(scope, routeParams , resourceFactory ,location,$uibModal,PermissionService,API_VERSION,$rootScope,route) {
        scope.vendorData = [];
        scope.PermissionService = PermissionService;
        scope.vendorRouteParamId = routeParams.id;
        
        resourceFactory.VendorLemplateResource.getTemplateDetails({vendorId: routeParams.id} , function(data) {
        	scope.vendorData = data;
        });
        
        resourceFactory.VendorAgreementDataResource.get({vendorId: routeParams.id} , function(data) {
        	scope.agreements = data;
        	for(var i=0; i<data.length; i++){
        		if(data[i].agreementStatus == "Signed"){
        			scope.idActiveAgreement = "Active";
        		}
        	}
        });
        
        scope.routeTo = function(vendorId,agreementId){
            location.path('/viewvendoragreement/'+ vendorId+'/'+agreementId);
        };
        
        /**
       	 * Delete Vendor
       	 * */
         scope.deleteVendor = function (id){
         	scope.vendorId=id;
         	$uibModal.open({
  	                templateUrl: 'deletePopupForVendor.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
         
         
         scope.downloadFile = function (id){ 
        	 window.open($rootScope.hostUrl+ API_VERSION +'/vendoragreement/download/'+id+'?tenantIdentifier=default');
      };
          
      	function  approve($scope, $uibModalInstance) {
      		$scope.approve = function () {
              	resourceFactory.VendorLemplateResource.remove({vendorId: scope.vendorId} , {} , function(data) {
              		location.path('/vendormanagement');
              	});
              	$uibModalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
            };
        }
        
    }
  });
  mifosX.ng.application.controller('ViewVendorController', ['$scope', '$routeParams','ResourceFactory', '$location','$uibModal','PermissionService','API_VERSION','$rootScope','$route',mifosX.controllers.ViewVendorController]).run(function($log) {
    $log.info("ViewVendorController initialized");
  });
}(mifosX.controllers || {}));
