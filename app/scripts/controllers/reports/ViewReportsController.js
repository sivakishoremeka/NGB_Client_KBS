(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewReportsController: function (scope, routeParams, resourceFactory, location, route) {
            scope.reports = [];
           scope.type1 = null;
           
            scope.reportstyp = function(){
            	// console.log(reportType);
                var strVal = reportType.options[reportType.selectedIndex].value;
                var strtext = reportType.options[reportType.selectedIndex].text;
                // console.log(strVal);
                // console.log(strtext);
                
                scope.reportType = strVal;
                // console.log(scope.reportType);
            	if(scope.reportType != null){
            		scope.type1 = scope.reportType;
            		if (scope.type1 == 'all') {
                        resourceFactory.runReportsResource.get({reportSource: 'FullReportList', parameterType: true, genericResultSet: false}, function (data) {
                            scope.reports = scope.getReports(data);
                        });
                    } else if (scope.type1 == 'clients') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Client', parameterType: true, genericResultSet: false}, function (data) {
                            scope.reports = scope.getReports(data);
                        });
                    } else if (scope.type1 == 'orders') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Orders', parameterType: true, genericResultSet: false}, function (data) {
                            scope.reports = scope.getReports(data);
                        });
                    } else if (scope.type1 == 'tickets') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Tickets', parameterType: true, genericResultSet: false}, function (data) {
                            scope.reports = scope.getReports(data);
                        });
                    } else if (scope.type1 == 'inventory') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Inventory', parameterType: true, genericResultSet: false}, function (data) {
                            scope.reports = scope.getReports(data);
                        });
                    } else if (scope.type1 == 'leads') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Leads', parameterType: true, genericResultSet: false}, function (data) {
                            scope.reports = scope.getReports(data);
                        });
                    }else if (scope.type1 == 'broadcaster') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Broadcaster', parameterType : true, genericResultSet : false}, function(data){
                            scope.reports = scope.getReports(data);
                          });
                    }else if (scope.type1 == 'accessProfile') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'AccessProfile', parameterType : true, genericResultSet : false}, function(data){
                            scope.reports = scope.getReports(data);
                          });
                    }else if (scope.type1 == 'invoice&collections') {
                        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Invoice&Collections', parameterType : true, genericResultSet : false}, function(data){
                          scope.reports = scope.getReports(data);
                        });
                    }else if (scope.type1 == 'organization') {
	                    resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Organization', parameterType : true, genericResultSet : false}, function(data){
	                      scope.reports = scope.getReports(data);
	                    });
                    }
            		
            	}
            	
            };
            
            scope.type = routeParams.type;
            
            //to display type of report on breadcrumb
            var typeReport = routeParams.type.replace(routeParams.type[0], routeParams.type[0].toUpperCase()) + " " + "Reports";
            scope.type = typeReport;

            scope.routeTo = function (report) {
                location.path('/run_report/' + report.report_name).search({reportId: report.report_id, type: report.report_type});
            };

            if (!scope.searchCriteria.reports) {
                scope.searchCriteria.reports = null;
                scope.saveSC();
            }
            scope.filterText = scope.searchCriteria.reports || '';

            scope.addLocaleReportName = function (){
                if(document.getElementsByName("locale_name") != undefined && scope.reports){
                    if(scope.reports[0].report_locale_name == undefined){
                        var result = document.getElementsByName("locale_name");
                        for(var i=0; i<result.length; i++) {
                            scope.reports[i].report_locale_name = result[i].value;
                        }
                        //console.log(JSON.stringify(scope.reports));
                    }
                    scope.onFilter();
                }
            };

            scope.filterByReportSubType = function(report) {
                return !(report.report_subtype === 'Triggered');
            }

            scope.onFilter = function () {
                scope.searchCriteria.reports = scope.filterText;
                scope.saveSC();
            };

            if (routeParams.type == 'all') {
                resourceFactory.runReportsResource.get({reportSource: 'FullReportList', parameterType: true, genericResultSet: false}, function (data) {
                    scope.reports = scope.getReports(data);
                });
            } 
            
            /*else if (routeParams.type == 'clients') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Client', parameterType: true, genericResultSet: false}, function (data) {
                    scope.reports = scope.getReports(data);
                });
            } else if (routeParams.type == 'Orders') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Orders', parameterType: true, genericResultSet: false}, function (data) {
                    scope.reports = scope.getReports(data);
                });
            } else if (routeParams.type == 'tickets') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Tickets', parameterType: true, genericResultSet: false}, function (data) {
                    scope.reports = scope.getReports(data);
                });
            } else if (routeParams.type == 'inventory') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Inventory', parameterType: true, genericResultSet: false}, function (data) {
                    scope.reports = scope.getReports(data);
                });
            } else if (routeParams.type == 'leads') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory: 'Leads', parameterType: true, genericResultSet: false}, function (data) {
                    scope.reports = scope.getReports(data);
                });
            }else if (routeParams.type == 'broadcaster') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Broadcaster', parameterType : true, genericResultSet : false}, function(data){
                    scope.reports = scope.getReports(data);
                  });
            }else if (routeParams.type == 'AccessProfile') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'AccessProfile', parameterType : true, genericResultSet : false}, function(data){
                    scope.reports = scope.getReports(data);
                  });
            }else if (routeParams.type == 'invoice&collections') {
                resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Invoice&Collections', parameterType : true, genericResultSet : false}, function(data){
                  scope.reports = scope.getReports(data);
                });
        }else if (routeParams.type == 'Organization') {
            resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Organization', parameterType : true, genericResultSet : false}, function(data){
              scope.reports = scope.getReports(data);
            });
        }*/

            // Remove the duplicate entries from the array. The reports api returns same report multiple times if it have more than one parameter.
            scope.getReports = function (data) {
                var prevId = -1;
                var currId;
                var reports = [];
                for (var i = 0; i < data.length; i++) {
                   currId = data[i].report_id;
                	//currId = data[i].id;
                    if (currId != prevId)
                    // if (data[i].is_scheduled == false){
                    	reports.push(data[i]);
                	// }
                    prevId = currId;
                }
                return reports;
            };
            
            scope.routeToBulk = function (bulkReport) {
                location.path('/bulk_report/' + bulkReport.report_name).search({reportId: bulkReport.report_id, type: bulkReport.report_type});
            };
            
            scope.runReportJob = function (bulkReport) {
            	console.log(bulkReport);
            	scope.jobDatas = {};
            	resourceFactory.getReportJobName.get({jobName : bulkReport.report_name}, function(data) {
					scope.jobDatas = data;
					console.log(scope.jobDatas);
					
					if(scope.jobDatas.jobId != null){
            			console.log(scope.jobDatas.jobId);
	            		resourceFactory.jobsResource.save({jobId: scope.jobDatas.jobId, command : 'executeJob'}, {}, function(data){
	            			console.log(data);
	                    });
            		}
                
				});
            	
            };
            
            scope.bulkReportsData = function(){
            	resourceFactory.runReportsResource.get({reportSource: 'FullReportList', parameterType: true, genericResultSet: false}, function (data) {
                    scope.bulkReports = scope.getBulkReports(data);
                });
			 };
			 
			 scope.getBulkReports = function (data) {
	                var prevId = -1;
	                var currId;
	                var bulkReports = [];
	                for (var i = 0; i < data.length; i++) {
	                    currId = data[i].report_id;
	                    if (currId != prevId){
	                    	if (data[i].is_scheduled == true){
	                    		bulkReports.push(data[i]);
	                    	}
	                    	
	                    }
	                        
	                    prevId = currId;
	                }
	                return bulkReports;
	            };
	            
        }
    });
    mifosX.ng.application.controller('ViewReportsController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$route', mifosX.controllers.ViewReportsController]).run(function ($log) {
        $log.info("ViewReportsController initialized");
    });
}(mifosX.controllers || {}));