(function (module) {
    mifosX.controllers = _.extend(module, {
        EditReportController: function (scope, resourceFactory, location, routeParams, webStorage) {
        	/*
            scope.formData = {};

            resourceFactory.reportsResource.getReportDetails({id: routeParams.id, template: 'true'}, function (data) {
                scope.reportdetail = data;
                scope.reportdetail.reportParameters = data.reportParameters || [];
                scope.formData.useReport = data.useReport;
                scope.formData.reportType = data.reportType;
                scope.disableFields = false;

                if(scope.reportdetail.coreReport == true){
                    scope.disableFields = true;
                }

            });

            scope.parameterSelected = function (allowedParameterId) {
                for (var i in scope.reportdetail.allowedParameters) {
                    if (scope.reportdetail.allowedParameters[i].id == allowedParameterId) {
                        scope.reportdetail.reportParameters.push({parameterId: allowedParameterId,
                            id: "",
                            parameterName: scope.reportdetail.allowedParameters[i].parameterName
                        });
                    }
                }
                scope.allowedParameterId = '';
            }



            function deepCopy(obj) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    var out = [], i = 0, len = obj.length;
                    for (; i < len; i++) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                if (typeof obj === 'object') {
                    var out = {}, i;
                    for (i in obj) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                return obj;
            }

            scope.deleteParameter = function (index) {
                scope.reportdetail.reportParameters.splice(index, 1);
            }

            scope.submit = function () {
                if (scope.reportdetail.coreReport === true) {
                    this.formData.reportParameters = scope.temp;
                    this.formData.useReport = scope.reportdetail.useReport;
                } else {
                    scope.temp = deepCopy(scope.reportdetail.reportParameters);
                    scope.reportdetail.reportParameters = scope.temp;

                    for (var i in scope.temp) {
                        delete scope.temp[i].parameterName;
                    }

                    this.formData = {
                        reportName: scope.reportdetail.reportName,
                        reportType: scope.reportdetail.reportType,
                        reportSubType: scope.reportdetail.reportSubType,
                        reportCategory: scope.reportdetail.reportCategory,
                        useReport: scope.reportdetail.useReport,
                        description: scope.reportdetail.description,
                        reportSql: scope.reportdetail.reportSql,
                        reportParameters: scope.reportdetail.reportParameters
                    }
                }
                resourceFactory.reportsResource.update({id: routeParams.id}, this.formData, function (data) {
                    location.path('/system/viewreport/' + data.resourceId);
                });
            };
        */
        	

            scope.formData =  {};
            scope.reportdetail = [];
            scope.reportsType = [];
            scope.allowedParams = [];
            scope.reportSubTypes = [];
            scope.flag = false;
            scope.reportParameters = [];
            scope.error = null;
            scope.isScheduled = false;
            
            var officeUserData=webStorage.get('officeData');
	        scope.userId=officeUserData.userId;
            
            resourceFactory.reportsResource.getReportDetails({id : routeParams.id, template : 'true'}, function(data) {
                scope.reportdetail = data;
                scope.reportsType = data.allowedReportTypes;
                scope.allowedParams   = data.allowedParameters;
                scope.reportSubTypes = data.allowedReportSubTypes;
                scope.formData.useReport = data.useReport;
                
                if(data.reportParameters != null && data.reportParameters != undefined){
                	scope.reportParameters = data.reportParameters;
                }
                if(scope.reportdetail.isScheduled == true){
                	resourceFactory.getReportJobName.get({jobName : scope.reportdetail.reportName}, function(data) {
                        scope.job = data;
                        scope.formData = {
                          displayName     : data.displayName,
                          jobType         : data.jobType,
                          cronExpression  : data.cronExpression,
                          cronDescription : data.cronDescription,
                          active          : data.active
                        };
                      });
                }
            });
            
            scope.parameterSelected = function (allowedParameterId) {
//                for (var i in scope.reportdetail.allowedParameters) {
//                    if (scope.reportdetail.allowedParameters[i].parameterId == allowedParameterId) {
//                        scope.reportdetail.reportParameters.push({parameterId: allowedParameterId,
//                        	reportParameterId: null,
//                            parameterName: scope.reportdetail.allowedParameters[i].parameterName
            	console.log(allowedParameterId);
                for (var i in scope.allowedParams ) {
                    if (scope.allowedParams[i].parameterId == allowedParameterId) {
                    	/*scope.reportdetail.reportParameters.push({parameterId: allowedParameterId,
                        	reportParameterId: null,
                            parameterName: scope.allowedParams[i].parameterName
                        });*/
                        scope.reportParameters.push({parameterId: allowedParameterId,
                        	reportParameterId: null,
                            parameterName: scope.allowedParams[i].parameterName
                        });
                    }
                }
                scope.allowedParameterId = '';
            }
            
            function deepCopy(obj) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    var out = [], i = 0, len = obj.length;
                    for (; i < len; i++) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                if (typeof obj === 'object') {
                    var out = {}, i;
                    for (i in obj) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                return obj;
            }
            
            scope.deleteParameter = function (index) {
            	//scope.reportdetail.reportParameters.splice(index, 1);
                scope.reportParameters.splice(index, 1);
            }
            
            scope.reportJobNameValidate = function(){
            	console.log("reportJobNameValidate");
            	if((scope.reportdetail.reportName != null || scope.reportdetail.reportName  != undefined) && (this.formData.displayName != null || this.formData.displayName  != undefined) ){
            		console.log(scope.reportdetail.isScheduled, this.formData.displayName);
            		if(angular.equals(scope.reportdetail.reportName, this.formData.displayName)){
            			scope.msg = "Report name and Job name are same"; 
            			scope.error = null;
            		} else{
            			scope.error = "Report name and Job name should be same"; 
            		}
            	}
            }
            
            scope.submit = function() {
            	
            	scope.scheduleData = {};
                //scope.scheduleData.jobName         = this.formData.displayName;
             	scope.scheduleData.displayName     = this.formData.displayName;
             	scope.scheduleData.active          = this.formData.active;
             	scope.scheduleData.cronDescription = this.formData.cronDescription;
             	scope.scheduleData.cronExpression  = this.formData.cronExpression;
             	
              this.formData=scope.reportdetail;
              scope.temp = deepCopy(scope.reportParameters);
              this.formData.reportParameters = scope.temp;
              
             if(this.formData.reportType!="Chart"){
            	  this.formData.reportSubType=null;
              }
             if(this.formData.reportType=="Pentaho"){
           	  this.formData.reportSql=null;
             }
              delete this.formData.id;
              delete this.formData.coreReport;
              delete this.formData.allowedReportTypes;
              delete this.formData.allowedReportSubTypes;
              delete this.formData.allowedParameters;
              
              
              scope.isScheduled = this.formData.isScheduled;
              if(scope.error == null){
              resourceFactory.reportsResource.update({id: routeParams.id}, this.formData,function(data){
            	  if(scope.isScheduled == true){
                    	resourceFactory.jobsResource.update({jobId: scope.job.jobId, resourceType: null}, scope.scheduleData, function(data){
                            //location.path('/viewschedulerjob/'+data.resourceId);
                    		console.log(data);
                          });
                    	
                    }
                location.path('/system/viewreport/' + data.resourceId);
              });
            }
              
            };
        
        
        }
    });
    mifosX.ng.application.controller('EditReportController', ['$scope', 'ResourceFactory', '$location', '$routeParams','webStorage', mifosX.controllers.EditReportController]).run(function ($log) {
        $log.info("EditReportController initialized");
    });
}(mifosX.controllers || {}));
