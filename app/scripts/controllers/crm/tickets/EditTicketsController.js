(function(module) {
	mifosX.controllers = _.extend(module,{
		EditTicketsController : function(scope,webStorage,routeParams,resourceFactory, location, http,API_VERSION,$rootScope,Upload,dateFilter) {
		
			scope.formData = {};
			scope.ticketDate = new Date();
			scope.start.date = new Date();
			scope.minDate= scope.start.date;
			scope.data={};
			var locationOrigin = window.location.origin;
        	var locationPathname = window.location.pathname;
			var clientData = webStorage.get('clientData');
		    scope.displayName=clientData.displayName;
		    scope.statusActive=clientData.statusActive;
		    scope.hwSerialNumber=clientData.hwSerialNumber;
		    scope.accountNo=clientData.accountNo;
		    scope.officeName=clientData.officeName;
		    scope.balanceAmount=clientData.balanceAmount;
		    scope.currency=clientData.currency;
		    scope.imagePresent=clientData.imagePresent;
		    scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
	        scope.ticketId = routeParams.id;
	        console.log(scope.ticketId);
	    	scope.TicketTeamMappingDatas = [];
	    	scope.subCategory = [];
	    	
	    	 var locationOrigin = window.location.origin;
	       	var locationPathname = window.location.pathname;
	        
	        resourceFactory.editTicketResource.get({clientId: routeParams.clientId, id: routeParams.id} , function(data) {	
                scope.teamUser=data.teamCode;
	        	scope.formData=data;
	        	scope.subCategory=data.subCategoryes;
	        	scope.formData.teamUser=data.teamUser;
				scope.statusTypes = data.statusType;
				if(data.statusCode){
					scope.formData.status = data.statusCode;
				}else{
					for(var i = 0; i < scope.statusTypes.length; i++){
	                	if(scope.statusTypes[i].mCodeValue == 'Working'){
	                		scope.formData.status = scope.statusTypes[i].mCodeValue;
	                	}
	              }
				}
				 
				
				scope.priorityTypes = data.priorityType;
				scope.usersData = data.usersData;
				scope.clientId=routeParams.clientId;
				scope.ticketId=routeParams.id;
				scope.TicketTeamMappingDatas = data.TicketTeamMappingData;
				for(var i=0;i<scope.TicketTeamMappingDatas.length;i++){
	                if(scope.TicketTeamMappingDatas[i].id==data.teamId){
	                	scope.formData.teamCode = scope.TicketTeamMappingDatas[i].id;
	                	scope.getTeamuser(scope.formData.teamCode, data.teamUserId);
	                	break;
	                }
				}
				
				scope.problemsDatas = data.problemsDatas;
				for(var i=0;i<scope.problemsDatas.length;i++){
	                if(scope.problemsDatas[i].id==data.problemCode){
	                	scope.formData.problemCode = scope.problemsDatas[i].id;
	                	scope.getSubCategory(scope.formData.problemCode, scope.subCategory);
	                	break;
	                }
				}
				
	            
				console.log(scope.teamUser+"_"+scope.formData.teamCode);
	             
			});
	        
	        scope.reset123 = function(){
		     	 webStorage.add("callingTab", {someString: "Tickets" });
		    };
			scope.onFileSelect = function($files) {
			     scope.file = $files[0];
			};
			
			 scope.getTeamuser=function(query, userId) {
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
	            			if(scope.NGBTeamUsers[i].userId == userId){
	            				scope.formData.teamUser = scope.NGBTeamUsers[i].userId;
	            			}
	            			
	    	            }
	            		
	            	});
	            };
	            scope.getSubCategory=function(query, subCategory) {
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
	                    	if(result.data.subCategory[i].subCategory == subCategory){
	                    		scope.formData.subCategory = result.data.subCategory[i].subCategory ;
	                    	}
	                     }

	            		return scope.subCategory;
	            	});
	            };
	            
	            /*scope.selectUsers=function(teamUser){
	   			  console.log(teamUser);
	   			  if(teamUser.username=="All"){
	   				 scope.formData.teamUserId = 0;
	   			  }else{
	   				 scope.formData.teamUserId =teamUser.userId; 
	   		
	   			  }
	   		  } */
			    
			scope.submit = function() {
				/*scope.selectUsers(scope.teamUser);*/
				scope.formData.locale = scope.optlang.code;
				var ticketGenerateDate = dateFilter(scope.start.date,'dd MMMM yyyy'); 
				scope.formData.dateFormat = "dd MMMM yyyy";
				scope.formData.ticketDate = ticketGenerateDate;
				/*var reqEndDate = dateFilter(scope.formData.validTo,'dd MMMM yyyy');
	        	scope.formData.validTo = reqEndDate;*/
				
				scope.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId;
				scope.formData.assignedTo = scope.formData.userId;
				scope.formData.assignedName = scope.formData.userName;
				scope.formData.ticketId = scope.formData.id;
				scope.formData.description = scope.formData.comments;
				scope.formData.teamUserId=scope.formData.teamUser;
				
				delete scope.formData.priorityType;
				delete scope.formData.problemsDatas;
				delete scope.formData.usersData;
				delete scope.formData.statusType;
				delete scope.formData.statusDescription;
				delete scope.formData.problemDescription;
				delete scope.formData.lastComment;
				delete scope.formData.userId;
				delete scope.formData.userName;
				delete scope.formData.id;
				delete scope.formData.teamCode;
				delete scope.formData.teamUser;
				
				
				resourceFactory.updateTicketResource.update({'ticketId':scope.ticketId},scope.formData,function(data){
	        		console.log("success");
	        	});
				
				location.path('/viewclient/id/'+ routeParams.clientId);
			};
		}
	});
	mifosX.ng.application.controller('EditTicketsController', [
	          '$scope',
	          'webStorage',
	          '$routeParams', 
	          'ResourceFactory', 
	          '$location', 
	          '$http',
	          'API_VERSION',
	          '$rootScope',
	          'Upload',
	          'dateFilter',
	  mifosX.controllers.EditTicketsController]).run(function($log) {
	     $log.info("EditTicketsController initialized");
	  });
}(mifosX.controllers || {}));