(function(module) {
	mifosX.controllers = _.extend(module, {
		GrnDetailsController : function(scope, resourceFactory, location, $uibModal, route,paginatorService,webStorage,dateFilter) {
			
			scope.grn = [];
			scope.pageItems = [];
			
	        scope.grnDetailsFetchFunction = function(offset, limit, callback) {
				resourceFactory.grnResource.get({offset: offset, limit: limit} , callback);
			};
			 
			scope.grn = paginatorService.paginate(scope.grnDetailsFetchFunction, 14);
				
			scope.editGrnQuantity = function(grn){
	    	   $uibModal.open({
	                  templateUrl: 'EditGRNQuality.html',
	                  controller: EditGRNQualityController,
	                  resolve:{
	                	  grndata:function(){
	                		  return grn;
	                		 }
	    	   
	                  }
	              });
			};
			
			var EditGRNQualityController = function ($scope, $uibModalInstance,grndata) {
		    	   $scope.formData = {};
		    	   var purchaseDate = dateFilter(grndata.purchaseDate,'dd MMMM yyyy');
			       $scope.formData.purchaseDate = new Date(purchaseDate);
			       var reqDate = dateFilter($scope.formData.purchaseDate,'dd MMMM yyyy');
			       $scope.formData.purchaseDate = reqDate;
		    	   $scope.formData.orderdQuantity = grndata.orderdQuantity;
		    	   $scope.formData.locale = scope.optlang.code;
		    	   $scope.formData.dateFormat = 'dd MMMM yyyy';
		    	   $scope.formData.purchaseNo=grndata.purchaseNo;
		    	   $scope.formData.supplierId=grndata.supplierId;
		    	   $scope.formData.officeId=grndata.officeId;
		    	   $scope.formData.itemMasterId=grndata.itemMasterId;
		    	   $scope.approvQuantity = function(){
		    		   resourceFactory.grnResource.update({grnId:grndata.id},$scope.formData,function(data){
		    			   $uibModalInstance.close('delete');
		    			   location.path("/grndetails");
		             	});
		    	   }
		    	   $scope.cancelQuantity = function () {
		    		   $uibModalInstance.dismiss('cancel');
		    	   };
		       };
	       
			
	       scope.routeTogrn = function(id){
	            location.path('/viewgrn/'+ parseInt(id));
	            
	       };
			
		}
	});
	mifosX.ng.application.controller('GrnDetailsController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	'webStorage',
	'dateFilter',
	mifosX.controllers.GrnDetailsController ]).run(
		function($log) {
			$log.info("GrnDetailsController initialized");
		});
}(mifosX.controllers || {}));