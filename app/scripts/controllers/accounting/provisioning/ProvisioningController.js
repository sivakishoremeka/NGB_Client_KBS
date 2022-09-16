(function (module) {
    mifosX.controllers = _.extend(module, {
    	ProvisioningController: function (scope, resourceFactory, location,localStorageService,routeParams,webStorage,paginatorService,route) {
    		scope.provisionings=[];
    		scope.pageItems = [];
    		
       	        scope.provisioningrequestfailure = function(offset, limit, callback) {
 				resourceFactory.provisioningrequestfailure.get({offset: offset, limit: limit} , callback);
 				 
 			    };
 			  
    	
    		 // scope.provisionings = paginatorService.paginate(scope.provisioningrequestfailure, 14);
            
            scope.getProvisionData = function(clientIdValue){
	            console.log("clientIdValue ="+clientIdValue);
	            resourceFactory.provisioningrequestfailure.get({clientId: clientIdValue} , function(data) {
		    		 scope.provisionings = data.pageItems;
		    		 
		    	 });
	    	 }
            
    		 scope.reProcess=function(processId){
                 resourceFactory.updateProvisioningMappingResource.update({'provisioningId':processId},{},function(data){
                     /*
                    * location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
                    * location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    * route.reload();
                    */
                	 route.reload();
                     });
               }
    		 
    		  scope.routeTo = function(client_id){
  	            location.path('/viewclient/id/'+ client_id);
  	          };
    		
        }

    });
    mifosX.ng.application.controller('ProvisioningController', ['$scope', 'ResourceFactory', '$location','localStorageService','$routeParams','webStorage','PaginatorService','$route', mifosX.controllers.ProvisioningController]).run(function ($log) {
        $log.info("ProvisioningController initialized");
    });
}(mifosX.controllers || {}));

       