(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditClientController: function(scope,webStorage, routeParams, resourceFactory, location, http,dateFilter,API_VERSION,$rootScope,$parse) {
        scope.offices = [];
        scope.date = {};
        scope.selfcareData = {};
        scope.clientId = routeParams.id;
        scope.date = {};
        scope.walletConfig = webStorage.get('is-wallet-enable');
        var data = webStorage.get("global_configuration");
		for(var i in data){
			if(data[i].name == "is-selfcareuser"){
				scope.isSelfCareUser = data[i].enabled;
			}
		}
		
        var clientData = webStorage.get('clientData');
        scope.clientAddInfo = webStorage.get("client-additional-data");
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
        scope.formData=[];
        scope.entryType;
        if(scope.imagePresent){
        scope.image=clientData.image;
        }
        scope.addresses = [];
        scope.addressTypeData=[];
        scope.propertyCodes = [];
        scope.propertyMaster = webStorage.get("is-propertycode-enabled");
       /* scope.groupNameDatas = [];*/
        scope.ClientCategoryDatas = [];
        scope.office={};
        scope.officeDetails=[];
        
        scope.addressTypeChangeFun = function(type){
        	scope.formData1 = {};
			for(var i in scope.addresses){
				if(type == scope.addresses[i].addressType){
					  scope.formData1=angular.copy(scope.addresses[i]); break;
				}
			}
			
		}   
        scope.officeDetailsFun = function(officeOptions, officeName){
        	scope.officeDetails = [];
        	for(var i in officeOptions){
        		if(scope.isCustomerUnderLco){
        			 if(officeOptions[i].officeType=="LCO"){
	        	    	  scope.officeDetails.push(officeOptions[i]);
        			 }
        		}else{
        			 scope.officeDetails.push(officeOptions[i]);
        		}
        		if(scope.officeDetails[i].name==officeName){
        			scope.officeModel=scope.officeDetails[i];
        		}
        		 if(scope.officeDetails.length>=7){
   	    		  break;}
        	}
        }
        scope.getData = function(query,officeName){
        	return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
        	      params: {
        	    	  		query: query
        	      		   }
        	    }).then(function(result){
        	    	scope.officeDetailsFun(result.data.officeOptions, officeName);
        	    if(scope.officeDetails.length == 0){
        	    	delete scope.formData.name;
        	    	delete scope.formData.nameDecorated;
        	    	delete scope.formData.externalId;
        	    	delete scope.formData.officeType;
        	    }
        	    return scope.officeDetails;
        	});
        };
        
      
        
        resourceFactory.client360resource.get({key:routeParams.key,value: routeParams.id,template : true}, function (data) {    
            scope.offices = data.officeData;
            scope.staffs = data.staffOptions; 
            scope.officeId=data.officeId;
            scope.officeType=data.officeType;
            scope.officePoId=data.officePoId;
            scope.formData.entryType = data.entryType;
            scope.entryType=data.entryType;
            scope.formData.groupName=data.groupName;
            scope.source = data.title;
            scope.idProofs= data.idProofs;
            
           
            scope.getData(data.officeName,data.officeName);
          /*  scope.clientCategoryDatas=data.ClientCategoryDatas;
            console.log(data.ClientCategoryDatas);
            scope.formData.clientCategory=scope.clientCategoryDatas[0].id;*/
            
            
            scope.ClientCategoryDatas=data.ClientCategoryDatas;
            
            for(var i=0;i<scope.ClientCategoryDatas.length;i++){
                if(scope.ClientCategoryDatas[i].categoryType==data.categoryType){
                	scope.clientCategory=scope.ClientCategoryDatas[i].id;
                }
            }
            
            for(var i=0;i<scope.idProofs.length;i++){
                if(scope.idProofs[i].mCodeValue==data.idKey){
                	scope.idKey=scope.idProofs[i].id;
                }
            }
           
           scope.addressTypeData=data.addressOptionsData;

           scope.addresses = angular.copy(data.datas); 
           scope.addressTypeChangeFun("PRIMARY");
           /*scope.addressTypeChangeFun("PRIMARY");*/
           /* scope.groupNameDatas=data.groupNameDatas;*/
            if(data.clientAdditionalData){
            scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
            scope.genderDatas= data.clientAdditionalData.genderDatas;
            scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
            scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
            scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
            scope.languagesDatas= data.clientAdditionalData.languagesDatas;
            }
    			
        /*for(var i=0;i<scope.groupNameDatas.length;i++){
	    	if(scope.groupNameDatas[i].groupName==data.groupName){
	    		scope.groupName=scope.groupNameDatas[i].groupName;
	    		scope.groupId=scope.groupNameDatas[i].id;
	    	}
	    }*/
        
       /* if(data.selfcare != undefined){
        	
        	scope.selfcareData = {
        		userName : data.selfcare.userName,
        		password : data.selfcare.password
        	};
        }*/
        
            scope.formData = {
            		
              firstname : data.firstname,
              lastname : data.lastname,
              middlename : data.middlename,
              active : data.active,
              accountNo : data.accountNo, 
              staffId : data.staffId,
              email : data.email,
              phone : data.phone,
              externalId : data.externalId,
              homePhoneNumber : data.homePhoneNumber,
              userName : data.userName,
              password : data.clientPassword,
              clientCategory : scope.clientCategory,
              title    : data.Title,
              idKey : scope.idKey,
              idValue : data.idValue
              
            };
            scope.formData1 ={
            		addressType : data.addressType,
                    addressNo : data.addressNo,
                    street : data.street,
                    city :data.city,
                    district : data.district,
                    state : data.state,
                    country : data.country,
                    zip : data.zip,
                     
            };
            
            if(data.clientAdditionalData){
            scope.formData.nationality = data.clientAdditionalData.nationalityId;
            scope.formData.gender = data.clientAdditionalData.genderId;
            scope.formData.jobTitle = data.clientAdditionalData.jobTitle;
            scope.formData.dateOfBirth = dateFilter(data.clientAdditionalData.dateOfBirth,'dd MMMM yyyy');
            scope.formData.preferredLang = data.clientAdditionalData.preferLanId;
            scope.formData.remarks = data.clientAdditionalData.remarks;
            scope.formData.idType = data.clientAdditionalData.customerIdentificationTypeId;
            scope.formData.idNumber = data.clientAdditionalData.customerIdentificationNumber;
            scope.formData.ageGroup = data.clientAdditionalData.ageGroupId;
            scope.formData.utsCustomerId = data.clientAdditionalData.utsCustomerId;
            scope.formData.financeId = data.clientAdditionalData.financeId;
            scope.formData.preferredCommunication = data.clientAdditionalData.preferCommId;
            if(data.clientAdditionalData.dateOfBirth){
             var dateOfBirth = dateFilter(data.clientAdditionalData.dateOfBirth,'dd MMMM yyyy');
            scope.date.dateOfBirth = new Date(dateOfBirth);
            }
            }
          
            var actDate = dateFilter(data.activationDate,'dd MMMM yyyy');
            scope.date.activationDate = new Date(actDate);
            if(data.active){
                scope.choice = 1;
            }
        
        });
        
        
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        
        };
        
        scope.lcoMovement=function(office){
        	this.formData.officeId=office.id;
        	this.formData.officeTransfer=scope.officeId+" to "+office.id;
        	this.formData.officePoId=office.poId;
        	if(office.officeType=="LCO"&&scope.officeType=="LCO"){
        		scope.formData.lcoMovement=true;
        	}
        };
        
      /*  scope.clientAndclientServicePoIds = function(){
	    	   var clientData = webStorage.get('clientData');
	    	   scope.formData.clientPoId = clientData.poId;
	    	   
	       }*/
        
        scope.submit = function() {
        	/* scope.clientAndclientServicePoIds();*/
	         
        	if(this.formData.officeId==null){
        		this.formData.officeId=scope.officeId;
        		this.formData.officePoId=scope.officePoId;
        	}
        	 this.formData.title=scope.source;
             this.formData.clientCategory=scope.formData.clientCategory;
             this.formData.groupId=scope.groupId;
             this.formData.locale = scope.optlang.code;
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.addressType=this.formData1.addressType;
             this.formData.addressNo = this.formData1.addressNo;
             this.formData.street = this.formData1.street;
             this.formData.city=this.formData1.city;
             this.formData.district = this.formData1.district;
             this.formData.state = this.formData1.state;
             this.formData.country=this.formData1.country;
             this.formData.zip=this.formData1.zip;
             
             
         	 delete this.formData.addressKey;
         	 delete this.formData.addressTypeId;
         	 delete this.formData.cityData;
     		 delete this.formData.datas;
     		 delete this.formData.zip;
             if(scope.date.activationDate){this.formData.activationDate = dateFilter(scope.date.activationDate,'dd MMMM yyyy');}
             if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
             resourceFactory.clientResource.update({'clientId': routeParams.id},this.formData,function(data){
             
              if (scope.file) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  location.path('/viewclient/id/'+data.resourceId);
                });
              } else{
                location.path('/viewclient/id/' + data.resourceId);
              }
          });
        };
     }
  });
  mifosX.ng.application.controller('EditClientController', ['$scope','webStorage', '$routeParams', 'ResourceFactory', '$location', '$http','dateFilter','API_VERSION','$rootScope','$parse', mifosX.controllers.EditClientController]).run(function($log) {
    $log.info("EditClientController initialized");
  });
}(mifosX.controllers || {}));
/*(function(module) {
	  mifosX.controllers = _.extend(module, {
	    EditClientController: function(scope,webStorage, routeParams, resourceFactory, location, http,dateFilter,API_VERSION,$rootScope,$upload,$parse) {
	        scope.offices = [];
	        scope.date = {};
	        scope.selfcareData = {};
	        scope.clientId = routeParams.id;
	        scope.date = {};
	        scope.walletConfig = webStorage.get('is-wallet-enable');
	        var data = webStorage.get("global_configuration");
			for(var i in data){
				if(data[i].name == "is-selfcareuser"){
					scope.isSelfCareUser = data[i].enabled;
					console.log(scope.isSelfCareUser);
				}
			}
	        
	        var clientData = webStorage.get('clientData');
	        scope.clientAddInfo = webStorage.get("client-additional-data");
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
	        scope.formData=[];
	        scope.entryType;
	        if(scope.imagePresent){
	        scope.image=clientData.image;
	        }
	        
	    	
	        
	        
	    	
	        
	        
	        
	        resourceFactory.client360resource.get({key:routeParams.key,value: routeParams.id,template : true}, function (data) {    
        	 
	            scope.offices = data.officeData;
	            scope.staffs = data.staffOptions; 
	            scope.officeId = data.officeId;
	            scope.formData.entryType = data.entryType;
	            scope.entryType=data.entryType;
	            scope.formData.groupName=data.groupName;
	            scope.source = data.title;
	            scope.groupNameDatas=data.groupNameDatas;
	            
	            scope.addressTypeData=data.addressOptionsData;
                scope.cityDatas=data.cityData;
               // scope.oldProperty = data.datas[0];
                scope.addresses = angular.copy(data.datas); 
                scope.addressTypeChangeFun("PRIMARY");
	            
	            
	            if(data.clientAdditionalData){
	            scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
	            scope.genderDatas= data.clientAdditionalData.genderDatas;
	            scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
	            scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
	            scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
	            scope.languagesDatas= data.clientAdditionalData.languagesDatas;
	            }
	    			
	        for(var i=0;i<scope.groupNameDatas.length;i++){
		    	if(scope.groupNameDatas[i].groupName==data.groupName){
		    		scope.groupName=scope.groupNameDatas[i].groupName;
		    		scope.groupId=scope.groupNameDatas[i].id;
		    	}
		    }
	        
	        if(data.selfcare != undefined){
	        	
	        	scope.selfcareData = {
	        		userName : data.selfcare.userName,
	        		password : data.selfcare.password
	        	};
	        }
	            scope.clientCategoryDatas=data.clientCategoryDatas;
	            scope.clientCategoryDatas = [];
	            for(var i=0;i<scope.clientCategoryDatas.length;i++){
	                if(scope.clientCategoryDatas[i].categoryType==data.categoryType){
	                    scope.clientCategory=scope.clientCategoryDatas[i].id;
	                }
		    
		    }

	            scope.formData = {
	              firstname : data.firstname,
	              lastname : data.lastname,
	              middlename : data.middlename, 
	              active : data.active,
	              accountNo : data.accountNo, 
	              staffId : data.staffId,
	              email : data.email,
	              phone : data.phone,
	              externalId : data.externalId,
	              homePhoneNumber : data.homePhoneNumber,
	              userName : data.userName,
	              password : data.clientPassword,
	              addressOptionsData :scope.addressTypeData,
	              cityData : scope.cityDatas,
	            };
	            if(data.clientAdditionalData){
	            scope.formData.nationality = data.clientAdditionalData.nationalityId;
	            scope.formData.gender = data.clientAdditionalData.genderId;
	            scope.formData.jobTitle = data.clientAdditionalData.jobTitle;
	            scope.formData.dateOfBirth = dateFilter(data.clientAdditionalData.dateOfBirth,'dd MMMM yyyy');
	            scope.formData.preferredLang = data.clientAdditionalData.preferLanId;
	            scope.formData.remarks = data.clientAdditionalData.remarks;
	            scope.formData.idType = data.clientAdditionalData.customerIdentificationTypeId;
	            scope.formData.idNumber = data.clientAdditionalData.customerIdentificationNumber;
	            scope.formData.ageGroup = data.clientAdditionalData.ageGroupId;
	            scope.formData.utsCustomerId = data.clientAdditionalData.utsCustomerId;
	            scope.formData.financeId = data.clientAdditionalData.financeId;
	            scope.formData.preferredCommunication = data.clientAdditionalData.preferCommId;
	            if(data.clientAdditionalData.dateOfBirth){
	             var dateOfBirth = dateFilter(data.clientAdditionalData.dateOfBirth,'dd MMMM yyyy');
	            scope.date.dateOfBirth = new Date(dateOfBirth);
	            }
	            }
	          
	            var actDate = dateFilter(data.activationDate,'dd MMMM yyyy');
	            scope.date.activationDate = new Date(actDate);
	            if(data.active){
	                scope.choice = 1;
	            }
	           
	        });
	       

	        scope.onFileSelect = function($files) {
	          scope.file = $files[0];
	        
	        };
	        
	        
	        scope.getPropertyCode = function(query){
	        	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(res){   
	        	    	 scope.propertyCodes=res.data;				 
	        	      return scope.propertyCodes;
	        	    });
             };   
         
             
             
             
            scope.getPropertyDetails=function(propertyCode){

            if(propertyCode!=undefined){
        		
           if(propertyCode == scope.oldProperty.addressNo){
    		 console.log("old:"+propertyCode);
    		 scope.formData.street = scope.oldProperty.street;
    		 scope.formData.city = scope.oldProperty.city;
    	     scope.formData.state = scope.oldProperty.state;
			 scope.formData.country = scope.oldProperty.country;
			 scope.formData.zip = scope.oldProperty.zip;
				 
        	 }
        		
        	for(var i in scope.propertyCodes){
        		if(scope.propertyCodes[i].propertyCode == propertyCode){
        			 scope.formData.street = scope.propertyCodes[i].street;
        			 scope.formData.city  =  scope.propertyCodes[i].precinct; 
        			 scope.formData.state = scope.propertyCodes[i].state;
        			 scope.formData.country = scope.propertyCodes[i].country;
        			 scope.formData.zip = scope.propertyCodes[i].poBox;
        			 scope.formData.district = scope.propertyCodes[i].district;
        			 break;
        		}else{
        			delete scope.formData.street;
        			delete scope.formData.city;
        			delete scope.formData.state;
        			delete scope.formData.country;
        			delete scope.formData.zip;
        			delete scope.formData.district;
        		}
        	}
        	}else{
        		delete scope.formData.street;
    			delete scope.formData.city;
    			delete scope.formData.state;
    			delete scope.formData.country;
    			delete scope.formData.zip;
    			delete scope.formData.district;
        	}
        };
        
        
	        
	        
	        scope.submit = function() {
		         this.formData.officeId=scope.officeId;
		     	 this.formData.title=scope.source;
	             this.formData.clientCategory=scope.clientCategory;
	             this.formData.groupId=scope.groupId;
	             this.formData.locale = scope.optlang.code;
	             this.formData.dateFormat = 'dd MMMM yyyy';
	             this.formData.zipCode=scope.zip;
	             
	             delete this.formData.addressKey;
	             delete this.formData.cityData;
				 delete this.formData.datas;
				 delete this.formData.addressTypeId;
				 delete this.formData.zip;
				 delete this.formData.addressOptionsData;
	             if(scope.date.activationDate){this.formData.activationDate = dateFilter(scope.date.activationDate,'dd MMMM yyyy');}
	             if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
	             resourceFactory.clientResource.update({'clientId': routeParams.id},this.formData,function(data){
	             
	              if (scope.file) {
	            	  $upload.upload({
	                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
	                  data: {},
	                  file: scope.file
	                }).then(function(imageData) {
	                  // to fix IE not refreshing the model
	                  if (!scope.$$phase) {
	                    scope.$apply();
	                  }
	                  location.path('/viewclient/id/'+data.resourceId);
	                });
	              } else{
	                location.path('/viewclient/id/' + data.resourceId);
	              }
	          });
	        };
	     }
	  });
	  mifosX.ng.application.controller('EditClientController', ['$scope','webStorage', '$routeParams', 'ResourceFactory', '$location', '$http','dateFilter','API_VERSION','$rootScope','Upload','$parse', mifosX.controllers.EditClientController]).run(function($log) {
	    $log.info("EditClientController initialized");
	  });
	}(mifosX.controllers || {}));
*/