LocalPaymentGatewayController = function(RequestSender, location,localStorageService,dateFilter,rootScope) {
 
    		var formData			= {};
    		formData.source 		= paymentGatewaySourceNames.local;
    		var StorageData			= localStorageService.get("localpayment");
    		
    		var randomFun = function() {
				var chars = "0123456789";
				var string_length = 6;
				var randomstring = dateFilter(new Date(),'yyMMddHHmmss');
				
				for (var i=0; i<string_length; i++) {
					var rnum = Math.floor(Math.random() * chars.length);
					randomstring += chars.substring(rnum,rnum+1);	
				}	
				formData.transactionId = randomstring;
				
			};randomFun();
		
    		
    		if(StorageData){
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
   						location.$$search = {};localStorageService.remove("localpayment");
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
	    			localStorageService.remove("localpayment");
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

selfcareApp.controller('LocalPaymentGatewayController', ['RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  'dateFilter', 
	                                                  '$rootScope', 
	                                                  LocalPaymentGatewayController]);

