(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService,location,webStorage,$uibModal,TENANT,$rootScope,route,http, API_VERSION) {
     
      scope.formData = {};
      scope.clients = [];
     /* scope.Advancedsearchs = [];*/
      scope.config = {};
      scope.allDatas = [];
      //scope.PermissionService = PermissionService;
      scope.pageNo = 1;
      scope.newClients = 0;
      scope.activeClients = 0;
      scope.InActiveClients = 0;
      scope.PendingClients = 0;
      scope.totalPages = 1;
      scope.status = 'ALL';
      scope.isPasswordShow = false;
      scope.isOnline = " ";
      scope.config = webStorage.get('uiConfigData').clientListing || ""; 
      scope.configValues = webStorage.get('uiConfigData');
      /*scope.clientconfig = false;
      scope.clientconfigfalse = false;*/
      
      scope.IsClientIndividual =  webStorage.get('uiConfigData').IsClientIndividual;
      /*scope.IsGridEnable =  webStorage.get('uiConfigData').IsGridEnable;
      if(scope.IsGridEnable=='true'){
    	  scope.clientconfig = function(){
    		  return scope.clientconfig;
    	  };
    	  }else{
    		  scope.clientconfigfalse = function(){
    		  	return scope.clientconfigfalse;
    	  	  }; 
    	  }*/
      
      /**
       * @default
       * we call this function from below
       * scope.clients = paginatorService.paginate(fetchFunction, 14);
       * */
        
      	
      	scope.configs = [];
      	/*if(scope.IsGridEnable=='false'){
		  	resourceFactory.configurationResource.get({tenant:TENANT},function(data) {
		  		scope.clientConfiguration = data.clientConfiguration;
		  	});
      	}*/
      
      var passwordSetToStar = function(){
    	  for (var i in scope.allDatas){
		        	
         		if(scope.allDatas[i].clientPassword != undefined && scope.allDatas[i].clientPassword.length>0){
         			var stars = "";
         			for (var k in scope.allDatas[i].clientPassword){
 				        	if(k>=0 && k<scope.allDatas[i].clientPassword.length){
 				        		
 				        		stars += "*";
 				        	}
 				    }
         			if(scope.isPasswordShow){
         				scope.allDatas[i].password = scope.allDatas[i].clientPassword;
         			}
         			scope.allDatas[i].clientPassword = stars;
         			// console.log(scope.allDatas[i].clientPassword);
         		}
 		    }
      };
      
      if(scope.config != null && scope.config.password == 'true'){
 		 scope.isPasswordShow = true;
 	  }
      
      /*if(PermissionService.showMenu('SHOW_PASSWORD')){
    	  if(scope.config != null && scope.config.password == 'true'){
    		 scope.isPasswordShow = true;
    	  }
      }*/
      
	      var fetchFunction = function(offset, limit, callback) {
/*	    	  resourceFactory.retrieveTransactionsOnClientsResource.getTransactions({offset: offset, limit: limit} , function(data){
	    	       	scope.transactionalClients = data.totalFilteredRecords;
	    	       	scope.allDatas = data.pageItems;
	    	       	if(scope.transactionalClients%30 == 0)	
	    	       		scope.totalPages = scope.transactionalClients/30;
	    	       	else
	    	       		scope.totalPages = Math.floor(scope.transactionalClients/30)+1;
	    	       	
	    	       	if(scope.config.password == 'true'){
	    	       		passwordSetToStar();
	    	       	}
	    	       	
	    	       	callback(data);
	    	       });
*/	    	  
	    	  
	    	  resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , function(data){
	        	scope.totalClients = data.totalFilteredRecords;
	        	scope.allDatas = data.pageItems;
	        	if(scope.totalClients%25 == 0)	
	        		scope.totalPages = scope.totalClients/25;
	        	else
	        		scope.totalPages = Math.floor(scope.totalClients/25)+1;
	        	
	        	if(scope.config.password == 'true'){
	        		passwordSetToStar();
	        	}
	        	
	        	callback(data);
	        });
	      };
	      
	      
	      /*resourceFactory.runReportsResource.get({reportSource: 'ClientCounts',genericResultSet:false} , function(data) {
	    	  for(var i in data){
	    		  if(data[i].status == 'New')
	    			  scope.newClients = data[i].ccounts;
	    		  if(data[i].status == 'Active')
	    			  scope.activeClients = data[i].ccounts;
	    		  if(data[i].status == 'Inactive')
	    			  scope.InActiveClients = data[i].ccounts;
	    		  if(data[i].status == 'Pending')
	    			  scope.PendingClients = data[i].ccounts;
	    	  }
	    	  scope.totalClients = scope.newClients+scope.activeClients
	    	  					   +scope.InActiveClients+scope.PendingClients;
	    	  if(scope.totalClients%15 == 0)
	    		  scope.totalPages = scope.totalClients/15;
	    	  else
	    		  scope.totalPages = Math.floor(scope.totalClients/15)+1;
	      });*/
      
       
      scope.nextPageNo = function(){
    	  if(scope.pageNo < scope.totalPages)
    	   scope.pageNo +=1;
      };
      
      scope.previousPageNo = function(){
    	  if(scope.pageNo >1)
    	  scope.pageNo -=1;
      };
      
      scope.lastPageNo = function(){
    	  scope.pageNo =scope.totalPages;
      };
      
      scope.firstPageNo = function(){
    	  scope.pageNo =1;
      };
      
      scope.routeTo = function(clientId){
          location.path('/viewclient/id/'+ clientId);
        };
        
    	scope.routeToGroup = function(name){
            location.path('/viewgroupdetails/'+ name);
       };
       /*if(scope.IsGridEnable=='false'){ 
    	   //if(PermissionService.showMenu('READ_CLIENT'))
    		   scope.clients = paginatorService.paginate(fetchFunction, 24);
       }*/
      
       /*if($rootScope.hasPermission('LIST_CLIENTS')){
    	   scope.clients = paginatorService.paginate(fetchFunction, 30);
       };*/
       
       if($rootScope.hasPermission('LIST_CLIENTS')){
    	   resourceFactory.clientTemplateResource.get(function(data) {
               //scope.offices = data.officeOptions;
               //scope.formData.officeId = data.officeId;
               scope.cities=data.addressTemplateData.cityData;
               scope.clientCategoryDatas=data.clientCategoryDatas;
               scope.groupNameDatas = data.groupNameDatas;
               /*scope.formData.clientCategory=scope.clientCategoryDatas[0].id;*/
               scope.configurationProperty=data.loginConfigurationProperty.enabled;
               scope.preferences = data.preferences;
               scope.idProofs=data.idProofs;
               
               
               if(data.clientAdditionalData){
               scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
               scope.genderDatas= data.clientAdditionalData.genderDatas;
               scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
               scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
               scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
               scope.languagesDatas= data.clientAdditionalData.languagesDatas;
               }
               
               
           });
       };
       
       
      scope.search123 = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText } , function(data){
        	  scope.allDatas = data.pageItems;
        	  if(scope.config.password == 'true'){
        		  passwordSetToStar();
 	          }
 	        	callback(data);
          }); 
      };
       
       scope.search = function(filterText) {
    	   scope.filterText = filterText;
        scope.clients = paginatorService.paginate(scope.search123, 24);
       };
       
       /**
        * @ Changing status
        * */
       scope.searchSource=function(sourceStatus){
    	   /**
    	    * This function used for specific status
    	    * like New,Active... etc
    	    * */
    	   scope.searchSources123 = function(offset, limit, callback) {
    			   resourceFactory.clientResource.getAllClients({offset: offset, limit: limit,status: sourceStatus} , function(data){
       	        	scope.totalClients = data.totalFilteredRecords;
       	        	scope.allDatas = data.pageItems;
       	        	if(scope.totalClients%25 == 0)	
       	        		scope.totalPages = scope.totalClients/25;
       	        	else
       	        		scope.totalPages = Math.floor(scope.totalClients/25)+1;
       	        	
       	        	if(scope.config.password == 'true'){
       	        		passwordSetToStar();
       	        	}
       	        	callback(data);
       	        });
    	   };
    	   
    	   if(sourceStatus == 'ALL'){
			   scope.clients = paginatorService.paginate(fetchFunction, 24);
		   }else{
			   scope.clients = paginatorService.paginate(scope.searchSources123, 24);
		   }
    	   
       };
       
       scope.routeToCheckOnline=function(clientNameForOnlineUser,clientId){
    	   if(clientNameForOnlineUser == undefined){
    		   scope.clientNameForOnlineUser = '';
    	   }else{
    		   scope.clientNameForOnlineUser = clientNameForOnlineUser;
    	   }
    	   resourceFactory.radiusOnlineUser.get({checkOnline:true,userName:scope.clientNameForOnlineUser},function(data) {
    		   scope.checkOnlineClient = data.pageItems;
    		 //  $scope.count = $scope.checkOnlineClient[0].count;
    		   console.log(scope.checkOnlineClient[0].count);
    		   scope.onlineUserName = scope.clientNameForOnlineUser;
    		   scope.checkOnlineClient[0].count > 0 ?scope.isOnline = "Online"+clientId:scope.isOnline = "Offline"+clientId;
           });
    	
       };
       
       scope.columnName="account_no";
       scope.searchClient= function(name, value){
    	   scope.searchedClient = null;
    	   resourceFactory.searchClientDataResource.get({columnName:name,columnValue: value } , function(data){
	  			if(data.id !=null){
	  				scope.searchedClient=data;
	  			}else{
	  				$uibModal.open({
	  	                  templateUrl: 'searchClient.html',
	  	                  controller: searchClientCtrl,
	  	                  resolve:{}
	  	              });
	  			}
	  			
	  		},function(errors) {
                 if(errors.data.errors!=null){
                    scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                  }else{
                      scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                  }
                });
       };
       
       scope.getStateAndCountry=function(city,type){
      	 
	      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
	      		 if(type == 'primary'){
	      			scope.state = data.state;
	          		scope.country = data.country;
	          		scope.district = data.district;
	      		 }else{
	      			 scope.billingData.state = data.state;
	      			 scope.billingData.country = data.country;
	      			 scope.billingData.district = data.district; 
	      		 }
	      	  });
       };
       
       
       
       scope.officeDetailsFun = function(officeOptions){
       	scope.officeDetails = [];
       	for(var i in officeOptions){
       		if(scope.isCustomerUnderLco){
       			 if(officeOptions[i].officeType=="LCO"){
	        	    	  scope.officeDetails.push(officeOptions[i]);
       			 }
       		}else{
       			 scope.officeDetails.push(officeOptions[i]);
       		}
       		 if(scope.officeDetails.length>=7){
  	    		  break;}
       	}
       }
       
       scope.getData = function(query){
       	return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
       	      params: {
       	    	  		query: query
       	      		   }
       	    }).then(function(result){
       	    	scope.officeDetailsFun(result.data.officeOptions);
       	    if(scope.officeDetails.length == 0){
       	    	delete scope.formData.name;
       	    	delete scope.formData.nameDecorated;
       	    	delete scope.formData.externalId;
       	    	delete scope.formData.officeType;
       	    }
       	    return scope.officeDetails;
       	});
       };
       
       scope.groupByOffice = function(externalId, name){
       	return externalId+"--"+name;
       };
       
       scope.isVisible = "false";
       scope.advancesearch = function(){
    	   scope.isVisible = scope.isVisible ? false : true;
       };
       
       scope.clientFetchFunction = function(offset, limit, callback){
    	   resourceFactory.clientResource.getAllClients({firstName: scope.formData.firstname,lastName: scope.formData.lastname,
     		  email: scope.formData.email,phone: scope.formData.phone,city: scope.city,officeId: scope.formData.officeId,
     		  categoryType: scope.formData.clientCategory,externalId: scope.formData.externalId,offset: offset, limit: limit},function(data){
   	        	scope.totalClients = data.totalFilteredRecords;
   	        	scope.allDatas = data.pageItems;
   	        	if(scope.totalClients%15 == 0)	
   	        		scope.totalPages = scope.totalClients/15;
   	        	else
   	        		scope.totalPages = Math.floor(scope.totalClients/15)+1;
   	        	callback(data);
     	  });
       }
       
      scope.advancedSearchSubmit = function(){
    	  /*resourceFactory.clientResource.getAllClients({firstName: scope.formData.firstname,lastName: scope.formData.lastname,
    		  email: scope.formData.email,phone: scope.formData.phone,city: scope.city,officeId: scope.formData.officeId,
    		  categoryType: scope.formData.clientCategory,externalId: scope.formData.externalId},function(data){
  	        	scope.totalClients = data.totalFilteredRecords;
  	        	scope.clients = data.pageItems;
  	        	console.log(scope.clients);
  	        	if(scope.totalClients%25 == 0)	
  	        		scope.totalPages = scope.totalClients/25;
  	        	else
  	        		scope.totalPages = Math.floor(scope.totalClients/25)+1;
  	        	
  	        	if(scope.config.password == 'true'){
  	        		passwordSetToStar();
  	        	}
    	  });*/
    	  scope.clients = paginatorService.paginate(scope.clientFetchFunction, 25);
      }
      
      /*This is used to load the data while clicking on customers tab, next and previous buttons #Rakesh#*/
      scope.clients = paginatorService.paginate(scope.clientFetchFunction, 25);
      
      scope.clear = function() {
    	  
    	 delete scope.formData.firstname;
      	 delete scope.formData.lastname;
      	 delete scope.formData.email;
  		 delete scope.formData.phone;
  		 delete scope.city;
  		 delete scope.formData.officeId;
 		 delete scope.formData.clientCategory;
 		 delete scope.formData.externalId;
    	  
      };
   
       
   }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService','$location','webStorage','$uibModal','TENANT','$rootScope','$route','$http', 
                                                        'API_VERSION',mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
