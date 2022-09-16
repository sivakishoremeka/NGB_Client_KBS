(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServiceWithoutDeviceController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION) {
		  
		  scope.offices = [];
		  scope.clientCategoryDatas = [];
		  scope.cities = [];
		  scope.formData={};
		  scope.formData.clientServiceDetails =[];
		  scope.clientServiceCollapsed =true;
		  scope.deviceCollapsed = true; 
		  scope.planCollapsed = true;
		  scope.serviceData = [];
		  scope.serviceFormData = [];
		  scope.clientServiceData = [];
		  scope.discountMasterDatas = [];
		  scope.itemDatas = [];
		  scope.contractPeriods = [];
		  scope.pairableItemDetails = [];
		  scope.pairableFormData = {};
		  scope.plandatas = [];
		  scope.subscriptiondatas = [];
	      scope.paytermdatas = [];
	      scope.clientId=[];
	     // scope.clientId = routeParams.id;
	      
	      
	      scope.salesCataloges = [];
	      scope.availablePlans = [];
	      scope.finalData = {};
	      scope.formData.clientServiceDetails = [];
	      scope.isPairable = false;
	      scope.activationDate = new Date();
	      scope.paramValues = ["true","false"];
	      var reqDate = dateFilter(scope.activationDate,'dd MMMM yyyy');
	      
	      //the datetime date is only for display
		  scope.dateTime = new Date().toDateString();
		  
	      scope.start.date = new Date();
	      scope.saleDate = new Date();
	      scope.clientviewId=routeParams.clientId;
        
	      //Iscrm start------
	      
	      scope.globalConfigs =  webStorage.get("global_configuration")
	        for(var i in scope.globalConfigs){
	        	if(scope.globalConfigs[i].name == "is-CRM-Enable"){
	        		scope.isCrm = scope.globalConfigs[i].enabled;break;
	        	}
	        };
	        
	        /*if(scope.isCrm == true){
		        scope.formData.paytermCode = false;
	        }*/

	        //Iscrm end------
		  
	      var clientData = webStorage.get('clientData');
	      if(webStorage.get('clientData')){
			    scope.accountNo=clientData.accountNo;
			    scope.clientPoId = clientData.poId;
			    /*scope.paytermCodeId = clientData.chargeCycleId;
			    scope.paytermCode = clientData.chargeCycle;*/
	  		}
		  
		  scope.groupByOffice = function(externalId, name){
	        	return externalId+"--"+name;
	      };
		  
		  scope.getOfficeData = function(query){
	        	return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(result){
	        	    	scope.officeDetails = [];
		        	      for(var i in result.data.officeOptions){
		        	    	  scope.officeDetails.push(result.data.officeOptions[i]);
		        	    	  if(i == 7)
		        	    		  break;
		        	      }
		        	      
		        	    if(scope.officeDetails.length == 0){
		        	    	delete scope.formData.name;
		        	    	delete scope.formData.nameDecorated;
		        	    	delete scope.formData.externalId;
		        	    }
	        	      return scope.officeDetails;
	        	    });
	        };
		  
		  scope.formName=function(name){
              var mesage_array = new Array();
              mesage_array = (name.split(" "));
           
	           this.formData.firstname=mesage_array[0];
	           this.formData.lastname=mesage_array[1];
	           if(this.formData.lastname == null){
	        	   this.formData.lastname="Mr.";
	           }
          };
		  
		  scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.country = data.country;
        	  });
          };
		  
		  resourceFactory.clientserviceTemplateResource.get(function(data) {
			  scope.serviceData = data.serviceData;
		  });
		  
		  scope.getBothService = function(serviceCode, serviceDescription){
			  return serviceCode+"--"+serviceDescription;
		  };
		  
		  scope.changeServiceFun = function(){
			  resourceFactory.clientserviceparamResource.get({serviceId: scope.formData.serviceId,paramCategory:"S",'clientId': routeParams.clientId }, function(data) {
				  scope.serviceDetail = angular.copy(data);
				  scope.details = data;
			  });
		  };
		  
		  resourceFactory.oneTimeSaleTemplateResource.get({clientId:scope.clientId}, function(data) {
	            scope.clientServiceData = data.clientServiceData;
	            
	            scope.discountMasterDatas = data.discountMasterDatas;
	            for(var i in scope.discountMasterDatas){
	                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
	                 scope.discountId = scope.discountMasterDatas[i].id; 
	                }
	               }
	            scope.itemDatas = angular.copy(data.itemDatas);
	            scope.contractPeriods = data.contractPeriods;
	        }); 
		  	
			 
		  
		  scope.getData = function(query){
			  	scope.isPairable = false;
	        	delete scope.formData.discountId;
	        	scope.pairableItemDetails = [];
	        	delete scope.pairableSerialNo;
	        	scope.pairableFormData ={};
			 /* for(var i in scope.officeDetails){
	           		if(scope.officeDetails[i].externalId == routeParams.officeId){
	           			routeParams.officeId = scope.officeDetails[i].id;
	           		}
	           	}*/
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

						        	    if(itemDetails.length == 0){
						        	    	delete scope.formData.itemId;
						        	    	delete scope.formData.chargeCode;
						        	    	delete scope.formData.unitPrice;
						        	    	delete scope.formData.quantity;
						        	    }
	        	      return itemDetails;
	        	    });
        };
        
        scope.getPairableItemDetails = function(serialNum){
        	scope.itemDetail=serialNum;
        	console.log(scope.itemDetail);
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
		        		   if("Y" == data.isPairing){
		        			 scope.isPairable = true;
		        			 scope.getPairableItemDetails(serialNum);
		        		   }else{
		        			   scope.itemDetail = serialNum;
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
          
	            
	            scope.selectedNewSale = function(){
		        	delete scope.formData.totalPrice;
		        	delete scope.formData.discountId;
		        	delete scope.pairableFormData.totalPrice;
		        	delete scope.pairableFormData.discountId;
		        	scope.formData.discountId = scope.discountId;
		        	scope.formData.totalPrice = scope.formData.unitPrice;
		        	scope.pairableFormData.totalPrice = scope.pairableFormData.unitPrice;
		        	scope.pairableFormData.discountId = scope.discountId;
		        	scope.newSaleType = !(scope.secondSaleType = scope.deviceRentalType = false);
		        	
		        };
		        
		        //user cataloge resource to select plans based on sales plan category
	  	        resourceFactory.userscatalogeResource.get({category:'Base Pack'},function(data) {
					 scope.salesCataloges  = data.allPlanDatas;
				 });  
	  	        
	  	        
	  	      scope.serviceChangeFun = function(salesCatalogeId){
					 resourceFactory.salesplancatalogeResource.get({salesCatalogeId:salesCatalogeId,'planId': 0,'clientId': routeParams.clientId,'clientServiceId':0 } , function(data) {
				         scope.availablePlans = data.planData;
				         scope.subscriptiondatas = data.subscriptiondata;          
				        });
			     }
	  	        /*resourceFactory.orderTemplateResource.get({planId:'0'},function(data) {
			          scope.plandatas = data.defaultPlanDatas;
			          scope.items = data.plandata;
			          scope.prepaidPlansitems = data.plandata;
			          scope.subscriptiondatas=data.subscriptiondata;
			          scope.paytermdatas=data.paytermdata;
			          scope.clientId = routeParams.id;
			          scope.formData = {
			            		billAlign: false,
			            		
			                  };
			        });*/
		        scope.getPlan = function(planCode, planDescription){
		        	return planCode+"--"+planDescription;
		        };
		        scope.setBillingFrequency = function(planData) {
		        	
		        	scope.formData.planCode=planData.id;
	        		scope.formData.contractPeriodId = planData.contractPeriodId;
	        		scope.formData.isPrepaid=planData.isPrepaid;
	        		scope.paytermCodeId = planData.contractPeriodId;/*written on April 07 2020*/
				    scope.paytermCode = planData.chargeCycle;/*written on April 07 2020*/
		        	
		        	/*scope.paytermdatas=[];
		        	 resourceFactory.orderResource.get({planId:value, template: 'true',clientId:routeParams.clientId} , function(data) {
		        		 
		        		 scope.paytermdatas=data.paytermdata;
		        		 scope.formData.isPrepaid=data.isPrepaid;
		        		 scope.isPrepaidPlanFormData4=data.isPrepaid;
		        		 scope.formData.planCode=value;
		        		 scope.formData.contractPeriodId = value1;
		        		  for (var i in data.subscriptiondata) {
		                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
		                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
		                 	}
		                   
		                  };
		             });*/
		       };
		       
		       scope.setContractPeriodWhileCrm = function(planData){
		  	    	if(scope.isCrm == true){
		  	    		    scope.formData.paytermCode = planData.chargeCycle;
					        for (var i in data.subscriptiondata) {
			                 	if(data.subscriptiondata[i].Contractdata == 'Perpetual'){
			                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
			                 		break;
			                 	}
			               };
		  	    	}
		  	    }; 
		       
		       
		       scope.submit = function(){
		    	   scope.formData.clientServiceDetails = [];
		    	   scope.finalData.clientData = [];
		    	   scope.finalData.clientServiceData =[];
		    	  // scope.finalData.deviceData = [];
		    	   scope.finalData.planData = [];
		    	   
		    	   
		    	   
		    	   for(var i in scope.serviceDetail){
		    		   scope.casName = "";
		    		     for(var j in scope.serviceDetail[i].details){
		    		    	 if(scope.serviceDetail[i].details[j].id == scope.serviceDetail[i].paramValue){
		    		    		 scope.casName = scope.serviceDetail[i].details[j].mCodeValue;break;
		    		    	 }
		    		     }
		    		     
		    		     if(scope.serviceDetail[i].paramType == 'Query'){
							 scope.parameterValue = scope.serviceDetail[i].clientDetails.email;
						 }else {
							 scope.parameterValue = scope.serviceDetail[i].paramValue;
						 }
		    		     
		        		 scope.formData.clientServiceDetails
							.push({
								 status: 'new',
								 parameterId: parseInt(scope.serviceDetail[i].paramName),
								 parameterValue: scope.parameterValue,
								 casName: scope.casName,
							});
		    	   }
		    	   scope.clintServiceData = {
		    			 "clientServiceDetails": scope.formData.clientServiceDetails,
		    			 "serviceId":scope.formData.serviceId,
		    			 "accountNo":scope.accountNo,
		    			 "clientPoId":scope.clientPoId
		    	   };
		    	   scope.finalData.clientServiceData.push(scope.clintServiceData);
		        	if(scope.isCrm == false){
			        	if(scope.formData.isPrepaid == 'Y'){
			        		scope.formData.contractPeriod = scope.formData.contractPeriodId;
			        	}else{
			        		for (var i in scope.subscriptiondatas) {
			                   	if(scope.subscriptiondatas[i].Contractdata == 'Perpetual'){
			                   		 scope.formData.contractPeriod=scope.subscriptiondatas[i].id;
			                   	}
			        		}
			        	}
			        	scope.formData.paytermCode = scope.paytermCode;
			        	
		        	}
		        	
		    	   for(var i in scope.availablePlans){
		    		   if(scope.availablePlans[i].id == scope.formData.planCode){
		    			   scope.planName = scope.availablePlans[i].planCode;
		    			   scope.planPoId = scope.availablePlans[i].planPoId;
		    			   scope.dealPoId = scope.availablePlans[i].dealPoId;
		    			   break;
		    		   }
		    	   }
		    	   scope.finalData.plnData = {
		    			   "billAlign":false,
		    			   "autoRenew":"",
		    			   "planCode":scope.formData.planCode,
		    			   "planName":scope.planName,
		    			   "planPoId":scope.planPoId,
		    			   "dealPoId":scope.dealPoId,
		    			   "contractPeriod":scope.formData.contractPeriod,
		    			   "paytermCode":scope.formData.paytermCode,
		    			   "isNewplan":true,
		    			   "locale":scope.optlang.code,
		    			   "dateFormat": "dd MMMM yyyy",
		    			   "start_date":dateFilter(new Date(),'dd MMMM yyyy'),
		    			   
		    	   };
		    	  scope.finalData.planData.push(scope.finalData.plnData);
		    	   delete scope.finalData.plnData;
		    	   
		    	
		    	   resourceFactory.serviceActivationWithoutDeviceResource.save({clientId:routeParams.clientId},scope.finalData,function(data){
		    	   location.path('/viewclient/id/'+ routeParams.clientId);
		    		
		    	   },function(errors) {
		    		    	  if(errors.data.errors!=null){
		    					scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
		    	        	  }else{
		    	        		  scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
		    	        	  }
		    	  		});
		    	};
	            

	    }
	  });
mifosX.ng.application.controller('ServiceWithoutDeviceController', [
                                                                  '$scope',
                                                                  'webStorage',
                                                                  '$routeParams',
                                                                  'ResourceFactory', 
                                                                  '$location', 
                                                                  '$http',
                                                                  '$filter',
                                                                  'PermissionService', 
                                                                  'dateFilter',
                                                                  '$rootScope',
                                                                  'API_VERSION',
                                                                  mifosX.controllers.ServiceWithoutDeviceController]).run(function($log) {
    $log.info("ServiceWithoutDeviceController initialized");
  });
}(mifosX.controllers || {}));