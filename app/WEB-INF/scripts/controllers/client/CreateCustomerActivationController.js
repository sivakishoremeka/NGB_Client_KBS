(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateCustomerActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION) {
		  
		  scope.offices = [];
		  scope.clientCategoryDatas = [];
		  scope.cities = [];
		  scope.formData={};
		  scope.customerData={};
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
	      scope.finalData = {};
	      scope.formData.clientServiceDetails = [];
	      scope.isPairable = false;
	      scope.activationDate = new Date();
	      scope.error=false;
	      
	      scope.paramValues = ["true","false"];
	      var reqDate = dateFilter(scope.activationDate,'dd MMMM yyyy');
	      //scope.date.saleDate = new Date();
	      scope.start.date = new Date();
	      scope.saleDate = new Date();
		  
		  
		  resourceFactory.clientTemplateResource.get(function(data) {
              //scope.offices = data.officeOptions;
			  
			  scope.idProofs=data.idProofs;
            scope.clientCategoryDatas=data.clientCategoryDatas;
			 for(var i in scope.clientCategoryDatas){
	          	  if(scope.clientCategoryDatas[i].categoryType == "Normal"){
	          		scope.formData.clientCategory = scope.clientCategoryDatas[i].id;break;
	          	  }
	            }
			  
              scope.cities=data.addressTemplateData.cityData;
              scope.flag=data.loginConfigurationProperty.enabled;
           /*   scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.formData.clientCategory=data.clientCategoryDatas[0].id;*/
              
              for(var i in  scope.clientCategoryDatas){
            	  if(scope.clientCategoryDatas[i].categoryType == "Normal"){
            		  scope.formData.clientCategory = scope.clientCategoryDatas[i].id;break;
            	  }
              }
              
          });
		  
		  scope.groupByOffice = function(externalId, name){
	        	return externalId+"--"+name;
	      };
		  
		  scope.getOfficeData = function(query){
			  scope.error = false;
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
		  
		 
         
          resourceFactory.clientserviceTemplateResource.get(function(data) {
				  scope.serviceData = data.serviceData;
          });
          
          scope.getBothService = function(serviceCode, serviceDescription){
			  return serviceCode+"--"+serviceDescription;
		  };
		  
		  scope.changeServiceFun = function(serviceDatas){
			  scope.formData.serviceCode=serviceDatas.serviceCode;
			  resourceFactory.clientserviceparamResource.get({serviceId: serviceDatas.id,paramCategory:"S",'clientId': scope.clientId,}, function(data) {
				 
				  scope.serviceDetail = angular.copy(data);
				  scope.details = data;
			  });
		  };
		  scope.getOneTimeSale = function(){
			  resourceFactory.oneTimeSaleTemplateResource.get({clientId:scope.clientId}, function(data) {
		            scope.clientServiceData = data.clientServiceData;
		            /*for(var i in scope.offices){
		            	if(scope.offices[i].id == officeId){
		            		scope.formData.officeId=scope.offices[i].id;
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
		  };
		  
		  scope.getData = function(query){
			  if(scope.formData.officeId==undefined){
				  console.log(scope.error);
				  scope.error = true;
			  }
			  else{
				  scope.isPairable = false;
		        	delete scope.formData.discountId;
		        	scope.pairableItemDetails = [];
		        	delete scope.pairableSerialNo;
		        	scope.pairableFormData ={};
				  for(var i in scope.officeDetails){
		           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
		           			scope.formData.officeId = scope.officeDetails[i].id;
		           		}
		           	}
				  return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/0/'+scope.formData.officeId, {
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
			  }
		  };
        
        scope.getPairableItemDetails = function(serialNum){
        	scope.itemDetail=serialNum;
          	scope.pairableItemDetails = [];
          	resourceFactory.pairableitemMasterDetailResource.get({serialNo:scope.itemDetail,query:scope.pairableSerialNo},function(data) {
 				 scope.pairableItemDetails = angular.copy(data.serialNumbers);
 			 });
          };
        
           
        scope.getItemData = function(item,model,label){
          	 scope.isPairable = false;
	        	if(item || model || label){
	        		var serialNum = item || model || label;
		        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId,officeId:scope.formData.officeId},function(data) {
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
			        	resourceFactory.orderTemplateResource.get({salesCatalogeId:salesCatalogeId,planId:'0',state:scope.formData.state,country:scope.formData.country},function(data) {
					          scope.plandatas = data.plandata;
					          scope.subscriptiondatas=data.subscriptiondata;
					          scope.paytermdatas=data.paytermdata;
					        });
		  	      }
		        
		        scope.getPlan = function(planCode, planDescription){
		        	return planCode+"--"+planDescription;
		        };
		        scope.setBillingFrequency = function(planData) {
		        	scope.paytermdatas=undefined;
		        	 resourceFactory.orderResource.get({planId:planData.id, template: 'true'} , function(data) {
		        		 
		        		 scope.paytermdatas=data.paytermdata;
		        		 scope.isPrepaidPlanFormData4=data.isPrepaid;
		        		  for (var i in data.subscriptiondata) {
		                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
		                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
		                 	}
		                   
		                  };
		             });
		       };
		       
		       scope.submit = function(){
		    	   scope.customerData.serviceCode=scope.formData.serviceCode;
		    	   scope.customerData.stb_serialNumber=scope.itemDetail;
		    	   scope.customerData.pairable_serialNumber=scope.pairableSerialNo;
		    	   scope.customerData.planCode=scope.plandata.planCode;
		    	   scope.customerData.officeId=scope.formData.officeId;
		    	   for(var i in scope.serviceDetail){
		    	   for(var j in scope.serviceDetail[i].details){
		    		    if(scope.serviceDetail[i].details[j].id == scope.serviceDetail[i].paramValue){
	    		    		 scope.customerData.provisioningSystem = scope.serviceDetail[i].details[j].systemcode;
	    		    		 console.log(scope.customerData.provisioningSystem);break;
	    		    	 }
	    		     }
		    	   }
		    	      resourceFactory.customerActivationResource.save(scope.customerData,function(data){
		            	location.path('/viewclient/id/'+ data.clientId);
		            });
		    	   
		       };
	            

	    
	  }
	  });
mifosX.ng.application.controller('CreateCustomerActivationController', ['$scope',
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
                                                                  mifosX.controllers.CreateCustomerActivationController]).run(function($log) {
    $log.info("CreateCustomerActivationController initialized");
  });
}(mifosX.controllers || {}));