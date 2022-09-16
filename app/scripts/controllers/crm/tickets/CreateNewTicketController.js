(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateNewTicketController: function(scope,webStorage, resourceFactory, location, translate,dateFilter,routeParams,$rootScope,http,API_VERSION,Upload) {
		 
		  var locationOrigin = window.location.origin;
		  var locationPathname = window.location.pathname;
		  
		    scope.subCategory = [];
			scope.priorityTypes = [];
			scope.formData={};						
			scope.problemsDatas = [];
			scope.usersDatas=[];
			scope.sourceData=[];
			scope.resourceId ="";
			scope.TicketTeamMappingDatas = [];
			scope.start = {};
			scope.first = {};
			scope.teamUsers = [];
			scope.username=[];
			scope.NGBTeamUsers=[];
			scope.formData.teamUserId;
						
		    //the datetime date is only for display
			scope.dateTime = new Date().toString().replace("GMT+0530 (IST)","").trim();
			
			//the start.date saves the date in NBG db 
			scope.start.date = new Date();
			scope.minDate= scope.start.date;
			
			$('#timepicker1').timepicker({
		        showInputs:false,
		        showMeridian:false
			});
			
			 scope.clientId=routeParams.id;
			 scope.walletConfig = webStorage.get('is-wallet-enable');
			 var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.hwSerialNumber=clientData.hwSerialNumber;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;
			    scope.categoryType=clientData.categoryType;
		        scope.email=clientData.email;
		        scope.phone=clientData.phone;
		        if(scope.imagePresent){
		        scope.image=clientData.image;
		        }
		        
		        var sessionData=webStorage.get('sessionData');
		        scope.formData.assignedTo=sessionData.userId;
		    
		        
		    resourceFactory.ticketResourceTemplate.get(function(data){ 

	          scope.statusData=data.statusData;
	          scope.TicketTeamMappingDatas = data.TicketTeamMappingData;
            	
	          scope.usersDatas = angular.copy(data.usersData);
              scope.usersDatas.push({
                    id:0,
                    userName:"All"
                });
              scope.date = data.ticketDate;
              scope.priorityTypes=data.priorityType;
              for(var i=0;i<scope.priorityTypes.length;i++){
            	  
              	if(scope.priorityTypes[i].value=='LOW'){
              		scope.formData.priority=scope.priorityTypes[i].value;
              	}
              }
              scope.subCategory = data.subCategory;
              scope.problemsDatas=data.problemsDatas;
              scope.usersDatas=data.usersData;
              scope.sourceData=data.sourceData;
              scope.username=data.username;
              for(var i=0;i<scope.sourceData.length;i++){
            	  
                	if(scope.sourceData[i].mCodeValue=='Phone'){
                		scope.formData.sourceOfTicket=scope.sourceData[i].mCodeValue;
                	}
                }
              
             
            });
		    
		    
		    scope.getTeamuser=function(query) {
            	console.log(query);
            	scope.teamUsers=[];
            	return http.get($rootScope.hostUrl+API_VERSION+'/tickets/teamusers',{
            		params:{
            			teamusers:query
            		}
            	}).then(function(result){
            		scope.NGBTeamUsers=result.data.teamUsers;
            		scope.teamUsers.push({
            			id:0,
            			username:"All"
            		});
            		for(var i in scope.NGBTeamUsers) {
            			scope.teamUsers.push(scope.NGBTeamUsers[i]);
            		}
            	});
            };
		    
		    
		    
		    
		    scope.getSubCategory=function(query) {
            	console.log(query);
            	return http.get($rootScope.hostUrl+API_VERSION+'/tickets/subcategory',{
            		params:{
            			category:query
            		}
            	}).then(function(result){
            		
            		scope.subCategory = [];
            	
                    for(var i in result.data.subCategory){
                        scope.subCategory.push(result.data.subCategory[i]);
                      
                     }

            		return scope.subCategory;
            	});
            };
            
           scope.reset123 = function(){
          	  webStorage.add("callingTab", {someString: "Tickets" });
          	  delete scope.first.time;
           };
             
           scope.onFileSelect = function($files) {
 		       scope.file = $files[0];
 		   };
 		   
 		  scope.selectUsers=function(teamUser){
 			  console.log()
 			   if(teamUser.username=="All"){
 				 scope.formData.teamUserId = 0;
 			  }else{
 				 scope.formData.teamUserId =teamUser.userId; 
 		
 			  }
 		  } 
 		   scope.submit = function(){
 			 /*scope.selectUsers(scope.formData.teamUser);
 			 */  
 			 scope.formData.locale = scope.optlang.code;
 			 /*scope.teamUsers
            .push({
            	teamUser: scope.teamUser
            });*/
 			 scope.first.time=$('#timepicker1').val();
 			 var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
 			 if(scope.first.date==null||scope.first.time==''){
 				 delete scope.formData.dueTime;
 			 }else{
				scope.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
 			 }
 			
 			var ticketGeneratedURL = locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId;
        	var ticketGeneratedTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
 			var ticketGenerateDate = dateFilter(scope.start.date,'dd MMMM yyyy'); 

 			scope.formData.dateFormat = 'dd MMMM yyyy';
 			scope.formData.ticketDate = ticketGenerateDate;
        	scope.formData.ticketURL = ticketGeneratedURL;
        	scope.formData.ticketTime = ticketGeneratedTime;
			scope.formData.type = "Customer";

        	
        	resourceFactory.ticketingResource.save({'clientId':scope.clientId},scope.formData,function(data){
        		if (scope.file) {
        			Upload.upload({ 
	                  /*url: $rootScope.hostUrl+ API_VERSION +'/tickets/'+scope.clientId, 
	                  data: {},
	                  file: scope.file*/
	                  
	                  url: $rootScope.hostUrl + API_VERSION + '/clientTicket/' + scope.clientId + '/documents',
	                  data: { name : scope.formData.teamCode, description : scope.formData.description, file: scope.file, childEntityId: data.resourceId},
	                
	                }).then(function(data) {
				          file: scope.file
				        	if (!scope.$$phase) {
				                scope.$apply();
				              }
				        	location.path('/viewclient/id/'+scope.clientId);
				        });
	              } else{
	            	  location.path('/viewclient/id/'+scope.clientId);
	            	 }
            },function(errors) {
                if(errors.data.errors!=null){
                    scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                  }else{
                      scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                  }
              });
       	 
 		   };
 		   
 		   scope.closeDataFun = function(ticketId){
 			   scope.closeData={};
	        	for(var i=0;i<scope.statusData.length;i++){
	              	if(scope.statusData[i].mCodeValue=='CLOSED'){
	              		scope.closeData.status = scope.statusData[i].id;break;
	              	}
	        	}
			    scope.closeData.resolutionDescription = "FTR Closed Ticket";
	        	if(!scope.$$phase) {
	                scope.$apply();
	             }
	        	resourceFactory.closeTicketResource.update({'ticketId':ticketId},scope.closeData,function(data){
	        		console.log("success");
	        	});
	        	location.path('/viewclient/id/'+scope.clientId);
 		   	}
 		   
 		   		//start FTR
			   scope.submitFTR = function() { 
				   /* scope.selectUsers(scope.teamUser);*/
		        	scope.formData.locale = scope.optlang.code; 
		 			 scope.first.time=$('#timepicker1').val();
		 			 var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
		 			 if(scope.first.date==null||scope.first.time==''){
		 				 delete scope.formData.dueTime;
		 			 }else{
						scope.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
		 			 }
		 			
		 			var ticketGeneratedURL = locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId;
		        	var ticketGeneratedTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
		 			var ticketGenerateDate = dateFilter(scope.start.date,'dd MMMM yyyy'); 
		
		 			scope.formData.dateFormat = 'dd MMMM yyyy';
		 			scope.formData.ticketDate = ticketGenerateDate;
		        	//scope.formData.ticketURL = ticketGeneratedURL;
		        	scope.formData.ticketTime = ticketGeneratedTime;
					scope.formData.type = "Customer";

		        	resourceFactory.ticketingResource.save({'clientId':scope.clientId},scope.formData,function(ticketData){
		        		scope.closeDataFun(ticketData.resourceId);
		        		
		        	});
		         };	
		  
	  }
  });
  mifosX.ng.application.controller('CreateNewTicketController', ['$scope', 'webStorage','ResourceFactory', '$location', '$translate','dateFilter', 
                                                              	'$routeParams','$rootScope','$http','API_VERSION','Upload', mifosX.controllers.CreateNewTicketController]).run(function($log) {
    $log.info("CreateNewTicketController initialized");
  });
}(mifosX.controllers || {}));
