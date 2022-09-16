AddEventsController = function(scope,RequestSender,location,localStorageService,modal,rootScope, filter) {
		  
		  scope.vodEventScreen 		= true;
		  scope.eventDetailsPreview = false;
		  scope.isRedirecting 		= false;
		  var encrytionKey 			= selfcareModels.encriptionKey;
		  scope.optlang 			= rootScope.localeLangCode;
		  
		//getting Payment Gateway names form constans.js
			var  kortaPG			=	paymentGatewayNames.korta || "",
				 dalpayPG			=	paymentGatewayNames.dalpay || "",
				 globalpayPG		=	paymentGatewayNames.globalpay || "",
				 paypalPG			=	paymentGatewayNames.paypal || "",
				 netellerPG			=	paymentGatewayNames.neteller || "",
				 internalPaymentPG	=	paymentGatewayNames.internalPayment || "",
				 two_checkoutPG		=	paymentGatewayNames.two_checkout || "",
				 interswitchPG		=  paymentGatewayNames.interswitch || "",
				 evoPG				=	paymentGatewayNames.evo || "";
				 local				=  paymentGatewayNames.local || "";
				 cashfree 			=  paymentGatewayNames.cashfree || ""
				 
		  scope.planData = {};
		  var clientData = {};
		  if(rootScope.selfcare_sessionData){
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  clientData = data;
				  scope.mediaDetails = [];
				  RequestSender.vodEventsResource.get({'filterType':'ALL','pageNo':0,clientType :clientData.categoryType},function(data){
					  scope.mediaDetails = data.mediaDetails;
				  });
			  });
		  }
		  scope.mediaDatas = [];scope.totalAmount = 0;
		  scope.selectedEventsFun = function(mediaData,active){
			  if(active == true){
				  scope.totalAmount += mediaData.price;
				  scope.mediaDatas.push(mediaData);
			  }
			  else{
				  scope.totalAmount -=mediaData.price;
				  for(var i in scope.mediaDatas){
					  if(scope.mediaDatas[i].mediaId == mediaData.mediaId && scope.mediaDatas[i].quality == mediaData.quality &&
                      	   scope.mediaDatas[i].optType == mediaData.optType && scope.mediaDatas[i].price == mediaData.price &&
                      	   scope.mediaDatas[i].eventId == mediaData.eventId && scope.mediaDatas[i].mediaTitle == mediaData.mediaTitle){
						  scope.mediaDatas.splice(i,1);
					  }
				  }
			  }
			  console.log(scope.totalAmount)
		  };
	      
	  function pgFun (){
			  scope.paymentgatewayDatas = [];
			  RequestSender.paymentGatewayConfigResource.get(function(data) {
					  for(var i in data.globalConfiguration){
						   if(data.globalConfiguration[i].enabled && data.globalConfiguration[i].name != 'is-paypal-for-ios'  
							   && data.globalConfiguration[i].name != 'is-paypal' && data.globalConfiguration[i].name != 'paypal-recurring-payment-details'){
							   scope.paymentgatewayDatas.push(data.globalConfiguration[i]);
						   }
					  }
					 scope.paymentGatewayName = scope.paymentgatewayDatas.length>=1 ?scope.paymentgatewayDatas[0].name :"";
					 scope.paymentGatewayFun(scope.paymentGatewayName);
			  });
	  }
	  
	  scope.checkOutFun = function(){
		  
		  if(scope.mediaDatas.length != 0){
			  console.log("Hello");
			  scope.vodEventScreen = !(scope.eventDetailsPreview = true);
			  localStorageService.add("storageData",{clientData:clientData,eventData:scope.mediaDatas});
			  pgFun();
			    
		  }
	  };
		  
	  var hostName = selfcareModels.selfcareAppUrl,screenName = 'vod';
	  scope.paymentGatewayFun  = function(paymentGatewayName){
		  		  localStorageService.remove("N_PaypalData");
			   	  scope.paymentGatewayName = paymentGatewayName;
				  scope.termsAndConditions = false;
				  var paymentGatewayValues = {};
				  for (var i in scope.paymentgatewayDatas){
				    if(scope.paymentgatewayDatas[i].name==paymentGatewayName && scope.paymentgatewayDatas[i].name !='internalPayment'){
					  paymentGatewayValues =  angular.fromJson(scope.paymentgatewayDatas[i].value);
					  break;
				    }
					  
				  }
		 switch(paymentGatewayName){
				case dalpayPG :
						var url = paymentGatewayValues.url+'?mer_id='+paymentGatewayValues.merchantId+'&pageid='+paymentGatewayValues.pageId+'&item1_qty=1&num_items='+scope.mediaDatas.length;
					scope.paymentURL =  url+"&cust_name="+clientData.displayName+"&cust_phone="+clientData.phone+"&cust_email="+clientData.email+"&cust_state="+clientData.state+""+				
					  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc=AddingEvents&item1_price="+scope.totalAmount+"" + 	  				
					  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/"+screenName+"/"+scope.clientId+"/0/0";
						break;
						
				case kortaPG :
					
					var planData = {id:0,planCode:"Adding Events"};
					var kortaStorageData = {clientData :clientData,planId:0,planData : planData,screenName :screenName,paymentGatewayValues:paymentGatewayValues};	
					var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(kortaStorageData)),encrytionKey).toString();
					
					if(clientData.selfcare.token != null && clientData.selfcare.token != "") 
						scope.paymentURL = "#/kortatokenintegration/"+scope.totalAmount+"?key="+encryptedData;		    		 
					else scope.paymentURL = "#/kortaintegration/"+scope.totalAmount+"?key="+encryptedData;	    		
					break;
						
				case paypalPG :
					
					localStorageService.add("N_PaypalData",{clientId:scope.clientId,screenName :screenName,planId: 0,priceId:0});
					scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name=addingevents&amount="+scope.totalAmount+"" +	  	  				
					  	  "&custom="+hostName;
						break;
						
				case globalpayPG :
					
				    var globalpayStorageData = {clientData :clientData,planId:0,screenName :screenName,price :scope.totalAmount,
							 priceId : 0, globalpayMerchantId:paymentGatewayValues.merchantId};	
				    var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(globalpayStorageData)),encrytionKey).toString();
					
					scope.paymentURL = "#/globalpayintegration?key="+encryptedData;
					break;
				case netellerPG :
					
					var nettellerData = {currency:selfcareModels.netellerCurrencyType,total_amount:scope.totalAmount,screenName:screenName};
					var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(nettellerData)),encrytionKey).toString();
					
					scope.paymentURL = "#/neteller/"+scope.clientId+"?key="+encryptedData;
					break;
					
				case internalPaymentPG :
					
					scope.paymentURL =  "#/internalpayment/"+screenName+"/"+scope.clientId+"/0/0/"+scope.totalAmount;
					break;
					
				case two_checkoutPG :
					
					localStorageService.add("twoCheckoutStorageData",{screenName:screenName,clientId:scope.clientId,
																		planId:0,priceId:0});
					var zipCode = clientData.zip || clientData.city || "";
					scope.paymentURL =  paymentGatewayValues.url+"?sid="+paymentGatewayValues.sid+"&mode=2CO&li_0_type=product&li_0_name=Adding Event/s&li_0_price="+scope.totalAmount
										+"&card_holder_name="+clientData.displayName+"&street_address="+clientData.addressNo+"&city="+clientData.city+"&state="+clientData.state+"&zip="+zipCode
										+"&country="+clientData.country+"&phone="+clientData.phone+"&email="+clientData.email+"&quantity=1";
					
					break;
					
				case interswitchPG :
					
					scope.paymentURL =  "#/interswitchintegration/"+screenName+"/"+scope.clientId+"/0/0/"+scope.totalAmount+"/"+paymentGatewayValues.productId+"/"+paymentGatewayValues.payItemId;
					
					break;
					
				case evoPG :
					
					var evoData = {screenName:screenName,planId:0,priceId:0,price:scope.totalAmount,
									clientData:clientData,planCode:"Adding Events", merchantId: paymentGatewayValues.merchantId,numOfItems:scope.mediaDatas.length};
					var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(evoData)),encrytionKey).toString();
					
					scope.paymentURL = "#/evointegration?key="+encryptedData;
					break;
				
				case local :
					
					var localData = {screenName:screenName,planId:0,priceId:0,price:scope.totalAmount,
						clientData:clientData,planCode:0, merchantId: paymentGatewayValues.merchantId};
		
					localStorageService.add("localpayment",localData);

					scope.paymentURL = "#/localpaymentgateway";
					break;
					
				case cashfree :
					console.log(JSON.stringify(paymentGatewayValues));
					var cashFreeData = {screenName:screenName,planId:0,priceId:0,price:scope.totalAmount,
						clientData:clientData,planCode:scope.planData.planCode, url : paymentGatewayValues.url, 
						appId: paymentGatewayValues.appId, secretKey:paymentGatewayValues.secretKey, returnUrl : paymentGatewayValues.returnUrl,
						environment: paymentGatewayValues.environment};
		
					localStorageService.add("cashFreeData",cashFreeData);

					scope.paymentURL = "#/cashfreepaymentgateway";
					break;
						
				default : break;

				}
			    	  		 	
			  };
			  
		   /*scope.subscribeBtnFun =function(){
			   localStorageService.add("storageData",{clientData:clientData,eventData:scope.mediaDatas});
			   location.path("/orderbookingscreen/"+screenName+"/"+scope.clientId+"/0/amountZero");
		    };*/
	    
		  scope.cancelBtnFun = function(){
			  scope.vodEventScreen =  !(scope.eventDetailsPreview = false);
		  };
		  
		  var TermsandConditionsController = function($scope,$modalInstance){
			  var termsAndConditions = "termsAndConditions_"+scope.optlang+"_locale";
		    	if(scope.optlang){
		    		(scope.paymentGatewayName == kortaPG)?
		    			$scope.termsAndConditionsText = korta[termsAndConditions] 	 		: (scope.paymentGatewayName == dalpayPG)?
		    			$scope.termsAndConditionsText = dalpay[termsAndConditions] 	 		: (scope.paymentGatewayName == globalpayPG)?
		    			$scope.termsAndConditionsText = globalpay[termsAndConditions] 		: (scope.paymentGatewayName == paypalPG)?
		    			$scope.termsAndConditionsText = paypal[termsAndConditions] 	 		: (scope.paymentGatewayName == netellerPG)?
		    			$scope.termsAndConditionsText = neteller[termsAndConditions] 	 	: (scope.paymentGatewayName == internalPaymentPG)?
		    			$scope.termsAndConditionsText = internalPayment[termsAndConditions] : (scope.paymentGatewayName == two_checkoutPG)?
		    			$scope.termsAndConditionsText = two_checkout[termsAndConditions]	: (scope.paymentGatewayName == interswitchPG)?
		    	    	$scope.termsAndConditionsText = interswitch[termsAndConditions]		: (scope.paymentGatewayName == evoPG)?
		    			$scope.termsAndConditionsText = evo[termsAndConditions]				: (scope.paymentGatewayName == local)?
		    	    	$scope.termsAndConditionsText = local[termsAndConditions]			: (scope.paymentGatewayName == cashfree)?
		    	    	$scope.termsAndConditionsText = cashfree[termsAndConditions]		:  $scope.termsAndConditionsText = selectOnePaymentGatewayText[scope.optlang];
		    	
		    	
		    	}
			  $scope.done = function(){
				  $modalInstance.dismiss('cancel');
			  };
		  };
		  
		  scope.termsAndConditionsFun = function(){
			  modal.open({
				  templateUrl: 'termsandconditions.html',
				  controller: TermsandConditionsController,
				  resolve:{}
			  });
		  };
		  
    };
    
selfcareApp.controller('AddEventsController', ['$scope',
                                               'RequestSender',
                                               '$location',
                                               'localStorageService',
                                               '$modal',
                                               '$rootScope',
                                               '$filter',
                                               AddEventsController]);
