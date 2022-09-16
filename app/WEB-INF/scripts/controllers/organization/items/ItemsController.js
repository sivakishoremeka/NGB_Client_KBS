(function(module) {
	mifosX.controllers = _.extend(module, {
		ItemsController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.items = [];
			scope.pageItems = [];
			
			scope.itemFetchFunction = function(offset, limit, callback) {
				resourceFactory.itemResource.get({offset: offset, limit: limit} , callback);
			};
			
			scope.items = paginatorService.paginate(scope.itemFetchFunction, 14);
			
			scope.routeToitem = function(id,totalItem){
	            location.path('/viewitem/'+ parseInt(id)+'/item/'+totalItem);
	        };
	        
	        scope.showAudit = function(id,itotalItems){
				location.path('/viewitem/'+id+'/audit/'+itotalItems);
			};
			
		}
	});
	mifosX.ng.application.controller('ItemsController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.ItemsController ]).run(
		function($log) {
			$log.info("ItemsController initialized");
		});
}(mifosX.controllers || {}));