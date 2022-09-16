(function(module) {
	mifosX.controllers = _.extend(module,{
		EditClientAddressController : function(scope,webStorage,routeParams,resourceFactory,dateFilter, location,http,API_VERSION,$rootScope,PermissionService,Upload,filter) {
							
							scope.formData = {};
							scope.oldProperty = {};
							scope.addressTypeData=[];
							scope.propertyCodes = [];
							scope.clientId = routeParams.id;
						    scope.walletConfig = webStorage.get('is-wallet-enable');
						    scope.propertyMaster = webStorage.get("is-propertycode-enabled");
						    scope.addresses = [];
						    var clientData = webStorage.get('clientData');
				            scope.displayName=clientData.displayName;
				            scope.hwSerialNumber=clientData.hwSerialNumber;
				            scope.statusActive=clientData.statusActive;
				            scope.accountNo=clientData.accountNo;
				            scope.officeName=clientData.officeName;
				            scope.balanceAmount=clientData.balanceAmount;
				            scope.currency=clientData.currency;
				            scope.imagePresent=clientData.imagePresent;
				            scope.categoryType=clientData.categoryType;
					        scope.email=clientData.email;
					        scope.phone=clientData.phone;
					        scope.image=clientData.image;
					        scope.addrId=routeParams.id;
					        var endjson=[];
					        scope.addressJson={};
						
					        scope.addressTypeChangeFun = function(type){
					        	console.log(type);
					        	scope.formData = {};
								for(var i in scope.addresses){
									if(type == scope.addresses[i].addressType){
										console.log(scope.addresses[i].addressType)
										console.log(scope.addresses[i]);
										  scope.formData=angular.copy(scope.addresses[i]); break;
									}
								}
								
							}   
					        
						   resourceFactory.addressEditResource.getAll({clientId: routeParams.id} , function(data) {	
                              
                                scope.addressTypeData=data.addressOptionsData;
                                scope.cityDatas=data.cityData;
                                scope.primaryAddress = data.datas[0];
                                scope.billingAddress = data.datas[1];
                                scope.addresses = angular.copy(data.datas); 
                               scope.addressTypeChangeFun("PRIMARY");
                               scope.addressTypeChangeFun("BILLING");
							});		
							
							
							
							scope.getStateAndCountry=function(city,addressType){
								scope.formData.state = '';
        	            		scope.formData.country = '';
        	            		console.log(addressType);
						      	  resourceFactory.AddressTemplateResource.get({city : city}, function(data) {
						      		if(addressType){
						          		scope.primaryAddress.state = data.state;
						          		scope.primaryAddress.country = data.country;
						          		scope.primaryAddress.district = data.district;
						          	}else {
						          	  scope.billingAddress.state = data.state;
						          		scope.billingAddress.country = data.country;
						          		scope.billingAddress.district = data.district;
						          	}
						      	  });
						        };
						         scope.getPropertyCode = function(query){
							        	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
							        	      params: {
							        	    	  		query: query
							        	      		   }
							        	    }).then(function(res){   
							        	    	 scope.propertyCodes=res.data;				 
							        	      return scope.propertyCodes;
							        	    });
						         };   
						         
						        scope.getPropertyDetails=function(propertyCode){

						         if(propertyCode!=undefined){
						        		
						         /*  if(propertyCode == scope.oldProperty.addressNo){
					        		 console.log("old:"+propertyCode);
					        		 scope.formData.street = scope.oldProperty.street;
					        		 scope.formData.city = scope.oldProperty.city;
					        	     scope.formData.state = scope.oldProperty.state;
				        			 scope.formData.country = scope.oldProperty.country;
				        			 scope.formData.zip = scope.oldProperty.zip;
				        				 
					            	 }*/
						        		
						        	for(var i in scope.propertyCodes){
						        		if(scope.propertyCodes[i].propertyCode == propertyCode){
						        			 scope.formData.street = scope.propertyCodes[i].street;
						        			 scope.formData.city  =  scope.propertyCodes[i].precinct; 
						        			 scope.formData.state = scope.propertyCodes[i].state;
						        			 scope.formData.country = scope.propertyCodes[i].country;
						        			 scope.formData.zip = scope.propertyCodes[i].poBox;
						        			 scope.formData.district = scope.propertyCodes[i].district;
						        			 break;
						        		}else{
						        			delete scope.formData.street;
						        			delete scope.formData.city;
						        			delete scope.formData.state;
						        			delete scope.formData.country;
						        			delete scope.formData.zip;
						        			delete scope.formData.district;
						        		}
						        	}
						        	}else{
						        		delete scope.formData.street;
					        			delete scope.formData.city;
					        			delete scope.formData.state;
					        			delete scope.formData.country;
					        			delete scope.formData.zip;
					        			delete scope.formData.district;
						        	}
						        };
						        
						        
						        
						      /*  scope.selectAction = function(value) {
							            console.log(scope.formData.addressType);
							        
										scope.formData ={};
							       console.log(scope.formData.addressType);
								    	if(value == 'PRIMARY'){
							    			 scope.formData = {
								    		            "address":scope.addressNo,
								    		            "street":scope.street,
								    		            "city":scope.city,
								    		            "state":scope.state,
								    		            "country":scope.country,
								    		            "district":scope.district,
								    		            "zipCode":scope.zipCode,
								    		            "type":"PRIMARY"
							    			 }
							    			 
								    	} 
								    	else if(value == 'BILLING')
								    		scope.formData = {
						    		            "address":scope.addressNo,
						    		            "street":scope.street,
						    		            "city":scope.city,
						    		            "state":scope.state,
						    		            "country":scope.country,
						    		            "district":scope.district,
						    		            "zipCode":scope.zipCode,
						    		            "type":"BILLING"
					    			 }
								    	
							           
							        };*/
					        
						      
							scope.submit = function() {
								console.log("hello");
								
								
								endjson.push(scope.primaryAddress);
								endjson.push(scope.billingAddress);
								console.log(JSON.stringify(endjson));
								
								
								scope.addressJson.addressJson = endjson;
								this.formData.entityName='EnterName';
								this.formData.parentEntityId='-1';
								this.formData.entityCode='EnterCode';
								this.formData.zipCode=this.formData.zip;
								delete this.formData.addressOptionsData;
								delete this.formData.cityData;
								delete this.formData.datas;
								delete this.formData.addressKey;
								delete this.formData.zip;
								delete this.formData.addressKey;
								delete this.formData.addressTypeId;
								
								resourceFactory.addressNewEditResource.update({addrId: scope.formData.id}, scope.addressJson,function(data){
											/*location.path('/viewclient/id/'
													+ routeParams.clientId);*/
									
									
								 //location.path('/viewclient/id/' + data.resourceId+'/'+routeParams.id+'/'+routeParams.clientId); 
								   //location.path('/viewclient/' + data.resourceId+'/'+routeParams.clientId); 
								 location.path('/viewclient/id/'+ routeParams.id); 
								
										});
							};
						}
					});
	mifosX.ng.application.controller('EditClientAddressController',
			['$scope',
			 'webStorage', 
			 '$routeParams', 
			 'ResourceFactory',
			 'dateFilter', 
			 '$location',
			 '$http', 
             'API_VERSION',
             '$rootScope',
             'PermissionService',
             'Upload',
             '$filter',
              mifosX.controllers.EditClientAddressController]).run(function($log) {
	    $log.info("EditClientAddressController initialized");
	  });
	
}(mifosX.controllers || {}));