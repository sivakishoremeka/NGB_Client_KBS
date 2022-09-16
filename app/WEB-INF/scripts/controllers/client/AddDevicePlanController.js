(function(module) {
	mifosX.controllers = _.extend(module, {
		AddDevicePlanController: function(scope, webStorage,routeParams,location,resourceFactory,dateFilter,
					$rootScope,API_VERSION,http) {
			
			
			scope.clientId=routeParams.clientId;
			//var officeId=routeParams.officeId;
			//console.log(officeId);
			scope.formData = {};
			scope.date = {};
			scope.date.saleDate = dateFilter(new Date(),"dd MMMM yyyy");
			scope.formData.dateFormat = "dd MMMM yyyy";
			scope.clientServiceId = routeParams.clientServiceId;
			
			scope.offices = [];
			scope.itemMasterData = [];
			  scope.discountMasterDatas = [];
			  scope.contractPeriods = [];
			  scope.itemDatas = [];
			  scope.pairableItemDetails = [];
			  scope.isPairable = false;
			  scope.pairableFormData ={};
			  
			  //scope.plandatas = [];
			  scope.subscriptiondatas = [];
			  scope.contractPeriods = [];
			  scope.paytermdatas = [];
			  scope.postpaidPlanDatas = [];
			  scope.hardwarePlandata = [];
			  /*scope.clientServiceData =[];*/
			  
			  scope.salesCataloges = [];
			  scope.availablePlans = [];
			  
			  scope.finalData = {};
			  
			  scope.newSaleType = false;
			  scope.secondSaleType = false;
			  scope.deviceRentalType = false;
			  scope.formData.dateFormat = "dd MMMM yyyy";
			  scope.formData.locale = "en";
			  scope.walletConfig = webStorage.get('is-wallet-enable');
			
			  var clientData = webStorage.get('clientData');
			  if(webStorage.get('clientData')){
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.displayName=clientData.displayName;
				    scope.statusActive=clientData.statusActive;
				    scope.accountNo=clientData.accountNo;
				    scope.officeName=clientData.officeName;
				    scope.balanceAmount=clientData.balanceAmount;
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.currency=clientData.currency;
				    scope.imagePresent=clientData.imagePresent;
				    scope.categoryType=clientData.categoryType;
			        scope.email=clientData.email;
			        scope.phone=clientData.phone;
			        if(scope.imagePresent){
			        scope.image=clientData.image;
			        }
		  		}
			 
			//one time sale template resource
			resourceFactory.oneTimeSaleTemplateResource.get({clientId:scope.clientId}, function(data) {
	            //scope.offices = data.officesData;
	            scope.clientServiceData = data.clientServiceData;
	            
	            /*for(var i in scope.offices){
	            	if(scope.offices[i].id == officeId){
	            		scope.formData.officeId=scope.offices[i].id;
	            		console.log(scope.offices[i].id);
	            	}
	            }*/
	            
	            scope.discountMasterDatas = data.discountMasterDatas;

	            for(var i in scope.discountMasterDatas){
	                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
	                 scope.discountId = scope.discountMasterDatas[i].id; 
	                }
	            }

	            scope.itemDatas = angular.copy(data.itemDatas);
	            scope.contractPeriods = data.contractPeriods;
	            
	        }); 
			
			scope.groupByOffice = function(externalId, name){
	        	return externalId+"--"+name;
	        };
	        
	        scope.reset123 = function(){
	        	location.path('/viewclient/id/' + routeParams.clientId);
	         };

	        
           scope.selectedNewSale = function(){
	        	
	        	delete scope.formData.totalPrice;
	        	delete scope.formData.discountId;
	        	delete scope.pairableFormData.totalPrice;
	        	delete scope.pairableFormData.discountId;
	        	scope.formData.discountId = scope.discountId;
	        	scope.formData.totalPrice = scope.formData.unitPrice;
	        	scope.pairableFormData.totalPrice = scope.pairableFormData.unitPrice;
	        	scope.pairableFormData.discountId = scope.discountId
	        	scope.newSaleType = !(scope.secondSaleType = scope.deviceRentalType = false);
	        	console.log("hi");
	        };
			
            scope.selectedSecondSale = function(){
	        	
	        	delete scope.formData.totalPrice;
	        	scope.formData.totalPrice = scope.formData.unitPrice;
	        	scope.secondSaleType = !(scope.newSaleType = scope.deviceRentalType = false);
	        };
	        
           scope.selectedDeviceRental = function(){
	        	
	        	scope.formData.totalPrice = 0;
	        	delete scope.formData.discountId;
	        	delete scope.formData.contractPeriod;
	        	scope.formData.discountId = scope.discountId;
	        	scope.deviceRentalType = !(scope.newSaleType = scope.secondSaleType = false);
	        };
	        
	        scope.getData = function(query){
	        	scope.isPairable = false;
	        	delete scope.formData.discountId;
	        	scope.pairableItemDetails = [];
	        	delete scope.pairableSerialNo;
	        	scope.pairableFormData ={};
	        	return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/0/'+routeParams.officeId, {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(res){
	        	    						itemDetails = [];
						        	      for(var i in res.data.serialNumbers){
						        	    	  itemDetails.push(res.data.serialNumbers[i]);
						        	    	  if(i == 7)
						        	    		  break;
						        	      }

						        	   /* if(itemDetails.length == 0){*/
						        	    	delete scope.formData.itemId;
						        	    	delete scope.formData.chargeCode;
						        	    	delete scope.formData.unitPrice;
						        	    	delete scope.formData.quantity;
						        	    /*}*/
	        	      return itemDetails;
	        	    });
            };
            
            scope.getPairableItemDetails = function(){
            	scope.pairableItemDetails = [];
	            	resourceFactory.pairableitemMasterDetailResource.get({serialNo:scope.itemDetail,query:scope.pairableSerialNo},function(data) {
	   				 scope.pairableItemDetails = angular.copy(data.serialNumbers);
   			    });
            };
            scope.selectPairableItemDetails = function(pairableSerialNo){
            	scope.pairableSerialNo = pairableSerialNo;
            	resourceFactory.itemMasterDetailTemplateResource.get({query : pairableSerialNo,clientId:scope.clientId,officeId:routeParams.officeId},function(data) {
            		if(data){
		        		   scope.pairableFormData.itemId = data.id;
		        		   scope.pairableFormData.chargeCode = data.chargeCode;
		        		   scope.pairableFormData.totalPrice = data.unitPrice;
		        		   scope.pairableFormData.unitPrice = scope.pairableFormData.totalPrice;
		        		   scope.pairableFormData.quantity = "1";
		        		  
		        		   for(var i in scope.discountMasterDatas){
				                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
				                 scope.pairableFormData.discountId = scope.discountMasterDatas[i].id; 
				                }
				            }
		        		   
		        	   }
            	});
            };
            scope.getItemData = function(item,model,label){
           	 scope.isPairable = false;
	        	if(item || model || label){
	        		var serialNum = item || model || label;
	        		
		        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId,officeId:routeParams.officeId},function(data) {
		        		
		        	   if(data){
		        		   scope.formData.itemId = data.id;
		        		   scope.formData.chargeCode = data.chargeCode;
		        		   scope.formData.totalPrice = data.unitPrice;
		        		   scope.formData.unitPrice = scope.formData.totalPrice;
		        		   scope.formData.quantity = "1";
		        		  // scope.formData.amount = data.feeMasterData[0].defaultFeeAmount;
		        		   if("Y" == data.isPairing){
		        			 scope.isPairable = true;
		        			 scope.getPairableItemDetails();
		        		   }
		        		   
		        		   for(var i in scope.discountMasterDatas){
				                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
				                 scope.formData.discountId = scope.discountMasterDatas[i].id; 
				                }
				            }
		        		   
		        	   }
		        	});
	        	}
           };
           scope.getBothItem = function(itemCode,itemDescription){
	        	return scope.formData.itemCode+"--"+scope.formData.itemDescription;
	        };
           
	      //user cataloge resource to select hardware plans based on sales plan category
  	        resourceFactory.userscatalogeResource.get({category:'Hardware Pack'},function(data) {
				 scope.salesCataloges  = data.allPlanDatas;
				 
			 });  
  	        
  	        
  	      scope.serviceChangeFun = function(salesCatalogeId){
				 resourceFactory.salesplancatalogeResource.get({salesCatalogeId:salesCatalogeId,'planId': 0,'clientId': routeParams.clientId,'clientServiceId': routeParams.clientServiceId } , function(data) {
			         scope.availablePlans = data;
			                   
			        });
		     }
           
           //order plan template resource 
	        resourceFactory.orderTemplateResource.get({'planId': routeParams.planId,clientId:scope.clientId},function(data) {
		     	   
		     	   //scope.plandatas = data.plandata;
		     	   scope.hardwarePlandata = data.hardwarePlandatas;	
		     	   scope.clientServiceData = angular.copy(data.clientServiceData);
		     	   for(var plan in scope.hardwarePlandata){
		     		   //assinging postpaid plans
		     		   if(scope.hardwarePlandata[plan].isPrepaid == 'N')
		     			   scope.postpaidPlanDatas.push(scope.hardwarePlandata[plan]);
		     		   //assinging prepaid plans
		     		   else if(scope.hardwarePlandata[plan].isPrepaid == 'Y')
		     			   scope.prepaidPlanDatas.push(scope.hardwarePlandata[plan]);
		     	   }
		            scope.subscriptiondatas=data.subscriptiondata;
		            scope.paytermdatas=data.paytermdata;
		            //scope.clientId = scope.clientId;
		            scope.formData = {
		              		billAlign: true,
		              		//autoRenew : isAutoRenew
		                    };  	   
		      });
	        scope.getPlan = function(planCode, planDescription){
	        	return planCode+"--"+planDescription;
	        };
	        scope.setBillingFrequency = function(value) {
	        	  $('plancode').css({"color":"red"});
	        	scope.paytermdatas=undefined;
	        	 resourceFactory.orderResource.get({planId:value,clientId: routeParams.id,template: 'true'} , function(data) {
	        		 scope.paytermdatas=data.paytermdata;
	        		 scope.formData.isPrepaid=data.isPrepaid;
	        		 scope.isPrepaidPlan=data.isPrepaid;


	        		 scope.formData.planCode=value;
	        		 scope.formData.contractPeriod=data.contractPeriod;
	        		
	             });
	       };
	       
	       scope.reset123 = function(){
	        	location.path('/viewclient/id/' + routeParams.clientId);
	         };
	         
	        
	       
	      scope.submit = function(){
	    	   
	    	  scope.finalData.deviceData = []; 
	    	  scope.finalData.planData = [];
	    	  
	    	  
	    	    scope.deviceData ={};
	    	    scope.deviceData.locale = scope.optlang.code;
	    	    scope.deviceData.dateFormat = "dd MMMM yyyy";
	    	    scope.deviceData.officeId = routeParams.officeId;
	    	    scope.deviceData.itemId = scope.formData.itemId;
	    	    scope.deviceData.chargeCode = scope.formData.chargeCode;
	    	    scope.deviceData.clientServiceId = scope.clientServiceId;
	    	    scope.deviceData.unitPrice = scope.formData.unitPrice;
	    	    scope.deviceData.quantity = scope.formData.quantity;
	    	    scope.deviceData.discountId = scope.formData.discountId;
	    	    scope.deviceData.totalPrice = scope.formData.totalPrice;
	    	    
	    	    scope.deviceData.saleType = "HARDWARE";
	        	scope.deviceData.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
	        	for(var i in scope.itemDatas){
	        		if(scope.itemDatas[i].id == scope.formData.itemId){
	        			scope.itemType1 = scope.itemDatas[i].itemCode;
	        		}
	        		if(scope.itemDatas[i].id == scope.pairableFormData.itemId){
	        			scope.pairableFormData.itemType = scope.itemDatas[i].itemCode;
	        		}
	        	}
	        	
	        	scope.deviceData.serialNumber = [{
					serialNumber 	: scope.itemDetail,
					//orderId 		: routeParams.clientId, 
					clientId 		: routeParams.clientId, 
					clientServiceId : scope.clientServiceId,
					status 			: "allocated", 
					saleType        : "HARDWARE",
					itemMasterId 	: scope.formData.itemId,
					isNewHw 		: "Y",
					itemType        : scope.itemType1
				}];
	        	if(scope.isPairable){
	        		scope.deviceData.pairableItemDetails ={};
	        		scope.deviceData.pairableItemDetails.dateFormat = "dd MMMM yyyy";
	        		scope.deviceData.pairableItemDetails.locale = scope.optlang.code;
	        		scope.deviceData.pairableItemDetails.officeId = routeParams.officeId;
	        		scope.deviceData.pairableItemDetails.itemId = scope.pairableFormData.itemId;
	        		scope.deviceData.pairableItemDetails.chargeCode = scope.pairableFormData.chargeCode;
	        		scope.deviceData.pairableItemDetails.unitPrice = scope.pairableFormData.unitPrice;
	        		scope.deviceData.pairableItemDetails.quantity = scope.formData.quantity;
	        		scope.deviceData.pairableItemDetails.discountId = scope.pairableFormData.discountId;
	        		scope.deviceData.pairableItemDetails.totalPrice = scope.pairableFormData.totalPrice;
	        		scope.deviceData.pairableItemDetails.saleType = "HARDWARE";
	        		scope.deviceData.pairableItemDetails.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
	        		scope.deviceData.pairableItemDetails.clientServiceId = scope.clientServiceId;
	        		scope.deviceData.pairableItemDetails.isPairing = "N";
	        		scope.deviceData.pairableItemDetails.serialNumber = [];
	        		scope.deviceData.pairableItemDetails.serialNumber.push({
					serialNumber 	: scope.pairableSerialNo,
					//orderId 		: routeParams.clientId, 
					clientId 		: routeParams.clientId, 
					status 			: "allocated", 
					saleType        : "HARDWARE",
					itemMasterId 	: scope.pairableFormData.itemId,
					isNewHw 		: "Y",
					itemType        : scope.pairableFormData.itemType
				});
	        	scope.deviceData.isPairing = "Y";
	        	}else{
	        		delete scope.deviceData.pairableItemDetails;
	        		scope.deviceData.isPairing = "N";
	        	}
	        	scope.finalData.deviceData.push(scope.deviceData);
	        	
	        	this.formData.clientServiceId = routeParams.clientServiceId;
	        	this.formData.isNewplan =false;
	        	if(routeParams.planId == 0){
	        		this.formData.isNewplan =true;
	        	}
	        	
	        	scope.flag = true;
	        	this.formData.locale = scope.optlang.code;
	           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.dateFormat = 'dd MMMM yyyy';
	            this.formData.start_date = reqDate;
	            
	            if(this.formData.isPrepaid == 'Y'){
	          	  for (var i in scope.paytermdatas) {
	                   	if(scope.paytermdatas[i].duration == this.formData.contractPeriod){
	                   		 this.formData.paytermCode=scope.paytermdatas[i].paytermtype; 
	                   	}
	                };
	                for (var i in scope.subscriptiondatas) {
	                 	if(scope.subscriptiondatas[i].Contractdata == this.formData.contractPeriod){
	                 		 this.formData.contractPeriod=scope.subscriptiondatas[i].id;
	                 		
	                 	}
	              };   
	              this.formData.billAlign=false;
	            }
	            
	            for(var i in scope.availablePlans){
		    		   if(scope.availablePlans[i].id == scope.formData.planCode){
		    			   scope.planName = scope.availablePlans[i].planCode;
		    			   scope.planPoId = scope.availablePlans[i].planPoId;
		    			   scope.planTypeName = scope.availablePlans[i].planTypeName;
		    			   break;
		    		   }
		    	   }
	            delete this.formData.planId;
	            this.formData.id;
	            delete this.formData.isPrepaid;
	            
	            scope.finalData.plnData = {
		    			   "billAlign":false,
		    			   "autoRenew":"",
		    			   "planCode":scope.formData.planCode,
		    			   "planName":scope.planName,
		    			   "planpoId":scope.planpoId,
		    			   "contractPeriod":scope.formData.contractPeriod,
		    			   "paytermCode":scope.formData.paytermCode,
		    			   "clientServiceId": scope.clientServiceId,
		    			   "isNewplan":true,
		    			   "planTypeName":scope.planTypeName,
		    			   "locale":scope.optlang.code,
		    			   "dateFormat": "dd MMMM yyyy",
		    			   "start_date":dateFilter(new Date(),'dd MMMM yyyy'),
		    			   
		    	   };
	            
	               scope.finalData.planData.push(scope.finalData.plnData);
		    	   delete scope.finalData.plnData;

	            var orderId = webStorage.get('orderId');
	           
	          resourceFactory.hardwareDevicePlanResource.save({clientId:routeParams.clientId,clientServiceId:routeParams.clientServiceId},scope.finalData,function(data){
	        	  //webStorage.add("callingTab", {someString: "Sale" });
	            	 location.path('/viewclient/id/' + routeParams.clientId);
	          });
	        	
	        
	       };
	        
            
		}
	});
	mifosX.ng.application.controller('AddDevicePlanController', [
           '$scope',
           'webStorage',
           '$routeParams',
           '$location',
           'ResourceFactory',
           'dateFilter',
           '$rootScope',
           'API_VERSION',
           '$http',
    mifosX.controllers.AddDevicePlanController]).run(function($log) {
	       $log.info("AddDevicePlanController initialized");
	});
}(mifosX.controllers || {}));