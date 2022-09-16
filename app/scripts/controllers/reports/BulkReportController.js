(function (module) {
	mifosX.controllers = _.extend(module, {
		BulkReportController: function (scope, routeParams, resourceFactory, location, route, dateFilter, $rootScope, API_VERSION) {
			
			scope.todayDate = new Date();
			var numberOfDaysToSubtract = 7;
			scope.startDate = scope.todayDate.setDate(scope.todayDate.getDate() - numberOfDaysToSubtract);
			scope.endDate = new Date();
			scope.viewName = routeParams.name;
			scope.bulkReports = [];
			
			 
			 scope.getBulkReportsByDate=function(startDate,endDate){
					scope.startDate = angular.copy(dateFilter(startDate,'yyyy-MM-dd'));
					scope.endDate = angular.copy(dateFilter(endDate,'yyyy-MM-dd'));
					
					resourceFactory.getBulkReportsByReportName.get({reportName : scope.viewName, startDate : scope.startDate, endDate :scope.endDate}, function(data) {
						console.log(data);
						scope.bulkReports = data;
	                
					});
					
				};
				
				/*if(scope.startDate != null && scope.endDate != null){
					scope.getBulkReportsByDate(scope.startDate,scope.endDate);
				}*/
				scope.getBulkReportsByDate(scope.startDate,scope.endDate);
				
				scope.downloadReport= function(bulkReport){
					/*resourceFactory.downloadBulkReport.get({'filePath' : reportPath}, function(data) {
						console.log(data);
	                
					});*/
					window.open($rootScope.hostUrl + API_VERSION+ '/bulkreport/download/'+bulkReport.id+'?tenantIdentifier='+ $rootScope.tenantIdentifier);
					
					
				}
		}
		
	});
mifosX.ng.application.controller('BulkReportController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$route', 'dateFilter', '$rootScope', 'API_VERSION', mifosX.controllers.BulkReportController]).run(function ($log) {
	 $log.info("BulkReportController initialized");
});
}(mifosX.controllers || {}));