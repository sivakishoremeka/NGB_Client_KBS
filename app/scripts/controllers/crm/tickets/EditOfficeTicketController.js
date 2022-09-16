(function(module) {
	mifosX.controllers = _.extend(module,{
		EditOfficeTicketController : function(scope,webStorage,routeParams,resourceFactory, location, http,API_VERSION,$rootScope,Upload) {

			scope.formData = {};	
			scope.data={};
			scope.statusTypes={};
			var locationOrigin = window.location.origin;
        	var locationPathname = window.location.pathname;
			/*var clientData = webStorage.get('clientData');
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
	        scope.phone=clientData.phone;*/
	        resourceFactory.editSingleOfficeTicketResource.get({officeId:routeParams.officeId, ticketId: routeParams.ticketId,template: 'true'} , function(data) {	
      
				scope.formData=data;
				scope.statusTypes = data.statusType;
				scope.lastComment =data.lastComment;
				scope.userName = data.userName;
				if(data.statusCode){
					scope.formData.status = data.statusCode;
				}else{
					for(var i = 0; i < scope.statusTypes.length; i++){
	                	if(scope.statusTypes[i].mCodeValue == 'Working'){
	                		scope.formData.status = scope.statusTypes[i].mCodeValue;
	                	}
	              }
				}
				
				scope.problemsDatas = data.problemsDatas;
				scope.priorityTypes = data.priorityType;
				scope.usersData = data.usersData;
				for(var j=0;j<scope.usersData.length;j++){
	                if(scope.usersData[j].userName==data.userName){
	                	scope.formData.userId=scope.usersData[j].id;
	                }
	            } 
				
				//scope.formData.status=14;
				scope.officeId=routeParams.officeId;
				scope.ticketId=routeParams.ticketId;
				scope.title=data.title;
				scope.title=data.title;
				scope.ticketNumber=data.ticketNumber;
				scope.getSubCategory(scope.formData.problemCode,scope.formData.subCategoryStatus);

			});		
			
	        scope.getSubCategory=function(query,subCategory) {
            	return http.get($rootScope.hostUrl+API_VERSION+'/tickets/subcategory',{
            		params:{
            			category:query
            		}
            	}).then(function(result){
            		
            		scope.subCategory = [];
            	
                    for(var i in result.data.subCategory){
                        scope.subCategory.push(result.data.subCategory[i]);  
                        if(scope.formData.subCategory = scope.subCategory[i].subCategory){
                        	scope.formData.subCategory = scope.subCategory[i].subCategory;
                        }
                     }
            		return scope.subCategory;
            	});
            	
			};
	        
	        scope.reset123 = function() {
				officeId = routeParams.officeId;
				location.path('/viewoffice/' + officeId );
			};
			scope.onFileSelect = function($files) {
			        scope.file = $files[0];
			      };
			      
			scope.submit = function() {
				this.data.assignedTo=this.formData.userId;
				this.data.comments=this.formData.comments;
				this.data.ticketNumber = this.formData.ticketNumber;
				this.data.status=this.formData.status;
				this.data.title=this.formData.title;
				this.data.priority = this.formData.priority;
				this.data.problemCode = this.formData.problemCode;
				this.data.subCategory = this.formData.subCategory;
				this.data.locale="en";
				this.data.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.officeId+"/";
				scope.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.officeId+"/";
				resourceFactory.editOfficeTicketResource.update({'id': scope.ticketId},this.data,function(data){
				/*Upload.upload({
		          url: $rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.clientId+'/documents/'+routeParams.id+'/attachment', 
		          data: scope.data,
		          file: scope.file
		        }).then(function(data) {
		        	if (!scope.$$phase) {
		                scope.$apply();
		              }
		        	location.path('/viewclient/id/'
							+ routeParams.clientId);
		        });	*/
				 	location.path('/viewoffice/'+scope.officeId);
		        
				});
		        scope.reset123();
			};
			
						}
					});
	mifosX.ng.application.controller('EditOfficeTicketController', ['$scope','webStorage' ,'$routeParams', 'ResourceFactory', '$location', '$http','API_VERSION','$rootScope','Upload', mifosX.controllers.EditOfficeTicketController]).run(function($log) {
	    $log.info("EditOfficeTicketController initialized");
	  });
	
}(mifosX.controllers || {}));