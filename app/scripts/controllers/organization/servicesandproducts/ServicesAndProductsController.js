(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServicesAndProductsController: function(scope, resourceFactory,location,$uibModal,route,$rootScope,paginatorService) {
        
          scope.services = [];
          scope.products = [];
          scope.formData = {};
          
          scope.routeToService = function(id){
              location.path('/viewservices/'+ id);
           };
           
          scope.routeToProduct = function(id){
               location.path('/viewproducts/'+ id);
            };
            
            scope.onFilter = function(){
            	scope.formData.search = scope.filterText;
            	if(scope.type == 'S'){
            		scope.services = paginatorService.paginate(scope.serviceFetchFunction, 14);
            	} else if(scope.type == 'P'){
            		scope.products = paginatorService.paginate(scope.productFetchFunction, 14);
            	}
            };
          
          scope.serviceFetchFunction = function(offset, limit, callback) {
        	  resourceFactory.serviceResource.get({offset: offset, limit: limit,sqlSearch: scope.formData.search, serviceCategory: scope.serviceCategory} , callback);
        		  
  		  };
  		  
  		 scope.productFetchFunction = function(offset, limit, callback, productCategory) {
 	       	  resourceFactory.productResource.get({offset: offset, limit: limit,sqlSearch: scope.formData.search, productCategory: scope.productCategory} , callback);	  
 	 	 };
 	 	 
 	 	scope.servicesDetail = function(serviceCategory){
 	 		scope.serviceCategory = serviceCategory;
 	 		scope.type = serviceCategory;
  		  scope.services = paginatorService.paginate(scope.serviceFetchFunction, 14);
  		  //scope.products = paginatorService.paginate(scope.productFetchFunction, 19);
 	 	}
  		  
  		 scope.productsDetail = function(productCategory){
  			scope.productCategory = productCategory;
  			scope.type = productCategory;
  		    scope.products = paginatorService.paginate(scope.productFetchFunction, 14);
  	 	 }
  		 
  		 
  		  scope.deleteservice = function (serviceId){
	    	  scope.serviceId = serviceId;
	    	  $uibModal.open({
				 templateUrl: 'deleteservice.html',
				 controller: deleteServiceController,
				 resolve:{}
			 });
	       };
	       
	      function deleteServiceController($scope, $uibModalInstance) {
	   	  	
	     	  $scope.approveDeleteService = function () {
	     		  
	     		  resourceFactory.serviceResource.remove({serviceId: scope.serviceId} , {} , function() {
	     			 $uibModalInstance.close('delete');
        			  route.reload();
	             });
	           };
	           $scope.cancel = function () {
	        	   $uibModalInstance.dismiss('cancel');
	           };
	       };
	       
	       scope.deleteproduct = function (productId){
		    	  scope.productId = productId;
		    	  $uibModal.open({
					 templateUrl: 'deleteproduct.html',
					 controller: deleteProductController,
					 resolve:{}
				 });
		       };
		       
		      function deleteProductController($scope, $uibModalInstance) {
		   	  	
		     	  $scope.approveDeleteProduct = function () {
		     		  
		     		  resourceFactory.productResource.remove({productId: scope.productId} , {} , function() {
		     			 $uibModalInstance.close('delete');
	        			  route.reload();
		             });
		           };
		           $scope.cancel = function () {
		        	   $uibModalInstance.dismiss('cancel');
		           };
		       };
	            
     }
  });
  mifosX.ng.application.controller('ServicesAndProductsController', [
                                                          '$scope',
                                                          'ResourceFactory',
                                                          '$location',
                                                          '$uibModal',
                                                          '$route',
                                                          '$rootScope',
                                                          'PaginatorService',
                                                          mifosX.controllers.ServicesAndProductsController]).run(function($log) {
    $log.info("ServicesController initialized");
  });
}(mifosX.controllers || {}));
