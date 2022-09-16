(function(module) {
	mifosX.controllers = _.extend(module, {
		 CreateHardwareServiceActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION) {
			 
			 scope.clientId=routeParams.clientId;
			 //var officeId=routeParams.officeId;
			 scope.offices = [];
			 scope.serviceData = [];
			 scope.formData={};
			 scope.formData1={};
			 scope.clientServiceId = routeParams.clientServiceId;
			 scope.finalData = {};
			 
			 scope.itemMasterData = [];
			 scope.discountMasterDatas = [];
			 scope.contractPeriods = [];
			 scope.itemDatas = [];
			 scope.pairableItemDetails = [];
			 scope.pairableFormData ={};
			 scope.isPairable = false;
			 
			 scope.salesCatalogeplan = [];
			 scope.plandatas = [];
			 scope.subscriptiondatas = [];
			 scope.contractPeriods = [];
			 scope.paytermdatas = [];
			 scope.paytermDatas = [];
			 scope.postpaidPlanDatas = [];
			 scope.postpaidPlanData = [];
			 scope.prepaidPlanDatas = [];
			 scope.prepaidPlanData = [];
			 scope.hardwarePlandata = [];
			 scope.salesCataloges = [];
			 scope.availablePlans = [];
			 scope.deviceHardwarePlan = [];
			 scope.availablePlan = [];
			 
			 scope.date = {};
			 
			 //the datetime date is only for display
			 scope.dateTime = new Date().toDateString();
			 
			 scope.date.saleDate = dateFilter(new Date(),"dd MMMM yyyy");
			 scope.formData.dateFormat = "dd MMMM yyyy";
			 scope.formData1.dateFormat = "dd MMMM yyyy";
			 scope.walletConfig = webStorage.get('is-wallet-enable');
			 
			 scope.globalConfigs =  webStorage.get("global_configuration")
		        for(var i in scope.globalConfigs){
		        	if(scope.globalConfigs[i].name == "is-CRM-Enable"){
		        		scope.isCrm = scope.globalConfigs[i].enabled;break;
		        	}
		        };
			 
			 
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
			        scope.clientPoId = clientData.poId;
			        scope.paytermCodeId = clientData.chargeCycleId;
			        scope.paytermCode = clientData.chargeCycle;
			        scope.paytermCode1 = clientData.chargeCycle;
			        if(scope.imagePresent){
			        scope.image=clientData.image;
			        }
		  		}
			 
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
	          
	         //client service template resource
	          resourceFactory.clientserviceTemplateResource.get(function(data) {
				  scope.serviceData = data.serviceData;
			  });
	          
	          scope.getBothService = function(serviceCode, serviceDescription){
				  return serviceCode+"--"+serviceDescription;
			  };
			  
			  scope.changeServiceFun = function(){
				  resourceFactory.clientserviceparamResource.get({serviceId: scope.formData.serviceId,paramCategory:"S",'clientId': routeParams.clientId}, function(data) {
					  scope.serviceDetail = angular.copy(data);
					  scope.details = data;
				  });
			  };
	          
			//one time sale template resource
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
				

				 
				 scope.groupByOffice = function(externalId, name){
			        	return externalId+"--"+name;
			      };
			      
			      scope.reset123 = function(){
			        	location.path('/viewclient/id/' + routeParams.clientId);
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
									        	      }scope.plandatas

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
	              
	              scope.getBothItem = function(itemCode,itemDescription){
	  	        	return scope.formData.itemCode+"--"+scope.formData.itemDescription;
	  	          };
	  	          
	  	        //user cataloge resource to select plans based on sales plan category 
	  	        resourceFactory.userscatalogeResource.get({category:'all'},function(data) {
	  	        	 scope.salesCatalogeplan  = data.allPlanDatas;
					 
					 for(var i in scope.salesCatalogeplan){
			     		   //assinging hardware salescataloges
			     		   if(scope.salesCatalogeplan[i].salesPlanCategoryName == "Hardware Pack")
			     			   scope.deviceHardwarePlan.push(scope.salesCatalogeplan[i]);
			     		   
			     		   //assinging Base salescataloges
			     		   else if(scope.salesCatalogeplan[i].salesPlanCategoryName == "Base Pack")
			     			   scope.salesCataloges.push(scope.salesCatalogeplan[i]);
			     		   
			     	   }
					 
				 }); 
	  	        
	  	      //This is for hardware plans
	  	      scope.serviceChangePlan = function(salesCatalogeId){
					 resourceFactory.salesplancatalogeResource.get({salesCatalogeId:salesCatalogeId,'planId': 0,'clientId': routeParams.clientId,'clientServiceId':0 } , function(data) {
				         scope.availablePlan = data.planData;
				         scope.subscriptiondatas = data.subscriptiondata;				                   
				        });
			     }
	  	        
	  	      //This is for base plans
	  	      scope.serviceChangeFun = function(salesCatalogeId){
					 resourceFactory.salesplancatalogeResource.get({salesCatalogeId:salesCatalogeId,'planId': 0,'clientId': routeParams.clientId,'clientServiceId':0 } , function(data) {
				         scope.availablePlans = data.planData;
				         scope.subscriptiondatas = data.subscriptiondata;			                   
				        });
			     }
	  	   
	  	          
	  	      //order plan template resource 
	  	        /*resourceFactory.orderTemplateResource.get({planId: '0'},function(data) {
	  		     	   
	  		     	   scope.plandatas = data.defaultPlanDatas;
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
	  		            scope.paytermDatas=data.paytermdata;
	  		            scope.clientId = scope.clientId;
	  		            scope.formData = {
	  		              		billAlign: true,
	  		              		//autoRenew : isAutoRenew
	  		                    };  	   
	  		      });*/
	  	        
	  	      scope.getPlan = function(planCode, planDescription){
		        	return planCode+"--"+planDescription;
		        };
		        
		        scope.setBillingFrequency = function(planData) {
		        	  $('plancode').css({"color":"red"});
		        	  
		        	  scope.formData.planCode=planData.id;
		        	  scope.formData.contractPeriodId = planData.contractPeriodI;
		        	  scope.formData.isPrepaid=planData.isPrepaid;
		        	  
		        	/*scope.paytermdatas=undefined;
		        	 resourceFactory.orderResource.get({planId:value,clientId: routeParams.id,template: 'true'} , function(data) {
		        		 scope.paytermdatas=data.paytermdata;
		        		 scope.formData.isPrepaid=data.isPrepaid;
		        		 scope.isPrepaidPlan=data.isPrepaid;
		        		 scope.formData.planCode=value;
		        		 scope.formData.contractPeriodId = value1;
		        		 for (var i in data.subscriptiondata) {
			                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
			                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
			                 		console.log(scope.formData.contractPeriod);
			                 	} 
			             };
		        		
		             });*/
		       };
				
		       scope.setBillingFrequencies = function(planData1) {
		        	  $('plancode').css({"color":"red"});
		        	  scope.formData1.planCode=planData1.id;
		        	  scope.formData1.contractPeriodId = planData1.contractPeriodId;
		        	  scope.formData1.isPrepaid=planData1.isPrepaid;
		        	  
		        	/*scope.paytermDatas=undefined;
		        	 resourceFactory.orderResource.get({planId:value,clientId: routeParams.id,template: 'true'} , function(data) {
		        		 scope.paytermDatas=data.paytermdata;
		        		 scope.formData1.isPrepaid=data.isPrepaid;
		        		 scope.isPrepaidPlan=data.isPrepaid;
		        		 scope.formData1.planCode=value;
		        		 scope.formData1.contractPeriodId = value1;
		        		 for (var i in data.subscriptiondata) {
			                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
			                 		 scope.formData1.contractPeriod=data.subscriptiondata[i].id; 
			                 		 console.log(scope.formData1.contractPeriod);
			                 	} 
			             };
		        		
		             });*/
		       };
		       
		       scope.setContractPeriodForHardwareWhileCrm = function(planData){
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
		  	    
		  	  scope.setContractPeriodWhileCrm = function(planData1){
		  	    	if(scope.isCrm == true){
		  	    		    scope.formData1.paytermCode1 = planData1.chargeCycle;
		  	    		  for (var i in data.subscriptiondata) {
			                 	if(data.subscriptiondata[i].Contractdata == 'Perpetual'){
			                 		scope.formData1.contractPeriod=data.subscriptiondata[i].id;
			                 		break;
			                 	} 
			               };
		  	    	}
		  	    };
		       
		      scope.submit = function(){
		    	  scope.formData.clientServiceDetails = [];
		    	  scope.finalData.clientData = [];
		    	  scope.finalData.clientServiceData =[];
		    	  scope.finalData.deviceData = [];
		    	  scope.finalData.planData = [];
		    	  
		    	  /*if(scope.isCrm == true){
				        scope.formData.paytermCode = 'Monthly';
				        scope.formData1.paytermCode = 'Monthly';
				        scope.formData.contractPeriod = 1;
				        scope.formData1.contractPeriod = 1;
			        }*/
		    	  
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
								 //parameterValue: scope.serviceDetail[i].paramValue,
								 parameterValue: scope.parameterValue,
								 casName:scope.casName,
							});
		    	   }
		    	  
		    	  scope.clintServiceData = {
		    			 "clientServiceDetails": scope.formData.clientServiceDetails,
		    			 "serviceId":scope.formData.serviceId,
		    			 "accountNo":scope.accountNo,
		    			 "clientPoId":scope.clientPoId
			      };
		    	  scope.finalData.clientServiceData.push(scope.clintServiceData);
		    	  
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
		        	
			    	//normal plan
		        	
			    	/*this.formData1.locale = scope.optlang.code;
		           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		            this.formData1.dateFormat = 'dd MMMM yyyy';
		            this.formData1.start_date = reqDate;*/
		            
		            /*if(scope.formData1.isPrepaid == 'Y'){
		          	  for (var i in scope.paytermDatas) {
	                   	if(scope.paytermDatas[i].duration == this.formData1.contractPeriod){
	                   		 this.formData1.paytermCode=scope.paytermDatas[i].paytermtype; 
	                   	}
		              };
		                this.formData1.billAlign=false;
			          }
		            
		            for (var i in scope.subscriptiondatas) {
	                 	if(scope.subscriptiondatas[i].Contractdata == scope.formData1.contractPeriod){
	                 		 this.formData1.contractPeriod=scope.subscriptiondatas[i].id;
	                 		
	                 	}
	                };*/ 
	                if(scope.isCrm == false){
		                if(scope.formData1.isPrepaid == 'Y'){
			        		scope.formData1.contractPeriod = scope.formData1.contractPeriodId;
			        		scope.formData1.billAlign=false;
			        	}else{
			        		for (var i in scope.subscriptiondatas) {
			                   	if(scope.subscriptiondatas[i].Contractdata == 'Perpetual'){
			                   		 scope.formData1.contractPeriod=scope.subscriptiondatas[i].id;
			                   	}
			        		};
			        	}
		                
		                scope.formData1.paytermCode1 = scope.paytermCode1;
	                }
	                
		            
		            for(var i in scope.availablePlans){
			    		   if(scope.availablePlans[i].id == scope.formData1.planCode){
			    			   scope.planName = scope.availablePlans[i].planCode;
			    			   scope.planPoId = scope.availablePlans[i].planPoId;
			    			   scope.dealPoId = scope.availablePlans[i].dealPoId;
			    			   scope.planTypeName = scope.availablePlans[i].planTypeName;
			    			   break;
			    		   }
			    	   }
		            
		            scope.finalData.normalPlnData = {
			    			   "billAlign":false,
			    			   "autoRenew":"",
			    			   "planCode":scope.formData1.planCode,
			    			   "planName":scope.planName,
			    			   "planPoId":scope.planPoId,
			    			   "dealPoId":scope.dealPoId,
			    			   "contractPeriod":scope.formData1.contractPeriod,
			    			   "paytermCode":scope.formData1.paytermCode1,
			    			   "clientServiceId": scope.clientServiceId,
			    			   "isNewplan":true,
			    			   "planTypeName":scope.planTypeName,
			    			   "locale":scope.optlang.code,
			    			   "dateFormat": "dd MMMM yyyy",
			    			   "start_date":dateFilter(new Date(),'dd MMMM yyyy'),
			    			   
			    	};
		          
		            scope.finalData.planData.push(scope.finalData.normalPlnData);
			    	delete scope.finalData.normalPlnData;
			    	
		        	//Hardware plan
		        	scope.flag = true;
		        	this.formData.locale = scope.optlang.code;
		           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		            this.formData.dateFormat = 'dd MMMM yyyy';
		            this.formData.start_date = reqDate;
		            
		            /*if(scope.formData.isPrepaid == 'Y'){
		          	  for (var i in scope.paytermdatas) {
	                   	if(scope.paytermdatas[i].duration == this.formData.contractPeriod){
	                   		 this.formData.paytermCode=scope.paytermdatas[i].paytermtype; 
	                   	}
		              };  
			              this.formData.billAlign=false;
			          }
		            

	                for (var i in scope.subscriptiondatas) {
	                 	if(scope.subscriptiondatas[i].Contractdata == scope.formData.contractPeriod){
	                 		 this.formData.contractPeriod=scope.subscriptiondatas[i].id;
	                 		
	                 	}
	                };*/ 
	                if(scope.isCrm == false){
		                if(scope.formData.isPrepaid == 'Y'){
			        		scope.formData.contractPeriod = scope.formData.contractPeriodId;
			        		scope.formData.billAlign=false;
			        	}else{
			        		for (var i in scope.subscriptiondatas) {
			                   	if(scope.subscriptiondatas[i].Contractdata == 'Perpetual'){
			                   		 scope.formData.contractPeriod=scope.subscriptiondatas[i].id;
			                   	}
			        		};
			        	}
		                scope.formData.paytermCode = scope.paytermCode;
	                }
		            
		            for(var i in scope.availablePlan){
			    		   if(scope.availablePlan[i].id == scope.formData.planCode){
			    			   scope.planName = scope.availablePlan[i].planCode;
			    			   scope.planPoId = scope.availablePlan[i].planPoId;
			    			   scope.dealPoId = scope.availablePlan[i].dealPoId;
			    			   scope.planTypeName = scope.availablePlan[i].planTypeName;
			    			   break;
			    		   }
			    	   }
		            /*delete this.formData.planId;
		            this.formData.id;
		            delete this.formData.isPrepaid;*/
		            
		            scope.finalData.plnData = {
			    			   "billAlign":false,
			    			   "autoRenew":"",
			    			   "planCode":scope.formData.planCode,
			    			   "planName":scope.planName,
			    			   "planPoId":scope.planPoId,
			    			   "dealPoId":scope.dealPoId,
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
			    	
			    	resourceFactory.hardwareplanactivationserviceProcessResource.save({clientId:routeParams.clientId},scope.finalData,function(data){
				    	   location.path('/viewclient/id/'+ routeParams.clientId);
				    		//location.path('/viewclient/' + data.resourceId+'/'+routeParams.id);
				    		
				    });
		    	  
		      };
		       
		       
		 }
	});
	mifosX.ng.application.controller('CreateHardwareServiceActivationController', [
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
	mifosX.controllers.CreateHardwareServiceActivationController]).run(function($log) {
	$log.info("CreateHardwareServiceActivationController initialized");
	});
}(mifosX.controllers || {}));