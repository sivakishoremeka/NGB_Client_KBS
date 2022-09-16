CashFreePaymentGatewayController = function(scope, RequestSender,location, localStorageService,$timeout,rootScope,dateFilter) {  
		 
		//values getting form constants.js file
		  scope.currencyType		= selfcareModels.EVO_CurrencyType;
		  scope.blowfishKey			= selfcareModels.EVO_Blowfish;
		  scope.HMACKey				= selfcareModels.EVO_HMAC;
		  scope.optlang 			= rootScope.localeLangCode;
		  var appURL				= selfcareModels.selfcareAppUrl;
		  rootScope.showFrame 		= false;
		  rootScope.evoSuccesssPage = false;
		  
		/*  var decryptedData 		= CryptoJS.AES.decrypt(location.search().key, selfcareModels.encriptionKey).toString(CryptoJS.enc.Utf8),
		  	   evoStorageData 		= angular.fromJson(decodeURIComponent(decryptedData)),
		*/ 
		  var cashFreeData = localStorageService.get("cashFreeData");
		  console.log(JSON.stringify(cashFreeData));
		  var  clientData 			= cashFreeData.clientData,
		  	   clientId				= clientData.id;
		  scope.planCode 			= cashFreeData.planCode || "None",
    	  scope.firstname			= clientData.firstname;
    	  scope.lastname			= clientData.lastname;
    	  scope.fullName			= clientData.displayName;
    	  scope.city				= clientData.city;
    	  scope.state				= clientData.state;
    	  scope.country				= clientData.country;
    	  scope.addressNo			= clientData.addressNo;
    	  scope.zip					= clientData.zip;
    	  scope.email 				= clientData.email;
    	  scope.phone 				= clientData.phone;
    	  scope.price				= cashFreeData.price;
    	  scope.merchantId			= cashFreeData.merchantId;
    	  scope.screenName			= cashFreeData.screenName;
    	  scope.numOfItems			= cashFreeData.numOfItems;
    	  scope.appId               = cashFreeData.appId;
    	  scope.returnUrl           = cashFreeData.returnUrl;
    	  scope.environment         = cashFreeData.environment;
    	  
    	  scope.cashFreePG = {reviewCart:true,billingInfo:true,paymentMethod:true,isFirstDisabled:true};
    	  scope.cashFreeDataJson = {};
    	  scope.cashFreeDataJson.amount= scope.price;
    	  scope.cashFreeDataJson.clientId = clientId;
    	  scope.cashFreeDataJson.clientName = scope.firstname;
    	  scope.cashFreeDataJson.clientphone =  scope.phone;
    	  scope.cashFreeDataJson.clientEmail =  scope.email;
    	  scope.cashFreeDataJson.currencyType = '356';
    	  scope.cashFreeDataJson.returnURL = "/a";
    	  scope.cashFreeDataJson.transactionId = "4321";
    	  
    	  /*RequestSender.cashFreeResource.save(scope.cashFreeDataJson,function(data){
    	  
    	  });*/
    	  RequestSender.cashFreePaymentTokenResource.save(scope.cashFreeDataJson,function(data){
    		  scope.cashFreeDataJson.paymentToken = data.paymentToken;
    		  scope.cashFreeDataJson.transactionId = data.transactionId;
    		  
    		  cashFreeData.paymentToken = data.paymentToken;
    		  cashFreeData.transactionId = data.transactionId;
    		  localStorageService.add("cashFreeData",cashFreeData);
    		  
    		  var dataTransferJson = {};
    		  dataTransferJson.orderId = data.transactionId;
    		  dataTransferJson.orderAmount = scope.price;
    		  dataTransferJson.customerName = scope.firstname;
    		  dataTransferJson.customerPhone = scope.phone;
    		  dataTransferJson.customerEmail = scope.email;
    		  dataTransferJson.returnUrl = scope.returnUrl;
    		  dataTransferJson.notifyUrl = scope.returnUrl;
    		  dataTransferJson.appId = scope.appId;
    		  dataTransferJson.paymentToken = data.paymentToken; 
    		  dataTransferJson.environment = scope.environment;
    		  paymentPage(dataTransferJson);
          });
    	  
    	  scope.blockUI = true;
    	  $timeout(function() {
    		  scope.blockUI 		= false;
    		  rootScope.showFrame 	= true;
    	  }, 4000);
    	  /*scope.submitPaymentMethodFun = function(){
		 	$("#submitEvoIntegration").click();
	 		};*/
    	  
    	  
    	  
	};
    
selfcareApp.controller('CashFreePaymentGatewayController', ['$scope', 
                                                    'RequestSender',
                                                    '$location', 
                                                    'localStorageService',
                                                    '$timeout',
                                                    '$rootScope',
                                                    'dateFilter',
                                                    CashFreePaymentGatewayController]);
