(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateTimeModelController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
			
			scope.times = [];
			scope.formData = {};
			scope.templateData = {};
			 
			scope.reset123=function(){
	    		location.path('/rating');
	        };
	        
	       
	        
	        scope.addCreateTimeModelData = function(){
		         if(scope.timeperiodName && scope.startYear && scope.endYear && scope.startMonth && scope.endMonth && scope.startDay && scope.endDay
		        		 && scope.startTime && scope.endTime ){
		        	   
		                scope.times.push({timeperiodName:scope.timeperiodName, 
		                	locale:scope.optlang.code,
		                	startYear:scope.startYear,
		                	endYear:scope.endYear,
		                	startMonth:scope.startMonth,
		                	endMonth:scope.endMonth,
		                	startDay:scope.startDay,
		                	endDay:scope.endDay,
		                	startTime:scope.startTime,
		                	endTime:scope.endTime
		          });
		                
		                scope.timeperiodName = undefined;
				        scope.startYear = undefined;
				        scope.endYear = undefined;
				        scope.startMonth = undefined;
				        scope.endMonth = undefined;
				        scope.startDay = undefined;
				        scope.endDay = undefined;
				        scope.startTime = undefined;
				        scope.endTime = undefined;
		         }
		        };
		       
		        scope.removeTimemodel = function (index) {
		            scope.times.splice(index,1);
		        };
		       
	        
	        scope.submit = function() {   
	        	scope.formData.locale = "en";
	        	scope.formData.times =new Array();
           	 if (scope.times.length > 0) {	                     
                    for (var i in scope.times) {
	                   scope.formData.times.push({
	                	   timeperiodName : scope.times[i].timeperiodName,
	                	   startYear : scope.times[i].startYear,
	                	   endYear : scope.times[i].endYear,
	                	   startMonth : scope.times[i].startMonth,
	                	   endMonth : scope.times[i].endMonth,
	                	   startDay : scope.times[i].startDay,
	                	   endDay : scope.times[i].endDay,
	                	   startTime : scope.times[i].startTime,
	                	   endTime : scope.times[i].endTime,
	                	  
									
						});
                    };
                  }
	            resourceFactory.timeModelResource.save(scope.formData,function(data){
	            	location.path('/rating');
	        		
	          });
	        };
	
		
		}
	});
	mifosX.ng.application.controller('CreateTimeModelController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.CreateTimeModelController ]).run(
		function($log) {
			$log.info("CreateTimeModelController initialized");
		});
}(mifosX.controllers || {}));