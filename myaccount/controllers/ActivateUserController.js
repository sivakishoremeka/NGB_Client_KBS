ActivateUserController = function(scope,RequestSender,rootScope,routeParams,sessionManager,authenticationService,$modal,
		$filter,localStorageService) {

		
		
		//default variables for this controller
		  rootScope.isRegClientProcess = true;
		  
		//declaration of formData
		  scope.formData = {};
		  var configDeviceAgreeType = {};
		  var passportObjectValue={};
		  scope.clientData = {};
		  scope.isLocation = false;
		  
		  scope.showCity = false;
          scope.location = function(latitude , longitude){
              scope.latitude = latitude;
              scope.longitude = longitude;
              console.log(scope.latitude+"_"+scope.longitude);
          };
          
          
		//function called when  clicking on Login link
		  scope.goToSignInPageFun = function(){
			  	rootScope.currentSession = sessionManager.clear();
		   };
		  
		   //getting the key value form routeParams
		   var uniqueReference ;
		   if(routeParams.uniqueReference.includes("@")){
			   scope.existedEmail = routeParams.uniqueReference || "";
			   uniqueReference = routeParams.uniqueReference || "";
			   scope.uniqueReferenceNo = uniqueReference;
		   }else{
			   scope.formData.mobileNo = routeParams.uniqueReference || "";
			   uniqueReference = routeParams.uniqueReference || "";
			   scope.uniqueReferenceNo = uniqueReference;
		   }
		   
		   
		   var actualKey = routeParams.registrationKey || "";
		  //adding jsondata for selfcare activation updation request
		  scope.registrationKey = {'verificationKey' : actualKey.slice(0, 27),
		  	  						'uniqueReference' : uniqueReference};
		  
		  
		  // getting data from local Storage 
		  var clientData = localStorageService.get("ClientData");
		  if(clientData!=undefined){
			  console.log(JSON.stringify(clientData));
			  scope.displayName =clientData[0].name;
			  scope.clientData.authToken = clientData[0].authToken;
			  scope.clientData.generatedKey = clientData[0].generatedKey;
			  scope.clientData.returnUrl = clientData[0].returnUrl;
			  
		  }
		  
		  
		  authenticationService.authenticateWithUsernamePassword(function(data){
		  	 	//sending selfcare activation updation request
			  rootScope.currentSession= {user :'selfcare'};
		  		RequestSender.registrationResource.update(scope.registrationKey,function(successData) {
		  			scope.isRegPage=true;
	  					  
		  			//getting list of city data
		  			scope.cities = [];
	  				RequestSender.addressTemplateResource.get(function(data) {
	  					scope.cities=data.cityData;
	  					  
	  					//getting data from c_configuration for isRegister_plan and isisDeviceEnabled
	  					 var configurationDatas = [];var registrationListing = {};
	  					  RequestSender.configurationResource.get({tenant:selfcareModels.tenantId},function(data){
	  						
	  						configurationDatas = data.globalConfiguration;
	  						for(var i in configurationDatas){
	  							 if(configurationDatas[i].name==selfcareModels.isRedemption){
	  								 
	  								  scope.isConfigRedeem = configurationDatas[i].enabled;
	  								  if(!scope.isConfigRedeem) scope.voucherNumber = "A123";
	  								  
	  						      }
	  							  if(configurationDatas[i].name==selfcareModels.registrationRequiresDevice){
	  						    	  
	  								  scope.isDeviceEnabled = configurationDatas[i].enabled;
	  								  
	  							  }
	  							  if(configurationDatas[i].name== selfcareModels.deviceAgrementType){
	  								  
	  								  if(configurationDatas[i].value =='SALE'){
	  									configDeviceAgreeType.deviceAgrementType='SALE';
	  									scope.isCPE_TYPESale = true;
	  								  }else if(configurationDatas[i].value == 'OWN'){
	  									configDeviceAgreeType.deviceAgrementType='OWN';
	  									scope.isCPE_TYPEOwn = true;
	  								  }else{
	  									scope.isCPE_TYPEOwn = false;
										scope.isCPE_TYPESale = false;
	  								  }
	  							  }
	  							  if(configurationDatas[i].name =='registrationListing'){
	  								passportObjectValue=JSON.parse(configurationDatas[i].value);
	  								if(passportObjectValue.passport){
	  									scope.formData.passport = "123456789"
	  								}
	  							  }
	  							  
	  							if(configurationDatas[i].name=='register-plan'){
	  								 var planname = {};
	  								planname = JSON.parse(configurationDatas[i].value);
	  								console.log(JSON.stringify(planname));
	  								console.log("laxman");
	  								scope.plan = planname.planName;
	  								console.log(scope.plan);
	  							}
	  							  
	  						  }
	  						  
	  					  });
	  					});
	
		        },function(errorData){
		      	 if(errorData.data.errors[0].userMessageGlobalisationCode == "error.msg.billing.generatedKey.already.verified"){
		      		 scope.isAlreadyActive=true;
         	  	  }
		        });
		  });
		  
		//national Id validation
		     scope.nationalIdvalue = true;
			 scope.nationalIdValidationFun = function(id){
				 if(id){
				 scope.nationalIdvalue = Kennitala.validate(id);
				 }
			 };
		  		  
		 //function called when entering the device name 
			 var itemDetails = {};
		  scope.getDataForMacId = function(query){
			  if(query){
				  var str = "";
				  var containsColon = query.match(":");
				  if(containsColon){
					  str = query;
				  }else{
					  str += query[0]+query[1]+":";
					  for(var val=3;val<=query.length-1;val++){
						  if(val == query.length-1){
							  break;
						  }
						  if(val%2 == 0)
							  str += query[val]+":";
						  else
							  str +=query[val];
					  }
				  }
				  RequestSender.gettingSerialNumbers.query({query:query},function(data){
					  itemDetails = {};
					  itemDetails = data;
					  if(itemDetails.length == 0){
						  scope.isInvalidMacId = true;
					  }
					  else if(itemDetails.length >=1){
						  scope.isInvalidMacId = false;
				          scope.isDisabledSerialNumber = true;
		            		 if(query.toLowerCase() == itemDetails[0].serialNumber.toLowerCase()){
		            			 scope.provisioningSerialNumber =  itemDetails[0].provisioningSerialNumber;
		            		 }else{
		            			 scope.isInvalidMacId = true;
		            			 delete scope.provisioningSerialNumber;
		            		 }
					  }
				  });
			  }else{
				  scope.isDisabledSerialNumber = false;
				  scope.isInvalidMacId = false;
				  delete scope.provisioningSerialNumber;
			  }
		  };
		  

		  scope.getDataForSerialNumber = function(query){
			  if(query){
				  var str = "";
				  var containsColon = query.match(":");
				  if(containsColon){
					  str = query;
				  }else{
					  str += query[0]+query[1]+":";
					  for(var val=3;val<=query.length-1;val++){
						  if(val == query.length-1){
							  break;
						  }
						  if(val%2 == 0)
							  str += query[val]+":";
						  else
							  str +=query[val];
					  }
				  }
				  RequestSender.gettingSerialNumbers.query({query:query},function(data){
					  itemDetails = {};
					  itemDetails = data;
					  if(itemDetails.length == 0){
						  scope.isInvalidSerialNumber = true;
					  }
					  else if(itemDetails.length >=1){
						  scope.isInvalidSerialNumber = false;
						  scope.isDisabledMacId = true;
		            		 if(query.toLowerCase() == itemDetails[0].provisioningSerialNumber.toLowerCase()){
		            			 	scope.formData.deviceNo =  itemDetails[0].serialNumber;
		            		 }else{
		            			 scope.isInvalidSerialNumber = true;
		            			 delete scope.formData.deviceNo;
		            		 }
					  }
				  });
			  }else{
				  scope.isDisabledMacId = false;
				  scope.isInvalidSerialNumber = false;
				  delete scope.formData.deviceNo;
			  }
		  };
			    
		  
		
		   
		   //getting state and country while changing the city
			  scope.getStateAndCountry=function(city){
				  scope.formData.zipcode = city;
				//sending request for getting state and country while changing the city
				  RequestSender.addressTemplateResource.get({city :city}, function(data) {
					  scope.formData.state = data.state;
					  scope.formData.country = data.country;
				  },function(errorData) {
					  delete scope.formData.state ;
					  delete scope.formData.country;
				  });
			  };
		  
			  function  approve($scope, $modalInstance) {
      	    	  rootScope.currentSession = sessionManager.clear();
      	    	  rootScope.popUpMsgs.push({
      	    		  'image' : '../images/info-icon.png',
      	    		  'names' : [{'name' : 'title.account.activated'},
      	    		             {'name' : 'title.account.activated.userpwd'},
      	    		             {'name' : 'title.login.msg'}]
      	    	      });
      		
		      		$scope.approve = function () { 
		      			
		      			$modalInstance.dismiss('cancel');
		      		 };
			  	} 
			 var valid = false;
			 scope.voucherNumberValidationFun = function(id){
					 if(id){
						 RequestSender.VoucherResource.query({pinNumber:id},function(data){
							 if(data.length == 1){
								 scope.isInValidVoucher = false;
								 var expiryDate  = $filter('DateFormat')(data[0].expiryDate);
								 var todayDate	 = $filter('DateFormat')(new Date());
								 if (new Date(expiryDate) < new Date(todayDate)) {
									 delete scope.voucherNumber;
									 scope.isDateExpired = true;
								 }else{
									 scope.isDateExpired = false;
								 }
							 }else{
								 scope.isDateExpired = false;
								 scope.isInValidVoucher = true;
								 delete scope.voucherNumber;
								 scope.voucher = id;
							 }
							 valid = !scope.isInValidVoucher && !scope.isDateExpired; 
						 });
					 }
				 };
				 
				 scope.selectaddress = function(address){
					  if(address=="city"){
						  scope.showCity=true;
						  scope.isLocation= false;
					  }else if(address=="location")
						  {
						  scope.showCity=false;
						  scope.isLocation= true;
						  geoLocation();
						  }
				 };
				 
				 
				 
				 
				 
		  		
			//function called when clicking on Register button in Registration Page
			scope.registerBtnFun =function(){
				
				 //deviceNo added to form data when isDeviceEnabled true
					 
					 
					 if(scope.formData.homePhoneNumber){
						 scope.clientData.homePhoneNumber = scope.formData.homePhoneNumber;
					 }
					 if((scope.formData.password) !=null){
						 scope.clientData.password = scope.formData.password;
					 }
					 if(scope.isConfigPassport){
						 scope.clientData.passport = scope.formData.passport;
					 }
					 if(scope.isConfigRedeem){
						 scope.clientData.pinNumber = scope.voucherNumber;
					 }
			         var name_array = new Array();
			         console.log(scope.displayName);
					 name_array = (scope.displayName.split(" "));
			            
			          scope.clientData.firstname = name_array.shift();
			          scope.clientData.fullname = name_array.join(' ');
			            if(scope.clientData.fullname == ""){
			            	scope.clientData.fullname=".";
			            }
				            
					 scope.clientData.address 				= scope.formData.address;
					 scope.clientData.nationalId			= scope.formData.nationalId;
					 scope.clientData.zipCode 				= scope.formData.zipcode;
					 scope.clientData.city 					= scope.formData.city;
					 scope.clientData.phone 				= parseInt(scope.formData.mobileNo); 
					 scope.clientData.email 				= scope.existedEmail;
					 scope.clientData.deviceAgreementType 	= configDeviceAgreeType.deviceAgrementType;
					 scope.clientData.uniqueReferenceNo     = scope.uniqueReferenceNo;
					 scope.clientData.fromSelfcare          = true;
					 if(scope.latitude!=undefined && scope.longitude!=undefined){
						 scope.clientData.lat = scope.latitude;
						 scope.clientData.long = scope.longitude;
					 }
					 console.log(scope.clientData.uniqueReferenceNo);
					 //  As of now we are assigning mobile number to deviceId for own case
					 if(scope.isCPE_TYPEOwn){
						 if(scope.formData.deviceNo==undefined||scope.formData.deviceNo==null){
							 scope.clientData.device = scope.clientData.phone;
							 scope.clientData.deviceName = scope.clientData.phone;
						 }else{
							 scope.clientData.device = scope.formData.deviceNo;
							 scope.clientData.deviceName = scope.formData.deviceNo;
						 }
					 }
					 	
					 rootScope.popUpMsgs = [];rootScope.infoMsgs = [];
					 RequestSender.authenticationClientResource.save(scope.clientData,function(data){
							 
							 if(scope.clientData.password) {
								 rootScope.currentSession = sessionManager.clear();
								 rootScope.infoMsgs.push({
									 'image' : '../images/info-icon.png',
									 'names' : [{'name' : 'title.account.activated'},
									            {'name' : 'title.login.msg'}]
								 });
							 }else{
								 $modal.open({
									 templateUrl: 'messagespopup.html',
									 controller: approve,
									 resolve:{}
								 });
							 }
		      	      
							 
							 
							
								 console.log("Login Method")
								 rootScope.$emit("LoginMethod", {});
							
					 });
		};
    };
    
selfcareApp.controller('ActivateUserController', ['$scope',
                                                  'RequestSender',
                                                  '$rootScope',
                                                  '$routeParams',
                                                  'SessionManager',
                                                  'AuthenticationService',
                                                  '$modal',
                                                  '$filter',
                                                  'localStorageService',
                                                  ActivateUserController]);
