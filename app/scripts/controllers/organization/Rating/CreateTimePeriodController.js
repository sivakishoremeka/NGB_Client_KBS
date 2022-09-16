(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateTimePeriodController : function(scope, resourceFactory, location,
				$uibModal, route, paginatorService,routeParams,dateFilter) {

			scope.formData = {};
			scope.formData1 = {};
			//scope.timeperiodId=routeParams.id;
			
			
			
		     var idToNodeMap = {};
		     var str = "new";
		     var times =[];
		     scope.timemodelId=routeParams.id;
		     
			  scope.elementSelect = function(id,nodeName,nodeCode){
		        	scope.nodeId = id;
		        	scope.nodeName = nodeName;
		        	scope.nodeCode = nodeCode;
		        	console.log(nodeCode);
		        	scope.elementId = id.split("-");
		        };
			
			
			scope.reset123 = function() {
				location.path('/rating');
			};

			scope.addTimemodel = function() {
				$uibModal.open({
					templateUrl : 'addTimemodel.html',
					controller : addTimeModelController,
					resolve : {}
				});
			};
			
			 scope.addTimeperiod = function(){
	        	  $uibModal.open({
	                  templateUrl: 'addTimeperiod.html',
	                  controller: addTimePeriodController,
	                  resolve:{}
	              });
	          };
	          
	          scope.addYear = function(){
	        	  $uibModal.open({
	                  templateUrl: 'addYear.html',
	                  controller: addYearController,
	                  resolve:{}
	              });
	          };
	          
	          scope.addMonth = function(){
	        	  $uibModal.open({
	                  templateUrl: 'addMonth.html',
	                  controller: addMonthController,
	                  resolve:{}
	              });
	          };
	          scope.addDay = function(){
	        	  $uibModal.open({
	                  templateUrl: 'addDay.html',
	                  controller: addDayController,
	                  resolve:{}
	              });
	          };
	          scope.addTime = function(){
	        	  $uibModal.open({
	                  templateUrl: 'addTime.html',
	                  controller: addTimeController,
	                  resolve:{}
	              });
	          };
	          
	          scope.editTimemodel = function(){
	        	  $uibModal.open({
	                  templateUrl: 'editTimemodel.html',
	                  controller: editTimeModelController,
	                  resolve:{}
	              });
	          };
	          
	          scope.editTimeperiod = function(){
	            	
	        	  $uibModal.open({
	                  templateUrl: 'editTimeperiod.html',
	                  controller: editTimePeriodController,
	                  resolve:{}
	              });
	          };
	         
	          scope.editYear = function(){
	            	
	        	  $uibModal.open({
	                  templateUrl: 'editYear.html',
	                  controller: editYearController,
	                  resolve:{}
	              });
	          };
	          
	          scope.editMonth = function(){
	            	
	        	  $uibModal.open({
	                  templateUrl: 'editMonth.html',
	                  controller: editMonthController,
	                  resolve:{}
	              });
	          };
	        
	          scope.editDay = function(){
	            	
	        	  $uibModal.open({
	                  templateUrl: 'editDay.html',
	                  controller: editDayController,
	                  resolve:{}
	              });
	          };
	          
	          scope.editTime = function(){
	            	
	        	  $uibModal.open({
	                  templateUrl: 'editTime.html',
	                  controller: editTimeController,
	                  resolve:{}
	              });
	          };
	          
	         scope.deleteTimemodel = function(){
	        	  var timemodelCount = 0;
	        	  for (var i in scope.timeperiodObject){
	        		  if(scope.nodeId == scope.timeperiodObject[i].parentId){
	        			  timemodelCount++;
	        			  break;
	        		  }
	        	 	}
	        		 if(timemodelCount)
	        			 $uibModal.open({
	        				 templateUrl: 'timemodelAlert.html',
	        				 controller: TimeModelAlertController,
	        				 resolve:{}
	        			 });
	        		 else
	        			 $uibModal.open({
	        				 templateUrl: 'deleteTimemodel.html',
	        				 controller: deleteTimeModelController,
	        				 resolve:{}
	        			 });
	        	
	        };
	        
	        scope.deleteTimeperiod = function(){
	        	  var yearCount = 0;
	        	  for (var i in scope.startyearObject){
	        		  if(scope.nodeId == scope.startyearObject[i].parentId){
	        			  yearCount++;
	        			  break;
	        		  }
	        	 	}
	        		 if(yearCount)
	        			 $uibModal.open({
	        				 templateUrl: 'timeperiodAlert.html',
	        				 controller: TimePeriodAlertController,
	        				 resolve:{}
	        			 });
	        		 else
	        			 $uibModal.open({
	        				 templateUrl: 'deleteTimeperiod.html',
	        				 controller: deleteTimePeriodController,
	        				 resolve:{}
	        			 });
	        	
	        };

	        scope.deleteYear = function(){
	        	  var MonthCount = 0;
	        	  for (var i in scope.startmonthObject){
	        		  if(scope.nodeId == scope.startmonthObject[i].parentId){
	        			  MonthCount++;
	        			  break;
	        		  }
	        	 	}
	        		 if(MonthCount)
	        			 $uibModal.open({
	        				 templateUrl: 'YearAlert.html',
	        				 controller: YearAlertController,
	        				 resolve:{}
	        			 });
	        		 else
	        			 $uibModal.open({
	        				 templateUrl: 'deleteYear.html',
	        				 controller: deleteYearController,
	        				 resolve:{}
	        			 });
	        	
	        };
	        
	        scope.deleteMonth = function(){
	        	  var DayCount = 0;
	        	  for (var i in scope.startdayObject){
	        		  if(scope.nodeId == scope.startdayObject[i].parentId){
	        			  DayCount++;
	        			  break;
	        		  }
	        	 	}
	        		 if(DayCount)
	        			 $uibModal.open({
	        				 templateUrl: 'MonthAlert.html',
	        				 controller: MonthAlertController,
	        				 resolve:{}
	        			 });
	        		 else
	        			 $uibModal.open({
	        				 templateUrl: 'deleteMonth.html',
	        				 controller: deleteMonthController,
	        				 resolve:{}
	        			 });
	        	
	        };
	        
	        scope.deleteDay = function(){
	        	  var TimeCount = 0;
	        	  for (var i in scope.starttimeObject){
	        		  if(scope.nodeId == scope.starttimeObject[i].parentId){
	        			  TimeCount++;
	        			  break;
	        		  }
	        	 	}
	        		 if(TimeCount)
	        			 $uibModal.open({
	        				 templateUrl: 'DayAlert.html',
	        				 controller: DayAlertController,
	        				 resolve:{}
	        			 });
	        		 else
	        			 $uibModal.open({
	        				 templateUrl: 'deleteDay.html',
	        				 controller: deleteDayController,
	        				 resolve:{}
	        			 });
	        	
	        };
	        
	        scope.deleteTime = function(){
	          	
	        	  $uibModal.open({
	                  templateUrl: 'deleteTime.html',
	                  controller: deleteTimeController,
	                  resolve:{}
	              });
	          };
	        
			var addTimeModelController = function($scope, $uibModalInstance) {
				$scope.formData = {};

				$scope.submit = function() {
					$scope.formData.locale = "en";
					resourceFactory.timeModelResource.save($scope.formData,function(data) {
						 $uibModalInstance.close('delete');
						  route.reload();
					},function(errData){
			       });
				};
				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};
			
			  var addTimePeriodController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
	        	  $scope.nodeName=scope.nodeName;
	        	 
	        	   
		        	  $scope.submit = function () {
		        	
		        		 $scope.formData.timemodelId = scope.elementId[1];
		        		 console.log(scope.timeperiodName);
		        		 $scope.formData.timeperiodName =  $scope.formdata.timeperiodName;
		        		 $scope.formData.startYear="0";
		        		 $scope.formData.endYear="0";
		        		 $scope.formData.startMonth="0";
		        		 $scope.formData.endMonth="0";
		        		 $scope.formData.startDay="0";
		        		 $scope.formData.endDay="0";
		        		 $scope.formData.startTime="0";
		        		 $scope.formData.endTime="0";
		        		 
		        		  resourceFactory.timePeriodResource.save($scope.formData,function(data){
		        			  $uibModalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		              };
		          };
		          
		          var addYearController = function ($scope, $uibModalInstance) {
		        	  $scope.formData = {};
		        	  $scope.nodeName=scope.nodeName;
		        	  scope.timePeriodData = {};
		        	  var newDate = new Date();
		        	    $scope.totalYear = [];
		        	    var currentYear = newDate.getFullYear();
		        	    for (var i = 0; i <= 20; i++) {
		        	        $scope.totalYear.push(currentYear + i)
		        	    }
		        	    
		        	    var timeperiodId=scope.elementId[1];
		        	    resourceFactory.TimePeriodYearResource.get({timeperiodId:timeperiodId},{},function(data){
		        	    	scope.timePeriodData=data;
		        			 
		        	        });
		        	     
			        	  $scope.submit = function () {
			        		  $scope.formData.timeperiodName =  scope.nodeName;
			        		  $scope.formData.timemodelId=scope.timePeriodData.timemodelId;
			        		  $scope.formData.startYear =  $scope.formData.startYear;
			        		  $scope.formData.endYear =  $scope.formData.endYear;
			        		  $scope.formData.startMonth="0";
				        	  $scope.formData.endMonth="0";
				        	  $scope.formData.startDay="0";
				        	  $scope.formData.endDay="0";
				        	  $scope.formData.startTime="0";
				        	  $scope.formData.endTime="0";
			                /*  resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){	*/  
				        		 resourceFactory.timePeriodResource.save($scope.formData,function(data){
				        			 $uibModalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $uibModalInstance.dismiss('cancel');
			              };
			          };
			          
			          var addMonthController = function ($scope, $uibModalInstance) {
			        	  $scope.formData = {};
			        	  scope.timePeriodData = {}
			        	  var timeperiodId=scope.elementId[1];
			        	    resourceFactory.TimePeriodYearResource.get({timeperiodId:timeperiodId},{},function(data){
			        	    	console.log(data);
			        	    	$scope.timePeriodData=data;
			        	    	 $scope.formData = {
			        	    			 timeperiodName:data.timeperiodName,
			        	    			
			        	    	      };
			        	        });
			        	   $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			        	   
				        	  $scope.submit = function () {
			        		      $scope.formData.timeperiodName =  $scope.formData.timeperiodName;
				        		  $scope.formData.timemodelId=$scope.timePeriodData.timemodelId;
				        		  $scope.formData.startMonth =  $scope.formData.startMonth;
				        		  $scope.formData.endMonth =  $scope.formData.endMonth;
				        		  $scope.formData.startYear="0";
					        	  $scope.formData.endYear="0";
				        		  $scope.formData.startDay="0";
					        	  $scope.formData.endDay="0";
					        	  $scope.formData.startTime="0";
					        	  $scope.formData.endTime="0";
				        		  console.log($scope.formData.startyear);
				                  /*resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){	*/  
				        		  resourceFactory.timePeriodResource.save($scope.formData,function(data){
				        			  $uibModalInstance.close('delete');
				        			  route.reload();
				        	        },function(errData){
						          });
				              };
				              $scope.cancel = function () {
				                  $uibModalInstance.dismiss('cancel');
				              };
				          };
				     var addDayController = function ($scope, $uibModalInstance) {
				        	  $scope.formData = {};
				        	  scope.timePeriodData = {}
				        	  var timeperiodId=scope.elementId[1];
				        	    resourceFactory.TimePeriodYearResource.get({timeperiodId:timeperiodId},{},function(data){
				        	    	$scope.timePeriodData=data;
				        	    	 $scope.formData = {
				        	    			 timeperiodName:data.timeperiodName,
				        	    			
				        	    	 };
				        			 
				        	        });
				        	  $scope.endDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
				        		 
					        	  $scope.submit = function () {
					        		  if($scope.formData.startDay == "Sunday"){
					        			  scope.startDay = 0;
					        		  }else if($scope.formData.startDay == "Monday"){
					        			  scope.startDay = 1;
					        		  }else if($scope.formData.startDay == "Tuesday"){
					        			  scope.startDay = 2;
					        		  }else if($scope.formData.startDay == "Wednesday"){
					        			  scope.startDay = 3;
					        		  }else if($scope.formData.startDay == "Thursday"){
					        			  scope.startDay = 4;
					        		  }else if($scope.formData.startDay == "Friday"){
					        			  scope.startDay = 5;
					        		  }else if($scope.formData.startDay == "Saturday"){
					        			  scope.startDay = 6;
					        		  }
					        		  
					        		  if($scope.formData.endDay == "Sunday"){
					        			  scope.endDay = 0;
					        		  }else if($scope.formData.endDay == "Monday"){
					        			  scope.endDay = 1;
					        		  }else if($scope.formData.endDay == "Tuesday"){
					        			  scope.endDay = 2;
					        		  }else if($scope.formData.endDay == "Wednesday"){
					        			  scope.endDay = 3;
					        		  }else if($scope.formData.endDay == "Thursday"){
					        			  scope.endDay = 4;
					        		  }else if($scope.formData.endDay == "Friday"){
					        			  scope.endDay = 5;
					        		  }else if($scope.formData.endDay == "Saturday"){
					        			  scope.endDay = 6;
					        		  }
					        		  
					        		  $scope.formData.timeperiodName =  $scope.formData.timeperiodName;
					        		  $scope.formData.timemodelId=$scope.timePeriodData.timemodelId;
					        		  $scope.formData.startDay = scope.startDay;
					        		  $scope.formData.endDay =  scope.endDay;
					        		  $scope.formData.startYear="0";
						        	  $scope.formData.endYear="0";
					        		  $scope.formData.startMonth="0";
						        	  $scope.formData.endMonth="0";
						        	  $scope.formData.startTime="0";
						        	  $scope.formData.endTime="0"
						        	  resourceFactory.timePeriodResource.save($scope.formData,function(data){
						        		$uibModalInstance.close('delete');
					        			  route.reload();
					        	        },function(errData){
							          });
					              };
					              $scope.cancel = function () {
					                  $uibModalInstance.dismiss('cancel');
					              };
					       };
		          
					     var addTimeController = function ($scope, $uibModalInstance,dateFilter) {
					        	  $scope.formData = {};
					        	  $scope.nodeName=scope.nodeName;
					        	  
					        	  scope.timePeriodData = {}
					        	  var timeperiodId=scope.elementId[1];
					        	    resourceFactory.TimePeriodYearResource.get({timeperiodId:timeperiodId},{},function(data){
					        	    	$scope.timePeriodData=data;
					        	    	 $scope.formData = {
					        	    			 timeperiodName:data.timeperiodName,
					        	    	     };
					        	        });
					        	   /* $scope.times = ["1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00", 
					        		         "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];*/
					        	    
					        	    $scope.first = {};
					    			var datetime = new Date();
					    			$scope.first.date = datetime;
					    			$scope.startTime = datetime.getHours() + ":" + datetime.getMinutes();
					    			$scope.endTime = datetime.getHours() + ":" + datetime.getMinutes();
					    			$('#timepicker1').timepicker({
					    				showInputs : false,
					    				showMeridian : false,
					    			});
					    			$('#timepicker2').timepicker({
					    				showInputs : false,
					    				showMeridian : false,
					    			});
						        	  $scope.submit = function () {
						        		  $scope.formData.startTime = $('#timepicker1').val() + ':00';
						        		  $scope.formData.endTime = $('#timepicker2').val() + ':00';
						        		  $scope.formData.timeperiodName =  $scope.formData.timeperiodName;
						        		  $scope.formData.timemodelId=$scope.timePeriodData.timemodelId;
						        		  /*$scope.formData.startTime =  $scope.formData.startTime;*/
						        		  /*$scope.formData.endTime =  $scope.formData.endTime;*/
						        		  $scope.formData.startYear="0";
							        	  $scope.formData.endYear="0";
						        		  $scope.formData.startMonth="0";
							        	  $scope.formData.endMonth="0";
							        	  $scope.formData.startDay="0";
							        	  $scope.formData.endDay="0";
							        	  resourceFactory.timePeriodResource.save($scope.formData,function(data){
							        		  $uibModalInstance.close('delete');
							        	     route.reload();
						        	        },function(errData){
								          });
						              };
						              $scope.cancel = function () {
						                  $uibModalInstance.dismiss('cancel');
						              };
						       };
			
			          
		       var editTimeModelController = function ($scope, $uibModalInstance) {
	        	  		
	        	  		$scope.formData={};
	        	  		$scope.formData.timeModelName = scope.nodeName;
		 				$scope.formData.description = scope.nodeCode;
		 				
	        	  $scope.submit = function () {
	        		  	
	        		  var timemodelId=scope.elementId[1];
	        		  resourceFactory.editTmeModelResource.update({timemodelId:timemodelId},$scope.formData,function(data){ 
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };  
	          
	          var editTimePeriodController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
    	 		  $scope.formData.timeperiodName = scope.nodeName;
    	 		
	        	  $scope.submit = function () {
	        		
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        
	          var editYearController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
	        	
	        	  var newDate = new Date();
	        	    $scope.totalYear = [];
	        	    var currentYear = newDate.getFullYear();
	        	    for (var i = 0; i <= 20; i++) {
	        	        $scope.totalYear.push(currentYear + i)
	        	    }
                     
		        	  $scope.formData.startYear = scope.nodeName;
			          $scope.formData.endYear = scope.nodeCode;
		        	  
	        	     $scope.submit = function () {
	        		
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        
	        var editMonthController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
	        	  $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	        	    
	        	  $scope.formData.startMonth =  scope.nodeName;
      		      $scope.formData.endMonth =  scope.nodeCode;
  	 		      
	        	  $scope.submit = function () {
	        		
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
		        
	        var editDayController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
	        	  $scope.endDays = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	        	    
	        	 $scope.formData.startDay =  scope.nodeName;
    		     $scope.formData.endDay =  scope.nodeCode;
    		     
	        	  $scope.submit = function () {
	        		
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        
	        var editTimeController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
	        	  /*$scope.times = ["1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00", 
	        		    "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];*/
	        	  $scope.formData.startTime =  scope.nodeName;
	        	  $scope.formData.endTime =  scope.nodeCode;
	        	  /*$scope.first = {};
	    			var datetime = new Date();
	    			$scope.first.date = datetime;
	    			$scope.startTime = datetime.getHours() + ":" + datetime.getMinutes();*/
	    			/*$scope.endTime = datetime.getHours() + ":" + datetime.getMinutes();*/
	    			/*$('#timepicker1').timepicker({
	    				showInputs : false,
	    				showMeridian : false,
	    			});*/
	    			
	    			/*$('#timepicker2').timepicker({
	    				showInputs : false,
	    				showMeridian : false,
	    			});*/
	    			
		            $scope.submit = function () {
		        	  
		        	  /*$scope.formData.startTime = $('#timepicker1').val() + ':00';*/
		            /*  $scope.formData.endTime = $('#timepicker2').val() + ':00';*/
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.editTimePeriodResource.update({timeperiodId:timeperiodId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	          var TimeModelAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.timeModelName = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };
	          
	          var TimePeriodAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.timeperiodName = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };
	          
	          var YearAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.startYear = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };
	          
	          var MonthAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.startMonth = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };
	          
	          var DayAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.startDay = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };
	          var deleteTimeModelController = function ($scope, $uibModalInstance) {
	        	  	
	        	  $scope.approveDeleteTimemodel = function () {
	        		  $scope.timemodelId=scope.elementId[1];
	        		  resourceFactory.editTmeModelResource.remove({timemodelId:$scope.timemodelId},{},function(data){ 
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
	          var deleteTimePeriodController = function ($scope, $uibModalInstance) {
	        	  	
	        	  $scope.approveDeleteTimeperiod = function () {
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.TimePeriodYearResource.remove({timeperiodId:timeperiodId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
	          
	          var deleteYearController = function ($scope, $uibModalInstance) {
	        	  	
	        	  $scope.approveDeleteYear = function () {
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.TimePeriodYearResource.remove({timeperiodId:timeperiodId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
		     
	          var deleteMonthController = function ($scope, $uibModalInstance) {
	        	  	
	        	  $scope.approveDeleteMonth = function () {
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.TimePeriodYearResource.remove({timeperiodId:timeperiodId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
	          
	          var deleteDayController = function ($scope, $uibModalInstance) {
	        	  	
	        	  $scope.approveDeleteDay = function () {
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.TimePeriodYearResource.remove({timeperiodId:timeperiodId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
	          
	          var deleteTimeController = function ($scope, $uibModalInstance) {
	        	  $scope.approveDeleteTime = function () {
	        		  var timeperiodId=scope.elementId[1];
	        		  resourceFactory.TimePeriodYearResource.remove({timeperiodId:timeperiodId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	         };
	   
	          
			 resourceFactory.timeModelResource.get(function(data){
				 console.log(data);
				
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
	        	    tperiods[timeperiodName].description = scope.availableData[i].description;
	        	    tperiods[timeperiodName].timemodelId = scope.availableData[i].timemodelId;
	        	    if(scope.availableData[i].startYear != 0){
	        	    	tperiods[timeperiodName].startYear = scope.availableData[i].startYear;
	        	    }
	        	    if(scope.availableData[i].endYear != 0){
	        	    	tperiods[timeperiodName].endYear = scope.availableData[i].endYear;
	        	    }
	        	    if(scope.availableData[i].startMonth != 0){
	        	    	tperiods[timeperiodName].startMonth = scope.availableData[i].startMonth;
	        	    }
	        	    if(scope.availableData[i].endMonth != 0){
	        	    	tperiods[timeperiodName].endMonth = scope.availableData[i].endMonth;
	        	    }
	        	    if(scope.availableData[i].startDay != 0){
	        	    	tperiods[timeperiodName].startDay = scope.availableData[i].startDay;
	        	    }
	        	    if(scope.availableData[i].endDay != 0){
	        	    	tperiods[timeperiodName].endDay = scope.availableData[i].endDay;
	        	    }
	        	    if(scope.availableData[i].startTime != 0){
	        	    	tperiods[timeperiodName].startTime = scope.availableData[i].startTime;
	        	    }
	        	    if(scope.availableData[i].endTime != 0){
	        	    	tperiods[timeperiodName].endTime = scope.availableData[i].endTime;
	        	    }
	        	  }
	        	  scope.availableTimePeriodes = [];
	        	  for (var timeperiodName in tperiods) {
	        			  scope.availableTimePeriodes.push({timeperiodName: timeperiodName,timeperiodId:tperiods[timeperiodName].timeperiodId,timeModelName:tperiods[timeperiodName].timeModelName,description:tperiods[timeperiodName].description,timemodelId:tperiods[timeperiodName].timemodelId,startYear:tperiods[timeperiodName].startYear,endYear:tperiods[timeperiodName].endYear,startMonth:tperiods[timeperiodName].startMonth,endMonth:tperiods[timeperiodName].endMonth,startDay:tperiods[timeperiodName].startDay,endDay:tperiods[timeperiodName].endDay,startTime:tperiods[timeperiodName].startTime,endTime:tperiods[timeperiodName].endTime });  	  
	        	  }
	        	  console.log(scope.availableTimePeriodes);
	        	 
	        	 scope.timemodelObject=[];	
	        	 scope.timeperiodObject=[];	
	        	 scope.startyearObject=[];
	        	 scope.endyearObject=[];
	        	 scope.startmonthObject=[];
	        	 scope.endmonthObject=[];
	        	 scope.startdayObject=[];
	        	 scope.enddayObject=[];
	        	 scope.starttimeObject=[];
	        	 scope.endtimeObject=[];
	        	 
	          for(var i in scope.availableTimePeriodes){
	
	        	  scope.timemodelObject.push({id:"A-"+scope.availableTimePeriodes[i].timemodelId,code:scope.availableTimePeriodes[i].description,name:scope.availableTimePeriodes[i].timeModelName,children:[]});
	        	 if(scope.availableTimePeriodes[i].timeperiodId!=0)
	          		scope.timeperiodObject.push({id:"B-"+scope.availableTimePeriodes[i].timeperiodId,name:scope.availableTimePeriodes[i].timeperiodName,parentId:"A-"+scope.availableTimePeriodes[i].timemodelId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	         	    scope.startyearObject.push({id:"C-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].endYear,name:scope.availableTimePeriodes[i].startYear,parentId:"B-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	            	 scope.endyearObject.push({id:"C1-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].startYear,name:scope.availableTimePeriodes[i].endYear,parentId:"B-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	        		 scope.startmonthObject.push({id:"D-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].endMonth,name:scope.availableTimePeriodes[i].startMonth,parentId:"C-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	        		 scope.endmonthObject.push({id:"E-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].startMonth,name:scope.availableTimePeriodes[i].endMonth,parentId:"C1-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	        		 scope.startdayObject.push({id:"F-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].endDay,name:scope.availableTimePeriodes[i].startDay,parentId:"D-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	        		 scope.enddayObject.push({id:"G-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].startDay,name:scope.availableTimePeriodes[i].endDay,parentId:"E-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	        		 scope.starttimeObject.push({id:"H-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].endTime,name:scope.availableTimePeriodes[i].startTime,parentId:"F-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	             if(scope.availableTimePeriodes[i].timeperiodId!=0)
	        		 scope.endtimeObject.push({id:"I-"+scope.availableTimePeriodes[i].timeperiodId,code:scope.availableTimePeriodes[i].startTime,name:scope.availableTimePeriodes[i].endTime,parentId:"G-"+scope.availableTimePeriodes[i].timeperiodId,children:[]});
	          }
	          
	          scope.rootArray=[];
	          
	          scope.timemodelObject=_.uniq(scope.timemodelObject,function(item,key,id){
	              return item.id;
	          });
	          scope.timeperiodObject=_.uniq(scope.timeperiodObject,function(item,key,id){
	              return item.id;
	          });
	          scope.startyearObject=_.uniq(scope.startyearObject,function(item,key,id){
	              return item.id;
	          });
	          scope.endyearObject=_.uniq(scope.endyearObject,function(item,key,id){
	              return item.id;
	          });
	          scope.startmonthObject=_.uniq(scope.startmonthObject,function(item,key,id){
	              return item.id;
	          });
	          scope.endmonthObject=_.uniq(scope.endmonthObject,function(item,key,id){
	              return item.id;
	          });
	          scope.startdayObject=_.uniq(scope.startdayObject,function(item,key,id){
	              return item.id;
	          });
	          scope.enddayObject=_.uniq(scope.enddayObject,function(item,key,id){
	              return item.id;
	          });
	          scope.starttimeObject=_.uniq(scope.starttimeObject,function(item,key,id){
	              return item.id;
	          });
	          scope.endtimeObject=_.uniq(scope.endtimeObject,function(item,key,id){
	              return item.id;
	          });
	          
	          for(var i in scope.timemodelObject){ 
	        	  
	            scope.rootArray.push(scope.timemodelObject[i]);
	          }
	          for(var i in scope.timeperiodObject){
	        	  
	        	  scope.rootArray.push(scope.timeperiodObject[i]);
	           }
	          for(var i in scope.startyearObject){
	        	  
	        	  scope.rootArray.push(scope.startyearObject[i]);
	          }
             for(var i in scope.endyearObject){
	        	  
	        	  scope.rootArray.push(scope.endyearObject[i]);
	          }
             for(var i in scope.startmonthObject){ 
                 scope.rootArray.push(scope.startmonthObject[i]);
              }
             for(var i in scope.endmonthObject){ 
                 scope.rootArray.push(scope.endmonthObject[i]);
              }
             for(var i in scope.startdayObject){ 
                 scope.rootArray.push(scope.startdayObject[i]);
              }
             for(var i in scope.enddayObject){ 
                 scope.rootArray.push(scope.enddayObject[i]);
              }
             for(var i in scope.starttimeObject){ 
                 scope.rootArray.push(scope.starttimeObject[i]);
              }
             for(var i in scope.endtimeObject){ 
                 scope.rootArray.push(scope.endtimeObject[i]);
              }
	          
	             for(var i in scope.rootArray){
	            	
	                 idToNodeMap[scope.rootArray[i].id] = scope.rootArray[i];
	             }
	             
	             function sortByParentId(a, b){
	                 return a.parentId - b.parentId;
	             }
	             scope.availableTimePeriodes.sort(sortByParentId);
	             var glAccountsArray = scope.rootArray;
	            
	             var root = [];
	            for(var i = 0; i < glAccountsArray.length; i++) {
	            	 var currentObj = glAccountsArray[i];
	                 if(currentObj.children){
	                     currentObj.collapsed = "true";
	                 }

	               if(typeof currentObj.parentId === "undefined") {
	                     root.push(currentObj);        
	               } else {
	            	   
	                     parentNode = idToNodeMap[currentObj.parentId];
	                     parentNode.children.push(currentObj);
	               };
	             }
	            scope.treedata = root;
	        });

		}
	});
	mifosX.ng.application.controller(
			'CreateTimePeriodController',
			[ '$scope', 'ResourceFactory', '$location', '$uibModal', '$route',
					'PaginatorService','$routeParams','dateFilter', 
					mifosX.controllers.CreateTimePeriodController ]).run(
			function($log) {
				$log.info("CreateTimePeriodController initialized");
			});
}(mifosX.controllers || {}));