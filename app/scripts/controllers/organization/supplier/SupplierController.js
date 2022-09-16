(function(module) {
	mifosX.controllers = _.extend(module, {
		SupplierController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.supplier = [];
			scope.pageItems = [];
			
			scope.supplierFetchFunction = function(offset, limit, callback) {
				resourceFactory.supplierResource.getAlldetails({offset: offset, limit: limit} , callback);
			};
			
		    scope.supplier = paginatorService.paginate(scope.supplierFetchFunction, 14);          
	       
		    scope.editSupplier= function(id){
		      	  scope.errorStatus=[];
		      	  scope.errorDetails=[];
		      	  scope.supplierId=id;
		        	  $uibModal.open({
		                templateUrl: 'editsuppliers.html',
		                controller:editSupplierController ,
		                resolve:{}
		            });
		    };
		    
		    var editSupplierController=function($scope,$uibModalInstance){
	        	$scope.formData = {}; 
	            $scope.statusData=[];
	            resourceFactory.supplierResource.get({'id': scope.supplierId},function(data) {
	                $scope.formData= data[0];
	            });
	         	$scope.accept = function(){
	         		$scope.flag=true;
	         		delete $scope.formData.id;
	         		resourceFactory.supplierResource.update({'id': scope.supplierId},$scope.formData,function(data){ 
	                  route.reload();
	                  location.path('/supplier');
	                  $uibModalInstance.close('delete');
	                 },function(errData){
	                	 $scope.flag = false;
	                 });
	         	};  
	    		$scope.reject = function(){
	    			$uibModalInstance.dismiss('cancel');
	    		};
	        };
	        
	
			
		}
	});
	mifosX.ng.application.controller('SupplierController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.SupplierController ]).run(
		function($log) {
			$log.info("SupplierController initialized");
		});
}(mifosX.controllers || {}));