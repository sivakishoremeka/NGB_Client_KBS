(function(module) {
  mifosX.controllers = _.extend(module, {
	  RatingController: function(scope, resourceFactory,location,$uibModal,route,paginatorService,webStorage) {
		
		    scope.templatedfs = [];
			scope.pageItems = [];
			scope.uoms = [];
			scope.rums = [];
			scope.availableTimePeriodes = [];
			scope.rateplans = [];

			
			scope.routeTotemplatedf = function(id){
		        location.path('/viewtemplatedef/'+ id);
			};   
	          
			scope.routeTouom = function(id){
	          location.path('/viewuom/'+ id);
		 	};
		 	
		 	scope.routeTorum = function(id){
		          location.path('/viewrum/'+ id);
			 	};
			 	
			 	
			scope.templatesFetchFunction = function(offset, limit, callback) {
					  resourceFactory.templateResource.get({offset: offset, limit: limit}, function(data) {
						  	scope.totalpropeties = data.totalFilteredRecords;
				        	scope.allDatas = data.pageItems;
				        	if(scope.totalpropeties%15 == 0)	
				        		scope.totalPages = scope.totalpropeties/15;
				        	else
				        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
				        	callback(data);
				        });
				  };
				  
				  scope.templateDefinition = function () {
					  scope.templatedfs = paginatorService.paginate(scope.templatesFetchFunction, 14);
			    		
			      };
	        
			scope.unitofmeasurementFetchFunction = function(offset, limit, callback) {
				  resourceFactory.unitofmeasurementResource.get({offset: offset, limit: limit}, function(data) {
					  	scope.totalpropeties = data.totalFilteredRecords;
			        	scope.allDatas = data.pageItems;
			        	if(scope.totalpropeties%35 == 0)	
			        		scope.totalPages = scope.totalpropeties/35;
			        	else
			        		scope.totalPages = Math.floor(scope.totalpropeties/35)+1;   
			        	callback(data);
			        });
			  };
			  
			  scope.uom = function () {
				  scope.uoms = paginatorService.paginate(scope.unitofmeasurementFetchFunction, 14);
		    		
		      };
		      
		      scope.ratableusagemetricFetchFunction = function(offset, limit, callback) {
				  resourceFactory.ratableusagemetricResource.get({offset: offset, limit: limit}, function(data) {
					  	scope.totalpropeties = data.totalFilteredRecords;
			        	scope.allDatas = data.pageItems;
			        	if(scope.totalpropeties%15 == 0)	
			        		scope.totalPages = scope.totalpropeties/15;
			        	else
			        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
			        	callback(data);
			        });
			  };
			  
			  scope.rum = function () {
				  scope.rums = paginatorService.paginate(scope.ratableusagemetricFetchFunction, 14);
		    		
		    	};
		  
		    	scope.timeperiodFetchFunction = function(offset, limit, callback) {
					  resourceFactory.timePeriodResource.get({offset: offset, limit: limit}, function(data) {
						  
						 scope.totalpropeties = data.totalFilteredRecords;
						 /*	scope.allDatas = data.pageItems;*/
						  	scope.availableData = [];
							 
							 scope.availableData = data.pageItems;
				        	  var tperiods = {};
				        	  
				        	  for (var i = 0; i < scope.availableData.length; i++) {
				        	    var timeperiodName = scope.availableData[i].timeperiodName;
				        	    
				        	    
				        	    if (!tperiods[timeperiodName]) {
				        	    	tperiods[timeperiodName] = [];
				        	    }
				        	    tperiods[timeperiodName].timeperiodId = scope.availableData[i].timeperiodId;
				        	    tperiods[timeperiodName].timeModelName = scope.availableData[i].timeModelName;
				        	    tperiods[timeperiodName].timemodelId = scope.availableData[i].timemodelId;
				        	    if(scope.availableData[i].startYear != 0){
				        	    tperiods[timeperiodName].startYear = scope.availableData[i].startYear;
				        	    }
				        	    if(scope.availableData[i].endYear != 0){
				        	    tperiods[timeperiodName].endYear = scope.availableData[i].endYear;
				        	    }
				        	  }


				        	  scope.availableTimePeriodes.pageItems = [];
				        	  for (var timeperiodName in tperiods) {
				        			  scope.availableTimePeriodes.pageItems.push({timeperiodName: timeperiodName,timeperiodId:tperiods[timeperiodName].timeperiodId,timeModelName:tperiods[timeperiodName].timeModelName,timemodelId:tperiods[timeperiodName].timemodelId,startYear:tperiods[timeperiodName].startYear,endYear:tperiods[timeperiodName].endYear });  	  
				        			  //console.log(scope.availableTimePeriodes);
				        	  }
				        	  
				        	if(scope.totalpropeties%15 == 0)	
				        		scope.totalPages = scope.totalpropeties/15;
				        	else
				        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
				        	callback(data);
				        });
				  };
				  
				  scope.timemodel = function () {
					  scope.availableTimePeriodes = paginatorService.paginate(scope.timeperiodFetchFunction, 14);
					  console.log("hi")
					  console.log(scope.availableTimePeriodes);
			    		
			    	};
			    	
			    	scope.usagerateplanFetchFunction = function(offset, limit, callback) {
						  resourceFactory.usageRatePlanResource.get({offset: offset, limit: limit}, function(data) {
							  	scope.totalpropeties = data.totalFilteredRecords;
					        	scope.allDatas = data.pageItems;
					        	if(scope.totalpropeties%15 == 0)	
					        		scope.totalPages = scope.totalpropeties/15;
					        	else
					        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
					        	callback(data);
					        });
					  };
					  
					  scope.rateplan = function () {
						  scope.rateplans = paginatorService.paginate(scope.usagerateplanFetchFunction, 14);
				    		
				    	};
		 
	  }
  });
  mifosX.ng.application.controller('RatingController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route',
     'PaginatorService',
     'webStorage',
     mifosX.controllers.RatingController]).run(function($log) {
    $log.info("RatingController initialized");
  });
}(mifosX.controllers || {}));
