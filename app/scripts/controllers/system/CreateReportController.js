(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateReportController: function (scope, resourceFactory, location, webStorage) {
            scope.formData = {};
            scope.formData1 = {};
            scope.reportParameters = [];
            scope.reportsType = [];
            scope.allowedParams = [];
            scope.reportSubTypes = [];
            scope.flag = false;
            scope.error = null;
            scope.isScheduled = false;
            
            var officeUserData=webStorage.get('officeData');
	        scope.userId=officeUserData.userId;
	        
            resourceFactory.reportsResource.getReportDetails({resourceType: 'template'}, function (data) {
                scope.reportdetail = data;
                scope.reportsType = data.allowedReportTypes;
                scope.allowedParams   = data.allowedParameters;
                scope.reportSubTypes = data.allowedReportSubTypes;
                scope.formData.reportType = data.allowedReportTypes[0];
            });

            scope.parameterSelected = function (allowedParameterId) {
                scope.flag = true;
                for (var i in scope.reportdetail.allowedParameters) {
                    if (scope.reportdetail.allowedParameters[i].parameterId == allowedParameterId) {
                        scope.reportParameters.push({parameterId: allowedParameterId,
                        	reportParameterId: "",
                            allowedParameterName: scope.reportdetail.allowedParameters[i].parameterName
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
                scope.reportParameters.splice(index, 1);
            }
            scope.reportJobNameValidate = function(){
            	console.log("reportJobNameValidate");
            	if((this.formData.reportName != null || this.formData.reportName  != undefined) && (this.formData.displayName != null || this.formData.displayName  != undefined) ){
            		console.log(this.formData.reportName, this.formData.displayName);
            		if(angular.equals(this.formData.reportName, this.formData.displayName)){
            			scope.msg = "Report name and Job name are same"; 
            			scope.error = null;
            		} else{
            			scope.error = "Report name and Job name should be same"; 
            		}
            	}
            }

            scope.submit = function () {
                scope.temp = deepCopy(scope.reportParameters);
                for (var i in scope.temp) {
                    delete scope.temp[i].allowedParameterName;
                }
                this.formData.reportParameters = scope.temp;
                if(this.formData.reportType!="Chart"){
              	  this.formData.reportSubType=null;
                }
               if(this.formData.reportType=="Pentaho"){
             	  this.formData.reportSql=null;
               }

           	scope.scheduleData = {};
           	scope.scheduleData.jobName         = this.formData.displayName;
           	scope.scheduleData.jobDisplayName  = this.formData.displayName;
           	scope.scheduleData.jobType         = this.formData.jobType;
           	scope.scheduleData.cronDescription = this.formData.cronDescription;
           	scope.scheduleData.cronExpression  = this.formData.cronExpression;
           	scope.scheduleData.groupName	   = "Report";
           	scope.scheduleData.jobKey		   = "Every One Minute";
           	scope.scheduleData.schedulerGroup  = 0;
           	scope.scheduleData.createdBy   	   = scope.userId;
           	scope.scheduleData.taskPriority	   = 5;
           	scope.scheduleData.parameterDetails = [{
           		paramName         : "ReportName",
           		paramType         : "COMBO",
           		paramDefaultValue : "ALL",
           		paramValue        : this.formData.displayName,
           		queryValues       : "None",
           		isDynamic		  : "Y",
           	}];
           	
           	delete this.formData.displayName;
           	delete this.formData.jobType;
           	delete this.formData.cronDescription;
           	delete this.formData.cronExpression;
           	
           	scope.isScheduled = this.formData.isScheduled;
           	if(scope.error == null){
           		resourceFactory.reportsResource.save(this.formData, function (data) {
                    if(scope.isScheduled == true){
                    	resourceFactory.createJobsResource.save(scope.scheduleData, function(data){
                            //location.path('/viewschedulerjob/'+data.resourceId);
                          });
                    	
                    }
                    location.path('/system/viewreport/' + data.resourceId);
                });
           	}
            };
        }
    });
    mifosX.ng.application.controller('CreateReportController', ['$scope', 'ResourceFactory', '$location','webStorage', mifosX.controllers.CreateReportController]).run(function ($log) {
        $log.info("CreateReportController initialized");
    });
}(mifosX.controllers || {}));
