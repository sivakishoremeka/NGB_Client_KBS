(function(module) {
	mifosX.controllers = _.extend(module, {
		StockTransferController : function(scope, resourceFactory, location, $uibModal, route,paginatorService,webStorage) {
			
			scope.mrn = [];
			scope.pageItems = [];
			
			scope.routeTomrn = function(id){
	       	 	id=id.replace(/[{()}]/g,'');
	       	 	scope.val = id.split(" ");
	       	 	if(angular.uppercase(scope.val[0]) == 'MRN'){
	       	 		location.path('/viewmrn/'+ scope.val[1]+'/mrn');
	       	 	}else if(angular.uppercase(scope.val[0]) == 'GRV'){
	       	 		
	       	 		location.path('/viewmrn/'+ scope.val[1]+'/grv');
	       	 	}else{
	       	 		location.path('/viewmrn/'+ scope.val[2]+'/sales');
	       	 	}
	        };
			
			scope.mrnDetailsFetchFunction = function(offset, limit, callback) {
				resourceFactory.viewMrnResource.getAlldetails({offset: offset, limit: limit} , callback);
			};
			
			
	         scope.mrn = paginatorService.paginate(scope.mrnDetailsFetchFunction, 15);
	       
			
			scope.routeToitem = function(id,totalItem){
	            location.path('/viewitem/'+ parseInt(id)+'/item/'+totalItem);
	        };
	        /*scope.mrn = function(){
				 scope.mrn = paginatorService.paginate(scope.mrnDetailsFetchFunction, 14);
			 };*/
	        
	        scope.storeTransferData=function(transferData){
				  console.log(JSON.stringify(transferData));
				  webStorage.add("transferData", transferData);
		      	  location.path('/movemrn');
		   }
			
		}
	});
	mifosX.ng.application.controller('StockTransferController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	'webStorage',
	mifosX.controllers.StockTransferController ]).run(
		function($log) {
			$log.info("StockTransferController initialized");
		});
}(mifosX.controllers || {}));