CashFreePaySuccessController = function(RequestSender, location,localStorageService,dateFilter,rootScope) {
 
    		var formData			= {};
    		formData.source 		= paymentGatewayNames.cashfree;
    		var StorageData			= localStorageService.get("cashFreeData");
    		if(StorageData){
    			formData.transactionId 	= StorageData.transactionId;
        		var screenName		= StorageData.screenName,
    			     clientId		= StorageData.clientData.id,
    				 planId			= StorageData.planId,
    			     priceId		= StorageData.priceId;
    		 if(localStorageService.get("statementsPayData")){
					
   				 RequestSender.paymentTemplateResource.get(function(paymentTemplateData){
   					 var paymentFormData = {};
   					 paymentFormData.dateFormat = "dd MMMM yyyy";
   					 paymentFormData.isSubscriptionPayment = false;
   					 paymentFormData.locale = rootScope.localeLangCode;
   					 paymentFormData.paymentDate = dateFilter(new Date(),'dd MMMM yyyy');
   					 paymentFormData.receiptNo = formData.transactionId;
   					 paymentFormData.amountPaid = StorageData.price;
   					 for(var m in paymentTemplateData.data){
   							 if(angular.lowercase(paymentTemplateData.data[m].mCodeValue) == 'online payment'){
   								 paymentFormData.paymentCode = paymentTemplateData.data[m].id;
   								 break;
   							 }
   						 }
   						
   					RequestSender.paymentResource.save({clientId : clientId},paymentFormData,function(data){
   						var successData = {};
   						successData.Result = "Success";
   						successData.Description = "Transaction Successfully Completed";
   						successData.Amount = StorageData.price;
   						successData.TransactionId = formData.transactionId;
   						
   						localStorageService.add("paymentgatewayresponse", {data:successData});
   						location.$$search = {};localStorageService.remove("cashFreeData");
   						  location.path('/paymentgatewayresponse/'+clientId);
   					});
   				});
   					
   		   }else{
    		
   			   	formData.clientId = clientId;
			   	formData.total_amount = StorageData.price;
			   	formData.currency = 356;
			   	formData.locale = "en";
			   	formData.status = "Success";
			   	formData.otherData=[1,2];
	    		RequestSender.paymentGatewayResource.update(formData, function(data){
	    			localStorageService.remove("cashFreeData");
	    			localStorageService.add("paymentgatewayresponse", {data:data});
	    			var result = angular.uppercase(data.Result) || "";
	    			location.$$search = {};
	    			if(screenName == 'payment'){
						location.path('/paymentgatewayresponse/'+formData.clientId);
					}else if(result == 'SUCCESS' || result == 'PENDING'){
						localStorageService.add("gatewayStatus",result);
						location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
					}
	    		});
   		    }
    	  }
    		
		};

selfcareApp.controller('CashFreePaySuccessController', ['RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  'dateFilter', 
	                                                  '$rootScope', 
	                                                  CashFreePaySuccessController]);

