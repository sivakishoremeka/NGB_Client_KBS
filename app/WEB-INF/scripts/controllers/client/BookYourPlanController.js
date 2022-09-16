(function(module) {
  mifosX.controllers = _.extend(module, {
	  BookYourPlanController: function(scope,webStorage, resourceFactory, location, translate,dateFilter,routeParams,$rootScope,http,API_VERSION,Upload, $uibModal) {

		  scope.clientId = routeParams.clientId;
		  scope.formData={};
		  scope.itemDatas = [];
		  scope.pairableItemDetails = [];
		  scope.pairableFormData = {};
		  scope.finalData = {};
		  scope.details = {};
		  scope.isPairable = false;
	      scope.availableProductPacks = [];
	      scope.totalAvailableProductPacks = [];
	      scope.selectedProductPacks = [];
	      scope.availableProducts = [];
	      scope.totalAvailableProducts = [];
	      scope.selectedProducts = [];
	      scope.availableChannel = [];
	      scope.selectedChannel = [];
	      scope.dummyAvailableProducts = [];
	      scope.serviceDatas = {};
	      scope.saleDate = new Date();
	      scope.subscriptiondatas = [];
	      scope.planData = [];
	      
	      
	      scope.channelCategorys = ["English News","English Entertainment","English Movies","English Music","English Sports",
	    	                          "Hindi News","Hindi Entertainment","Hindi Movies","Hindi Music","Hindi Sports",
	    	                          "Telugu News","Telugu Entertainment","Telugu Movies","Telugu Music","Telugu Sports","Tamil News","Tamil Entertainment","Tamil Movies","Tamil Music",
	    	                          "Kanada News","Kanada Entertainment","Kanada Movies","Kanada Music","Other News","Other Entertainment","Other Movies","Other Music","Other Sports","Gujarathi Entertainment",
	    	                          "Malayalam News","Malayalam Entertainment","Malayalam Movies","Malayalam Music", "Marathi Entertainment","Bangla Entertainment","MP Entertainment","Odia Entertainment",
	    	                          "Bihar Enterainment","Rajasthan Entertainment","Urdu Entertainment","UP Entertainment","Punjabi Entertainment"];
	     
	      
	      /*webstorage clientData*/
		      var clientData = webStorage.get('clientData');
		      if(webStorage.get('clientData')){
				    scope.accountNo=clientData.accountNo;
				    scope.clientPoId = clientData.poId;
				    scope.paytermCodeId = clientData.chargeCycleId;
				    scope.paytermCode = clientData.chargeCycle;
		  		}
	      
	      /*END*/
		  
		  /* Global Configuration for isService*/
			  scope.globalConfigs =  webStorage.get("global_configuration")
		        for(var i in scope.globalConfigs){
		        	if(scope.globalConfigs[i].name == "isService"){
		        		scope.serviceValue = scope.globalConfigs[i].value;
		        		var serviceValues = scope.serviceValue;
		        		var services = JSON.parse(serviceValues);
		        		scope.serviceType = services.serviceType;
		        		scope.serviceParamName = services.serviceParamName;
		        		scope.isService = scope.globalConfigs[i].enabled;
		        		break;
		        	}
		      };
	      /*END*/
	  
		  /* These functions are used for Devices */
		      
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
		            scope.subscriptiondatas = data.contractPeriods;
		        });
		      
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
			        		   if(scope.isService == true){
			        			   scope.getServiceDetails(serialNum);
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
         /*END*/
          
         /*These functions are used for serviceDetails if isService is Enable*/
	          scope.getServiceDetails = function(serialNum){
	         	resourceFactory.serviceDetailsResource.get({serialNumber:serialNum,'serviceType':scope.serviceType,'serviceParamName':scope.serviceParamName},function(data) {
				      scope.serviceDatas = data;
	         	});
	          };
	     /*END*/
	          
	      /*this function is used for service details if isService Disable*/ 
	          if(scope.isService == false){
		    	  resourceFactory.clientserviceTemplateResource.get(function(data) {
					  scope.serviceData = data.serviceData;
				  });
				  
				  scope.getBothService = function(serviceCode, serviceDescription){
					  return serviceCode+"--"+serviceDescription;
				  };
				  
				  scope.changeServiceFun = function(){
					  resourceFactory.clientserviceparamResource.get({serviceId: scope.formData.serviceId,paramCategory:"S"}, function(data) {
						  scope.serviceDetail = angular.copy(data);
						  scope.details = data;
					  });
				  };
	          }
	      /*END*/

	         
	     /*This is for Packs and Alacarte Packes*/  
	          
	          //This Function is for Bouque Products
	          
	          resourceFactory.planProductBouqueResource.get(function(data) {
	        	  scope.availableProductPacks = data;
	        	  scope.totalAvailableProductPacks = data;
	        	  
	        	  var channels = {};
	        	  var products = {};
	        	  
	        	  for (var i = 0; i < scope.availableProductPacks.length; i++) {
	        		var temp = {};
	        	    var productid = scope.availableProductPacks[i].productId;
	        	    
	        	    if (!channels[productid]) {
	        	    	channels[productid] = [];
	        	    }
	        	    
	        	    if (!products[productid]) {
	        	    	products[productid] = [];
	        	    }
	        	    
	        	    products[productid].productCode = scope.availableProductPacks[i].productcode;
	        	    products[productid].productdescription = scope.availableProductPacks[i].productDescription;
	        	    products[productid].planId = scope.availableProductPacks[i].id;
	        	    products[productid].planCode = scope.availableProductPacks[i].planCode;
	        	    products[productid].planDescription = scope.availableProductPacks[i].planDescription;
	        	    products[productid].isPrepaid = scope.availableProductPacks[i].isPrepaid;
	        	    products[productid].serviceId = scope.availableProductPacks[i].serviceId;
	        	    temp.channelId = scope.availableProductPacks[i].channelId;
	        	    temp.channelName = scope.availableProductPacks[i].channelname;
	        	    temp.isHdChannel = scope.availableProductPacks[i].isHdChannel
	        	    channels[productid].push(temp);
	        	    //channels[productid].push(scope.availableProductPacks[i].channelId);
	        	  }
	        	  scope.availableProductPacks = [];
	        	  for (var productid in channels) {
	        			  scope.availableProductPacks.push({productId: parseInt(productid),productcode:products[productid].productCode,productDescription:products[productid].productdescription,planId:products[productid].planId,planCode:products[productid].planCode,planDescription:products[productid].planDescription,isPrepaid:products[productid].isPrepaid,serviceType:products[productid].serviceId, channels: channels[productid]});  	  
	        	  }
	        	  console.log(scope.availableProductPacks);
	          });
	           
	        
	          scope.getBothProduct = function(productcode, productDescription){
				  return productcode+"--"+productDescription;
	          };
	          
	          scope.restrict = function(){
		    	   
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availableProductPacks){
		                    if(scope.availableProductPacks[j].productId == this.allowed[i])
		                    {  
		                    	
		                    	var temp = {};
		                        temp.productId = this.allowed[i];
		                        temp.productcode = scope.availableProductPacks[j].productcode;
		                        temp.productDescription = scope.availableProductPacks[j].productDescription;
		                        temp.channels = scope.availableProductPacks[j].channels;
		                        temp.planId = scope.availableProductPacks[j].planId;
		                        temp.planCode = scope.availableProductPacks[j].planCode;
		                        temp.planDescription = scope.availableProductPacks[j].planDescription;
		                        temp.isPrepaid = scope.availableProductPacks[j].isPrepaid;
		                        temp.serviceType = scope.availableProductPacks[j].serviceType;
		                        scope.selectedProductPacks.push(temp);
		                        scope.availableProductPacks.splice(j,1);
		                       
		                    }
		                }
		            }
		            scope.count(scope.selectedProductPacks);
		        }
		        
		        
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedProductPacks){
		                    if(scope.selectedProductPacks[j].productId == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.productId = this.restricted[i];
		                        temp.productcode = scope.selectedProductPacks[j].productcode;
		                        temp.productDescription = scope.selectedProductPacks[j].productDescription;
		                        temp.channels = scope.selectedProductPacks[j].channels;
		                        temp.planId = scope.selectedProductPacks[j].planId;
		                        temp.planCode = scope.selectedProductPacks[j].planCode;
		                        temp.planDecription = scope.selectedProductPacks[j].planDecription;
		                        temp.isPrepaid = scope.selectedProductPacks[j].isPrepaid;
		                        temp.serviceType = scope.selectedProductPacks[j].serviceType;
		                        scope.availableProductPacks.push(temp);
		                        scope.selectedProductPacks.splice(j,1);
		                    }
		                }
		            }
		            scope.count(scope.selectedProductPacks);
		        }
		        
		        /*This function is used to count number selected product packs*/
			        scope.count = function(selectedPack){
			        	var selectedPacks = selectedPack;
			        	scope.selectedPacks = selectedPacks;
			           scope.formData.count = 0;
			           //scope.formData.count = scope.selectedPacks.length;
			           for(var i in scope.selectedPacks){
			        	   for(var j in scope.selectedPacks[i].channels){
			        		   if( scope.selectedPacks[i].channels[j].isHdChannel == true){
					        	   scope.formData.count= scope.formData.count+2;
					           }else{
					        	    scope.formData.count++;
					           }
			        	   }
			        	} 
			        }
		        /**/
		        
		        /*This function is used to remove alcarte channels based on selectedProductPack channels*/
			        scope.selectedProductChannels = function(){
			        	for(var k in scope.selectedProductPacks){
			        		for(var i in scope.selectedProductPacks[k].channels){
				        		for(var j in scope.availableProducts){
				        			if(scope.availableProducts[j].channelId==scope.selectedProductPacks[k].channels[i].channelId){
				        				var temp = {};
				        				temp = scope.availableProducts[j].channelId;
				        				scope.availableChannel.push(temp);
				        				scope.availableProducts.splice(j,1);
				        			}
				        		}
				        		for(var l in scope.selectedProducts){
				        			if(scope.selectedProducts[l].channelId==scope.selectedProductPacks[k].channels[i].channelId){
				        				var temp = {};
				        				temp = scope.selectedProducts[l].channelId;
				        				scope.selectedChannel.push(temp);
				        				scope.selectedProducts.splice(l,1);
				        			}
				        		}
				        		
				        	}
			        	}
			        	scope.count1(scope.selectedProducts);
			        	
			        }
		        /*END*/
		        
		        /*This function is used to add alcarte channels which will removed based on selectedProductPack channels*/
			        scope.removedProductChannels = function(){
			        	for(var k in scope.availableProductPacks){
			        		for(var i in scope.availableProductPacks[k].channels){
				        		for(var j in scope.availableChannel){
				        			if(scope.availableChannel[j] == scope.availableProductPacks[k].channels[i].channelId){
				        				for(var m in scope.dummyAvailableProducts){
				        					if(scope.dummyAvailableProducts[m].channelId == scope.availableChannel[j]){
				        						scope.availableProducts.push(scope.dummyAvailableProducts[m]);
					        					var availableProducts = _.uniq(scope.availableProducts,"channelId");
					        					scope.availableProducts = availableProducts;
				        					}
				        				}
				        			}
				        		}
				        		for(var l in scope.selectedChannel){
				        			if(scope.selectedChannel[l] == scope.availableProductPacks[k].channels[i].channelId){
				        				for(var m in scope.dummyAvailableProducts){
				        					if(scope.dummyAvailableProducts[m].channelId == scope.selectedChannel[l]){
				        						scope.selectedProducts.push(scope.dummyAvailableProducts[m]);
				        						var selectedProducts = _.uniq(scope.selectedProducts,"channelId");
				        						scope.selectedProducts = selectedProducts;
				        					}
				        				}
				        			}
	
				        		}
				        	}
			        	}
			        	scope.count1(scope.selectedProducts);
			        }
		        /**/
		        
	          //END
	          
	          
		      //This Function is for Non Bouque Products
		        
	              resourceFactory.planProductNonBouqueResource.get(function(data) {
	            	  scope.availableProducts = data;
	            	  scope.totalAvailableProducts = data;
	            	  scope.dummyAvailableProducts = angular.copy(data);	            	  
		          });
	              
	              scope.getBothProducts = function(productcode, productDescription){ 	
					  return productcode+"--"+productDescription;
		          };
		          
		          scope.removeSelectedProductsFromAvailable = function(){
				    	 
				    	 for(var i in scope.availableProducts){
				    		 for(var j in scope.selectedProducts){
				    			 if(scope.availableProducts[i].productId == scope.selectedProducts[j].productId){
				    				 scope.availableProducts.splice(i,1);break; 
				    			 }
				    		 }
				    		 
				    	 }
				     }
		          
		          scope.channelCategoryChangeFun = function(){
				    	 scope.availableProducts = [];
				    	 for(var i in scope.totalAvailableProducts){
				    		 if(scope.totalAvailableProducts[i].channelCategory == scope.formData.channelCategory){
				    			 scope.availableProducts.push(scope.totalAvailableProducts[i]);
				    		 }
				    	 }
				    	 scope.removeSelectedProductsFromAvailable();
				     }
		          
		          scope.restricts = function(){
			    	   
			            for(var i in this.allowed)
			            {
			                for(var j in scope.availableProducts){
			                    if(scope.availableProducts[j].productId == this.allowed[i])
			                    {
			                    	var temp = {};
			                        temp.productId = this.allowed[i];
			                        temp.productcode = scope.availableProducts[j].productcode;
			                        temp.productDescription = scope.availableProducts[j].productDescription;
			                        temp.isHdChannel = scope.availableProducts[j].isHdChannel;
			                        temp.channelId = scope.availableProducts[j].channelId;
			                        temp.serviceType = scope.availableProducts[j].serviceId;
			                        scope.selectedProducts.push(temp);
			                        scope.availableProducts.splice(j,1);
			                    }
			                }
			            }
			            scope.count1(scope.selectedProducts);
			      }
	              
			      scope.allows = function(){
			            for(var i in this.restricted)
			            {
			                for(var j in scope.selectedProducts){
			                    if(scope.selectedProducts[j].productId == this.restricted[i])
			                    {
			                        var temp = {};
			                        temp.productId = this.restricted[i];
			                        temp.productcode = scope.selectedProducts[j].productcode;
			                        temp.productDescription = scope.selectedProducts[j].productDescription;
			                        temp.isHdChannel = scope.selectedProducts[j].isHdChannel;
			                        temp.channelId = scope.selectedProducts[j].channelId;
			                        temp.serviceType = scope.selectedProducts[j].serviceId;
			                        scope.availableProducts.push(temp);
			                        scope.selectedProducts.splice(j,1);
			                    }
			                }
			            }
			            scope.count1(scope.selectedProducts);
			        }
			        
			    /*This function is used to count number selected products*/
			        scope.count1 = function(Product){
			        	var Products = Product;
			        	scope.Products = Products;
			        	scope.formData.count1 = 0;
			        	for(var k in scope.Products){
				           if(scope.Products[k].isHdChannel == true){
				        	   scope.formData.count1= scope.formData.count1+2;
				           }else{
				        	    scope.formData.count1++;
				           }
			        	}   
				    }
		       /*END*/
			        
	          //END
              
         /*END*/
			        //calculate
			        scope.calculate = function(){
			        	  var temp = {};
			        	for(var i in scope.selectedProductPacks){
		        		       temp.isPrepaid = scope.selectedProductPacks[i].isPrepaid;
			    			   temp.planId = scope.selectedProductPacks[i].planId;
			    			   temp.planCode = scope.selectedProductPacks[i].planCode;
			    			   temp.planDescription = scope.selectedProductPacks[i].planDescription;
			    			   break;
			    	   }
			        	if(temp.isPrepaid == 'Y'){
			        		scope.formData.contaractPeriod = scope.paytermCodeId;
			        	}else{
			        		for (var i in scope.subscriptiondatas) {
			                   	if(scope.subscriptiondatas[i].subscriptionPeriod == 'Perpetual'){
			                   		 scope.contractPeriod=scope.subscriptiondatas[i].id;
			                   	}
			        		}
			        	}
			        	
			        	scope.finalData = {
		    			"contractPeriod" : scope.contractPeriod,
		    			"paytermCode" :  scope.paytermCode,
			        	"planCode" : temp.planId,
		    			"planName" : temp.planCode,
			        	"bouqueProductsCount" : scope.formData.count,
			            "nonBouqueProductsCount" : scope.formData.count1,
			            "bouqueProducts"  : scope.selectedProductPacks,
			            "nonBouqueProducts" :  scope.selectedProducts,
			            "clientId":routeParams.clientId,
			        	};
			        	
			        	 resourceFactory.slabrateresource.save(scope.finalData,function(data){
			        	
			        		 $uibModal.open({
				                  templateUrl: 'calculation.html',
				                  controller: CalculationController,
				                 resolve:{
				                	 changes:function(){
				                		  return data.changes;
				                		 }
				    	   
				                  }
				              });
			        	 });
			        	 
			        	
			        	

			        }
			        
			        
			        
			        
			        var CalculationController = function ($scope, $uibModalInstance,changes) {
			        	 $scope.formDatas = {};
					       $scope.formDatas.bouqueprices = changes.bouqueprices;
				    	   $scope.formDatas.nonBouqueprices = changes.nonBouqueprices;
				    	   $scope.formDatas.slabPrice = changes.slabPrice;
				    	   $scope.formDatas.total = changes.total;
			        	 $scope.cancelQuantity = function () {
				    		   $uibModalInstance.dismiss('cancel');
				    	   };
			        };
				    	   
				    	   
				       
			        
	                //save
		         scope.submit = function(){
			    	   console.log(scope.itemDetail);
			    	   scope.formData.clientServiceDetails = [];
			    	   scope.finalData.clientServiceData =[];
			    	   console.log(scope.finalData.clientServiceData);
			    	   scope.finalData.deviceData = [];
			    	   scope.finalData.planData = [];
			    	   scope.products = [];
        		       var temp = {};
			    	
        		       /* Json for service*/
			    	   if(scope.isService == false){
			    	   for(var i in scope.serviceDetail){
			    		   scope.casName = {};
			    		     for(var j in scope.serviceDetail[i].details){
			    		    	 if(scope.serviceDetail[i].details[j].id == scope.serviceDetail[i].paramValue){
			    		    		 scope.casName = scope.serviceDetail[i].details[j].mCodeValue;break;
			    		    	 }
			    		     }
			        		 scope.formData.clientServiceDetails
								.push({
									 status: 'new',
									 parameterId: parseInt(scope.serviceDetail[i].paramName),
									 parameterValue: scope.serviceDetail[i].paramValue,
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
			    	   
			          }else{
			        	  scope.formData.clientServiceDetails
							.push({
								 status: 'new',
								 parameterId: scope.serviceDatas.paramName,
								 parameterValue: scope.serviceDatas.provisioningId,
								 casName:scope.serviceDatas.systemCode,
							});
			        	  scope.clintServiceData = {
					    			 "clientServiceDetails": scope.formData.clientServiceDetails,
					    			 "serviceId":scope.serviceDatas.serviceId,
					    			 "accountNo":scope.accountNo,
					    			 "clientPoId":scope.clientPoId
					    	   };
				          scope.finalData.clientServiceData.push(scope.clintServiceData);
				          console.log(scope.finalData.clientServiceData);
				          
			          	}
			    	   /*END*/
			    	   
			    	   /*Json for Devices*/
			    	   scope.deviceData ={};
			    	    scope.deviceData.locale = scope.optlang.code;
			    	    scope.deviceData.dateFormat = "dd MMMM yyyy";
			    	    scope.deviceData.officeId = routeParams.officeId;
			    	    scope.deviceData.itemId = scope.formData.itemId;
			    	    scope.deviceData.chargeCode = scope.formData.chargeCode;
			    	    scope.deviceData.unitPrice = scope.formData.unitPrice;
			    	    scope.deviceData.quantity = scope.formData.quantity;
			    	    scope.deviceData.discountId = scope.formData.discountId;
			    	    scope.deviceData.totalPrice = scope.formData.totalPrice;
			    	    
			        	scope.deviceData.saleType = "NEWSALE";
			        	scope.deviceData.saleDate = dateFilter(scope.saleDate,"dd MMMM yyyy");
			        	for(var i in scope.itemDatas){
			        		if(scope.itemDatas[i].id == scope.formData.itemId){
			        			scope.itemType1 = scope.itemDatas[i].itemClassName;
			        		}
			        		if(scope.itemDatas[i].id == scope.pairableFormData.itemId){
			        			scope.pairableFormData.itemType = scope.itemDatas[i].itemClassName;
			        		}
			        	}
			        	scope.deviceData.serialNumber = [{
							serialNumber 	: scope.itemDetail,
							status 			: "allocated", 
							saleType        : "NEWSALE",
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
			        		scope.deviceData.pairableItemDetails.saleType = "NEWSALE";
			        		scope.deviceData.pairableItemDetails.saleDate = dateFilter(scope.saleDate,"dd MMMM yyyy");
			        		scope.deviceData.pairableItemDetails.clientServiceId = scope.formData.clientServiceId;
			        		scope.deviceData.pairableItemDetails.isPairing = "N";
			        		scope.deviceData.pairableItemDetails.serialNumber = [];
			        		scope.deviceData.pairableItemDetails.serialNumber.push({
							serialNumber 	: scope.pairableSerialNo,
							status 			: "allocated", 
							saleType        : "NEWSALE",
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
			        	/*END*/

		      

			        	/*Json for plans*/
			        	for(var i in scope.selectedProductPacks){
			        		       temp.isPrepaid = scope.selectedProductPacks[i].isPrepaid;
				    			   temp.planId = scope.selectedProductPacks[i].planId;
				    			   temp.planCode = scope.selectedProductPacks[i].planCode;
				    			   temp.planDescription = scope.selectedProductPacks[i].planDescription;
				    			   break;
				    	   }
			        	if(temp.isPrepaid == 'Y'){
			        		scope.formData.contaractPeriod = scope.paytermCodeId;
			        	}else{
			        		for (var i in scope.subscriptiondatas) {
			                   	if(scope.subscriptiondatas[i].subscriptionPeriod == 'Perpetual'){
			                   		 scope.contractPeriod=scope.subscriptiondatas[i].id;
			                   	}
			        		}
			        	}
			        	scope.formData.paytermCode = scope.paytermCode;
			        	scope.formData.contractPeriod = scope.contractPeriod;
			        	scope.formData.planCode = temp.planId;
			        	scope.formData.planName = temp.planCode;
			        	
			        	/*converting array of objects to object*/
				        	for(var i in scope.selectedProductPacks){
				        		scope.product = scope.selectedProductPacks[i];
				        		scope.products.push(scope.product);
				        	}
				        	
				        	for(var i in scope.selectedProducts){
				        		scope.product = scope.selectedProducts[i];
				        		scope.products.push(scope.product);
				        	}
			        	/*END*/
			        	
				        	
			        	scope.finalData.plnData = {
				    			   "billAlign":false,
				    			   "autoRenew":"",
				    			   "planCode":scope.formData.planCode,
				    			   "planName":scope.formData.planName,
				    			   "planPoId":scope.planPoId,
				    			   "dealPoId":scope.dealPoId,
				    			   "contractPeriod":scope.formData.contractPeriod,
				    			   "paytermCode":scope.formData.paytermCode,
				    			   "isNewplan":true,
				    			   "locale":scope.optlang.code,
				    			   "dateFormat": "dd MMMM yyyy",
				    			   "start_date":dateFilter(new Date(),'dd MMMM yyyy'),
				    			   "products":scope.products,
				    			   "bouqueCount":scope.formData.count,
				    			   "nonBouqueCount":scope.formData.count1,
				    			   
				    	   };
				    	  scope.finalData.planData.push(scope.finalData.plnData);
				    	  delete scope.finalData.plnData;
				    	  console.log(scope.finalData.planData);
			    	   /*END*/
				    	  
				    	  resourceFactory.simpleactivationserviceProcessResource.save({clientId:routeParams.clientId},scope.finalData,function(data){
					    	   location.path('/viewclient/id/'+ routeParams.clientId);
					    	   },function(errors) {
					    		    	  if(errors.data.errors!=null){
					    					scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
					    	        	  }else{
					    	        		  scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
					    	        	  }
					    	  		});
				    	  
		          }
	  }
  });
  mifosX.ng.application.controller('BookYourPlanController', ['$scope', 'webStorage','ResourceFactory', '$location', '$translate','dateFilter', 
                                                              	'$routeParams','$rootScope','$http','API_VERSION','Upload','$uibModal', mifosX.controllers.BookYourPlanController]).run(function($log) {
    $log.info("BookYourPlanController initialized");
  });
}(mifosX.controllers || {}));
