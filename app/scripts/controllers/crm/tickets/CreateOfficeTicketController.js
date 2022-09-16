(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateOfficeTicketController: function(scope,resourceFactory,http,API_VERSION,$rootScope,dateFilter,location,routeParams,Upload,webStorage) {
		  scope.priorityTypes = [];
		  scope.formData={};
		  scope.problemsDatas = [];
		  scope.usersDatas=[];
		  scope.sourceData=[];
		  scope.first = {};
		  
		  scope.officeId=routeParams.id;
			 
		  var locationOrigin = window.location.origin;
		  var locationPathname = window.location.pathname;
		  
		  //the datetime date is only for display
			scope.dateTime = new Date().toString().replace("GMT+0530 (IST)","").trim();
			
			//the start.date saves the date in NBG db 
			scope.start.date = new Date();
			scope.minDate= scope.start.date;
			
			scope.officeData =  webStorage.get("officeData");
			
			resourceFactory.officeResource.get({officeId: scope.officeId}, function (data) {
                scope.office = data;
                
            });
			
			resourceFactory.ticketResourceTemplate.get(function(data){ 

			    scope.statusData=data.statusData;
			  	
			    scope.date = data.ticketDate;
			    scope.priorityTypes=data.priorityType;
			    for(var i=0;i<scope.priorityTypes.length;i++){
			  	  
			    	if(scope.priorityTypes[i].value=='LOW'){
			    		scope.formData.priority=scope.priorityTypes[i].value;
			    	
			    }
			    }
			    scope.subCategory = data.subCategory;
			    scope.problemsDatas=data.problemsDatas;
			    
			    /*This is used to get only selected list of users based on logged in user officeType*/
			    if (scope.officeData.officeType != 'LCO'){
			    	scope.usersDatas=data.usersData;
			    } else {
			    	for (var i in data.usersData){
			    		if (data.usersData[i].officeType == 'MSO' || data.usersData[i].officeType == '115'){
			    			scope.usersDatas.push(data.usersData[i]);
			    		}
			    	}
			    }
			    /*END*/
			    //scope.usersDatas=data.usersData; This is code commented to get only selected list of users based on user officeType 
			   
			    scope.sourceData=data.sourceData;
			    for(var i=0;i<scope.sourceData.length;i++){
			  	  
			      	if(scope.sourceData[i].mCodeValue=='Phone'){
			      		scope.formData.sourceOfTicket=scope.sourceData[i].mCodeValue;
			      	}
			      }
			  });
			
			scope.getSubCategory=function(query) {
            	console.log(query);
            	return http.get($rootScope.hostUrl+API_VERSION+'/tickets/subcategory',{
            		params:{
            			category:query
            		}
            	}).then(function(result){
            		
            		scope.subCategory = [];
            	
                    for(var i in result.data.subCategory){
                    	console.log(result.data.subCategory[i]);
                        scope.subCategory.push(result.data.subCategory[i]);
                      
                     }

            		return scope.subCategory;
            	});
			};
			
			scope.reset123 = function(){
	          	  delete scope.first.time;
	           };
	             
	        scope.onFileSelect = function($files) {
	 		       scope.file = $files[0];
	 		};
	 	
	 		   
	 		scope.submit = function(){
	 			 scope.formData.locale = scope.optlang.code;
	 			  
	 			 scope.first.time=$('#timepicker1').val();
	 			 var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
	 			 if(scope.first.date==null||scope.first.time==''){
	 				 delete scope.formData.dueTime;
	 			 }else{
					scope.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
	 			 }
	 			
	 			var ticketGeneratedURL = locationOrigin+''+locationPathname+"#/viewTicket/"+scope.officeId;
	        	var ticketGeneratedTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
	 			var ticketGenerateDate = dateFilter(scope.start.date,'dd MMMM yyyy'); 

	 			scope.formData.dateFormat = 'dd MMMM yyyy';
	 			scope.formData.ticketDate = ticketGenerateDate;
	        	scope.formData.ticketURL = ticketGeneratedURL;
	        	scope.formData.ticketTime = ticketGeneratedTime;
				scope.formData.type = "Office";

	        	
	        	resourceFactory.officeTicketResource.save({'officeId':scope.officeId},scope.formData,function(data){
	        		console.log(data.resourceId);
	        		if (scope.file) {
	        			Upload.upload({ 
		                  /*url: $rootScope.hostUrl+ API_VERSION +'/tickets/'+scope.officeId, 
		                  data: {},
		                  file: scope.file*/
		                  
		                  url: $rootScope.hostUrl + API_VERSION + '/officeTicket/' + scope.officeId + '/documents',
		                  data: { name : scope.formData.title, description : scope.formData.description, file: scope.file, childEntityId: data.resourceId},
		                
		                }).then(function(data) {
					          file: scope.file
					        	if (!scope.$$phase) {
					                scope.$apply();
					              }
					        	location.path('/viewoffice/'+scope.officeId);
					        });
		              } else{
		            	 	location.path('/viewoffice/'+scope.officeId);
						    }
	            },function(errors) {
	                if(errors.data.errors!=null){
	                    scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
	                  }else{
	                      scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
	                  }
	              });
	        	
	 		   };
	 		   
	 		   
	 		   
	 		   
	 scope.submitFTR = function() { 

	 				scope.first.time=$('#timepicker1').val();
	 				var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
	 				if(scope.first.date==null||scope.first.time==''){
	 					delete scope.formData.dueTime;
	 				}else{
	 					scope.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
	 				}
	 				scope.officeId=routeParams.officeId;
	 				scope.formData.dateFormat = 'dd MMMM yyyy';
	 				scope.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.officeId;
	 				scope.formData.ticketTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
	              	scope.ticketdata = {};
	 					scope.ticketdata.assignedTo=scope.formData.assignedTo;
	 					scope.ticketdata.comments=scope.formData.comments;
	 					scope.ticketdata.status=scope.formData.status;
	 					scope.ticketdata.priority = scope.formData.priority;
	 					scope.ticketdata.problemCode = scope.formData.problemCode;
	 					scope.ticketdata.subCategory = scope.formData.subCategory;
	 					scope.ticketdata.description=scope.formData.description;
	 					scope.ticketdata.title=scope.formData.title;
	 					scope.ticketdata.dateFormat = scope.formData.dateFormat;
	 					if(scope.formData.dueTime) scope.ticketdata.dueTime = scope.formData.dueTime;
	 					scope.ticketdata.locale = scope.optlang.code;
	 					scope.ticketdata.priority = scope.formData.priority;
	 					scope.ticketdata.sourceOfTicket = scope.formData.sourceOfTicket;
	 					scope.ticketdata.ticketDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	 					scope.ticketdata.ticketTime = scope.formData.ticketTime;
	 					scope.ticketdata.ticketURL = scope.formData.ticketURL;
	 					scope.ticketdata.type = "Office";

	 					
	 					
	 					Upload.upload({
	 						  url: $rootScope.hostUrl+ API_VERSION +'/tickets/'+scope.officeId, 
	 				          data: scope.ticketdata,
	 				          file: scope.file
	 				        }).then(function(data) {
	 				        	scope.closeData={};
	 				        	//scope.messages = angular.toJson(data);
	 				        	console.log(data.data.resourceId);
	 				        	for(var i=0;i<scope.statusData.length;i++){
	 				            	  
	 			                	if(scope.statusData[i].mCodeValue=='CLOSED'){
	 			                		scope.closeData.status = scope.statusData[i].id;
	 			                	}
	 			                }
	 				        	//scope.statusData=data.statusData;
	 				        	//console.log(scope.statusData);
	 				        	
	 				        scope.closeData.resolutionDescription = "FTR Closed Ticket";
	 			                
	 				        
	 				        	
	 				        	if (!scope.$$phase) {
	 				                scope.$apply();
	 				              }
	 				        	resourceFactory.closeTicketResource.update({'ticketId': data.data.resourceId },scope.closeData,function(data){
	 		                    
	 				        		console.log("success");
	 		                 });
	 		                		
	 				        	

	 				        	location.path('/viewoffice/'+scope.officeId);
	 				        	
	 				        });	
	          };   
 		   
	  }
  });
  mifosX.ng.application.controller('CreateOfficeTicketController', ['$scope','ResourceFactory','$http','API_VERSION','$rootScope','dateFilter','$location','$routeParams','Upload','webStorage',
                                                                    mifosX.controllers.CreateOfficeTicketController]).run(function($log) {
    $log.info("CreateOfficeTicketController initialized");
  });
}(mifosX.controllers || {}));
