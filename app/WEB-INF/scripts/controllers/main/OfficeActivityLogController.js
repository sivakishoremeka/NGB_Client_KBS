(function (module) {
    mifosX.controllers = _.extend(module, {
        OfficeActivityLogController: function (scope, localStorageService, resourceFactory,dateFilter,paginatorService,routeParams,$uibModal,webStorage,location) {
        	scope.clientId = routeParams.id;
        	scope.todayDate = new Date();
            var numberOfDaysToSubtract = 7;
            scope.fromDate = scope.todayDate.setDate(scope.todayDate.getDate() - numberOfDaysToSubtract);
			//scope.fromDate = new Date();
			scope.toDate = "";
			scope.toDate = new Date();
			scope.validTo = new Date();
			scope.userId =  webStorage.get("id");
			
			scope.getTransactionHistory = function() {
				scope.fromDate = angular.copy(dateFilter(scope.fromDate,'yyyy-MM-dd'));
				scope.toDate = angular.copy(dateFilter(scope.toDate,'yyyy-MM-dd'));
				scope.transactionhistory = paginatorService.paginate(scope.getTransHistory,14);
				scope.activitylogC = "active";
				scope.oldActivitylogC = "";
				//scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFunction,14);
			};
			scope.getTransactionHistoryFetchFunction = function(offset, limit, callback) {
				resourceFactory.transactionHistoryOfficeResource.getTransactionHistory({offset : offset,limit : limit}, callback);
			};
			scope.getOldTransactionHistory = function() {
				scope.activitylogC = "";
				scope.oldActivitylogC = "active";
				scope.transactionhistoryOld = paginatorService.paginate(scope.getOldTransactionHistoryFetchFunction,14);
			};
			scope.getOldTransactionHistoryFetchFunction = function(offset, limit, callback) {
				resourceFactory.transactionOldHistoryResource.getTransactionHistory({resourceId : scope.userId,offset : offset,limit : limit}, callback);
			};
			scope.searchTransactionHistory = function(filterText) {
				scope.transactionhistory = paginatorService.paginate(scope.searchTransactionHistory123,14);
			};
			scope.searchTransactionHistory123 = function(offset, limit, callback) {
				console.log(scope.userId);
				resourceFactory.transactionHistoryOfficeResource.getTransactionHistory({offset : offset,limit : limit,
					sqlSearch : scope.filterText}, callback);
			};
			
			/*scope.getTransactionHistoryFetchFunction = function(fromdate, toDate, callback) {
				resourceFactory.transactionHistoryResource.getTransactionHistory({clientId : routeParams.id,fromDate:fromdate,toDate:toDate}, callback);
			};
			
			scope.getTrans = function() {
				scope.activitylogC = "active";
				scope.oldActivitylogC = "";
				scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFun,14);
				
			
			};*/
			
		
			scope.getTransHistory=function(offset, limit, callback){
				resourceFactory.transactionHistoryOfficeResource.getTransactionHistory({offset : offset,limit : limit, fromDate : scope.fromDate, toDate :scope.toDate}, callback);

			};
			
			scope.getOldTransactionHistoryFetchFunction = function(offset, limit, callback) {
				resourceFactory.transactionHistoryOfficeResource.getTransactionHistory({offset : offset,limit : limit,fromDate:scope.fromDate,toDate:scope.toDate}, callback);
			};
			
			scope.getTrans=function(fromDate,toDate){
				scope.fromDate = angular.copy(dateFilter(fromDate,'yyyy-MM-dd'));
				scope.toDate = angular.copy(dateFilter(toDate,'yyyy-MM-dd'));
				console.log(scope.fromDate);
				console.log(scope.toDate);
				scope.transactionhistory = paginatorService.paginate(scope.getTransHistory,14);
				
			};
			 scope.routeTo = function(officeId){
		            location.path('/viewoffice/'+ officeId);
		          };

        }
    });
    
    

    mifosX.ng.application.controller('OfficeActivityLogController', ['$scope',
                                                               'localStorageService',
                                                               'ResourceFactory',
                                                               'dateFilter',
                                                               'PaginatorService',
                                                               '$routeParams',
                                                               '$uibModal',
                                                               'webStorage',
                                                               '$location',
                                                              mifosX.controllers.OfficeActivityLogController]).run(function ($log) {
        $log.info("ViewClientController initialized");
    });
}(mifosX.controllers || {}));
    