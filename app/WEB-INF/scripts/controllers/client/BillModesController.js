(function (module) {
    mifosX.controllers = _.extend(module, {
    	BillModesController: function (scope, resourceFactory, location,localStorageService,routeParams,webStorage,paginatorService,route) {
    		scope.bill=[];
    		 resourceFactory.clientBillsResource.get({clientId: routeParams.clientId} ,function(data){
    			 scope.bill = data;
    		});	
    		 
    		 scope.editBill= function(){
    	        	var clientId = routeParams.clientId;
    	        	location.path("/addbillmodes/"+clientId);        	
    	        };
    		       
    		    		
        }

    });
    mifosX.ng.application.controller('BillModesController', ['$scope', 'ResourceFactory', '$location','localStorageService','$routeParams','webStorage','PaginatorService','$route', mifosX.controllers.BillModesController]).run(function ($log) {
        $log.info("BillModesController initialized");
    });
}(mifosX.controllers || {}));

       

       