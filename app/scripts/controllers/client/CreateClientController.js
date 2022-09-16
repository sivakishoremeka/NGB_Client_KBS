(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,
    								$rootScope,Upload,filter,$uibModal,PermissionService,webStorage,uiConfigService,routeParams) {
    
    	scope.formData = {};
        scope.offices = [];
        scope.cities = [];
        scope.clientCategoryDatas=[];
        scope.groupNameDatas=[];
        scope.clientId = routeParams.id;

        scope.billingData ={};
        scope.propertyCodes = [];
        scope.parcelData = [];
   	    scope.floorData = [];
   	    scope.buildingData = [];
   	    scope.unitData = [];
   	    scope.property = {};
   	    scope.propertyCodesData =[];

        scope.nationalityDatas = [];
        scope.genderDatas = [];
        scope.customeridentificationDatas = [];
        scope.cummunitcationDatas = [];
        scope.languagesDatas = [];
        scope.ageGroupDatas = [];
        scope.date = {};
        scope.isEmailEnable = false;
        scope.preferences = [];
        scope.xyz ={};
        scope.isCustomerUnderLco=false;
        scope.isParent=false;
        /*scope.response = webStorage.get("uiConfigData");
        console.log(webStorage.get("uiConfigData"));
        if('response.IsClientIndividual' == true){
        	scope.formData.entryType ='IND';
        }else{
        	scope.formData.entryType ='ORP';
        }*/
        var parentClients=[];
        var IsClientIndividual =  webStorage.get('uiConfigData').IsClientIndividual;
        if(IsClientIndividual == 'false'){
        	scope.formData.entryType ='IND';
        }else{
        	scope.formData.entryType ='ORP';
        }
        
        var global_configuration = webStorage.get("global_configuration");//is-selfcareuser
        for(var i in global_configuration){
        	if(global_configuration[i].name == 'is-selfcareuser'){
        		scope.isEmailEnable = global_configuration[i].enabled;
        	}
        	if(global_configuration[i].name == 'isCustomerUnderLco'){
        		scope.isCustomerUnderLco = global_configuration[i].enabled;
        	}
        }
        
    
       
        resourceFactory.clientTemplateResource.get(function(data) {
            //scope.offices = data.officeOptions;
            //scope.formData.officeId = data.officeId;
            scope.cities=data.addressTemplateData.cityData;
            scope.clientCategoryDatas=data.clientCategoryDatas;
            scope.groupNameDatas = data.groupNameDatas;
            scope.formData.clientCategory=scope.clientCategoryDatas[0].id;
            scope.configurationProperty=data.loginConfigurationProperty.enabled;
            scope.preferences = data.preferences;
            scope.idProofs=data.idProofs;
            
            
            if(data.clientAdditionalData){
            scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
            scope.genderDatas= data.clientAdditionalData.genderDatas;
            scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
            scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
            scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
            scope.languagesDatas= data.clientAdditionalData.languagesDatas;
            }
            
            
        });
        scope.officeDetailsFun = function(officeOptions){
        	scope.officeDetails = [];
        	for(var i in officeOptions){
        		if(scope.isCustomerUnderLco){
        			 if(officeOptions[i].officeType=="LCO"){
	        	    	  scope.officeDetails.push(officeOptions[i]);
        			 }
        		}else{
        			 scope.officeDetails.push(officeOptions[i]);
        		}
        		 if(scope.officeDetails.length>=7){
   	    		  break;}
        	}
        }
        scope.getData = function(query){
        	return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
        	      params: {
        	    	  		query: query
        	      		   }
        	    }).then(function(result){
        	    	scope.officeDetailsFun(result.data.officeOptions);
        	    if(scope.officeDetails.length == 0){
        	    	delete scope.formData.name;
        	    	delete scope.formData.nameDecorated;
        	    	delete scope.formData.externalId;
        	    	delete scope.formData.officeType;
        	    }
        	    return scope.officeDetails;
        	});
        };
        
        
        scope.typeChangeFun = function(isCheck){
        	if(isCheck ==true){
        		this.billingData={
                    "addressNo":scope.addressNo,
                    "street":scope.street,
                    "city":scope.city,
                    "state":scope.state,
                    "country":scope.country,
                    "district":scope.district,
                    "zipCode":scope.zipCode,
                    "addressType":"BILLING"
                    	
                    };
                   
        	}else{
           	 this.billingData = {};

        	}
		};
		
		
		
	 scope.getparent = function(query) {
			return http.get($rootScope.hostUrl+ '/ngbplatform/api/v1/parentclient/',{
				params : {query : query}
			}).then(function(res) {
				parentClients = [];
				for ( var i in res.data) {
					parentClients.push(res.data[i]);
					if (i == 7)
						break;
				}
				return parentClients;
			});
		};
		
		
	     
		/*scope.saveParent = function(query) {
			return http.get($rootScope.hostUrl+ '/ngbplatform/api/v1/parentclient/',{
				params : {query : query}
			}).then(function(res) {
				parentClients = [];
			});
		};*/
		
		scope.isParentChecked = function(){
			scope.xyz.parentId = null;
			scope.formData.parentId = null;
			
        };
        scope.individual = function(){
			scope.isParent = false;
			scope.parentClient = null;
			scope.formData.parentId = null;
			scope.formData.parentPoId = null;
        };
		scope.saveParent = function() {
			console.log("hello");
			scope.xyz.parentId = "";
			scope.formData.parentId = null;
			scope.parentDatas = [];
			resourceFactory.clientParentDataResource.get({query : value}, function(data) {
				scope.parentDatas = angular.copy(data);
				for(var i in scope.parentDatas){
					scope.xyz.parentId = scope.parentDatas[i].displayName;
					scope.formData.parentId = scope.parentDatas[i].id;
					console.log(scope.formData.parentId+" parentId");
					scope.formData.parentPoId = scope.parentDatas[i].poId;
					console.log(scope.formData.parentpoId+" parentPoid");
					break;
				}
			});
		};
		
		
		
        resourceFactory.clientParentResource.get({clientId : routeParams.id}, function(data) {
			scope.parent = [];
			scope.parent = data.parentClientData;
			scope.parentCount = data.count;
		});
		
		
		
		
        scope.getStateAndCountry=function(city,type){
    	 
	      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
	      		 if(type == 'primary'){
	      			scope.state = data.state;
	          		scope.country = data.country;
	          		scope.district = data.district;
	      		 }else{
	      			 scope.billingData.state = data.state;
	      			 scope.billingData.country = data.country;
	      			 scope.billingData.district = data.district; 
	      		 }
	      	  });
        };
        
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };
        
        scope.groupByParent = function(displayName){
        	return displayName;
        };
        
        scope.invalidBuildingCode = false;
        var createClientFormVal = false;
        
        scope.$watch(function(){
        	return scope.invalidBuildingCode;
        },function(){
        	if(scope.invalidBuildingCode){
        		scope.createclientform.$valid ?
        				(createClientFormVal = scope.createclientform.$valid,scope.createclientform.$valid = !createClientFormVal) :
        					scope.createclientform.$valid = false;
        	}else{
        		if(scope.createclientform.$valid) scope.createclientform.$valid = true;
        		else {
        			if(createClientFormVal) scope.createclientform.$valid = true;
        			else scope.createclientform.$valid = false;
        		}
        	}
        });
        //vacant properties
         scope.getPropertyDetails = function(existsProperty){   
            	   if(!angular.isUndefined(existsProperty)){
            		  for(var j in scope.propertyCodesData)  {
            			 if(existsProperty == scope.propertyCodesData[j].propertyCode){
            				 scope.invalidBuildingCode = false;
            				 scope.formData.addressNo = scope.propertyCodesData[j].propertyCode;
            				 scope.formData.street = scope.propertyCodesData[j].street;
            				 scope.formData.city  =  scope.propertyCodesData[j].precinct; 
            				 scope.formData.state =  scope.propertyCodesData[j].state;
            				 scope.formData.country = scope.propertyCodesData[j].country;
            				 scope.formData.zipCode = scope.propertyCodesData[j].poBox;
            				 scope.status=scope.propertyCodesData[j].status;
            				 scope.propetyId=scope.propertyCodesData[j].id;
            				 scope.formData.district =  scope.propertyCodesData[j].district;
            				 break;
            			 }
            		 }
            	   }else{
                        
            		 delete scope.formData.street;
            		 delete scope.formData.city;
            		 delete scope.formData.state;
            		 delete scope.formData.country;
            		 delete scope.formData.zipCode;
            		 delete scope.formData.district;
        			 
            	   }
            	  
               };        
             
             
      
	     scope.generatePropertyPopup = function (){
	    	 $uibModal.open({
	    		 templateUrl: 'generateProperty.html',
	  	         controller: generatePropertyController,
	  	         resolve:{}
	  	     });
	     };
	    
	     //starting of property controller     
	     function  generatePropertyController($scope, $uibModalInstance) {
	    	 $scope.propertyTypes = [];
	    	 $scope.precinctData = [];
	    	 $scope.formData = {};
			  resourceFactory.propertyCodeTemplateResource.get(function(data) {
				  $scope.propertyTypes = data.propertyTypes;
				  if(Object.keys(scope.property).length >0){
			    		 $scope.formData.propertyCode=scope.property.propertyCode;
			    		 $scope.formData.street=scope.property.street;
			    		 $scope.formData.state=scope.property.state;
			    		 $scope.formData.country=scope.property.country;
			    		 $scope.formData.poBox=scope.property.poBox;
			    		 $scope.formData.propertyType=scope.property.propertyType;
			    		 $scope.formData.district=scope.property.district;
			    		/* for( var i in scope.parcelData){
			    			 if(scope.property.parcel == scope.parcelData[i].code){
			    				 $scope.parcel = scope.parcelData[i].description;
			    				 break;
			    			 }
			    		 }
			    		 for( var i in scope.floorData){
			    			 if(scope.property.floor ==  scope.floorData[i].code){
			    				 $scope.floor =scope.floorData[i].description;
			    				 break;
			    			 }
			    		 }*/
			    		 $scope.formData.precinct=scope.property.precinctCode;
			    		 $scope.parcel=scope.property.parcel;
			    		 $scope.floor=scope.property.floor;
			    		 $scope.buildingCode = scope.property.buildingCode;
			    		 $scope.unitCode = scope.property.unitCode;
			    		 
			    	 }
				});
			  
			  //precinct auto complete 
				$scope.getPrecinct = function(query){
					return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
		        	      params: {
		        	    	  		query: query
		        	      		   }
		        	    }).then(function(res){   
		        	    	 $scope.precinctData=res.data;	
		        	      return $scope.precinctData;
		        	    });
	             };   
				
				$scope.getPrecinctDetails = function(precinct){
					if(precinct!=undefined){
					    for(var i in $scope.precinctData){
					    	if(precinct==$scope.precinctData[i].cityCode){
					    		scope.property.precinctCode = $scope.precinctData[i].cityCode.substr(0,2);
					    		scope.property.precinct = $scope.precinctData[i].cityName;
				          		$scope.formData.state =  $scope.precinctData[i].state;
				          		$scope.formData.country = $scope.precinctData[i].country;
				          		$scope.getWatch(scope.property.precinctCode);
				          		$scope.formData.district =  $scope.precinctData[i].district;
				          		break;
				          }else{
				        	    
				        	    delete $scope.formData.district;
								delete $scope.formData.state;
					    		delete $scope.formData.country;
							}
						}
					  }else{
						  
						    delete $scope.formData.district;
							delete $scope.formData.state;
				    		delete $scope.formData.country; 
					  }
				};
				
				
				$scope.getParcel = function(queryParam){
					return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
		        	      params: {
		        	    	  		query: 'parcel',
		        	    	  		queryParam:queryParam		
		        	      		   }
		        	    }).then(function(res){   
		        	    	 scope.parcelData=res.data;	
		        	      return scope.parcelData;
		        	    });
	             };   
	             $scope.getParcelDetails = function(parcel){
	            	 if(parcel !=undefined){
	                 for(var i in scope.parcelData){
	                	 if(parcel== scope.parcelData[i].code){
					    		scope.property.parcel = scope.parcelData[i].code.substr(0,2);
					    		$scope.formData.street = scope.parcelData[i].referenceValue;
					    		$scope.getWatch(scope.property.parcel);
				          		break;
				          }	 
	                    }
	                }
	             };
	             
	             $scope.getBuild = function(queryParam){
						return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
			        	      params: {
			        	    	  		query: 'Building Codes',
			        	    	  		queryParam:queryParam				
			        	      		   }
			        	    }).then(function(res){   
			        	    	 scope.buildingData=res.data;	
			        	      return scope.buildingData;
			        	    });
		             };   
		         $scope.getbuildCode = function(building){
		            	 if(!angular.isUndefined(building)){
		            		  for(var i in scope.buildingData){
			                    	 if(building==scope.buildingData[i].code ){
			                    		 scope.property.buildingCode = scope.buildingData[i].code.substr(0,3);
			                    		 $scope.getWatch(scope.property.buildingCode);
							    		break;
						            }	 
			                     }
					          }	 
		             };  
	             
				
				$scope.getFloor = function(queryParam){
					return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
		        	      params: {
		        	    	  		query: 'Level/Floor',
		        	    	  		queryParam:queryParam	
		        	      		   }
		        	    }).then(function(res){   
		        	    	 scope.floorData=res.data;	
		        	      return scope.floorData;
		        	    });
	             };   
	             
	             $scope.getFloorDetails = function(floor){
	            	 if(floor!=undefined){
	            		 for( var i in scope.floorData){
	            			 if(floor==scope.floorData[i].code){
						    		scope.property.floor = scope.floorData[i].code.substr(0,2);
						    		$scope.getWatch(scope.property.floor);
					          		break;
					          }	 
		                 }
	            	 }	       	        
	          };
	          
	          
	          $scope.getUnit = function(queryParam){
					return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
		        	      params: {
		        	    	  		query: 'Unit Codes',
		        	    	  		queryParam:queryParam		
		        	      		   }
		        	    }).then(function(res){   
		        	    	 scope.unitData=res.data;	
		        	      return scope.unitData;
		        	    });
	             };   
	             $scope.getunitCode = function(unit){
	            	 if(!angular.isUndefined(unit)){
	                	 scope.property.unitCode=unit.substr(0,4);
	                	if(angular.isUndefined($scope.formData.propertyCode)){
	                	      $scope.getPropertyCode(scope.property.unitCode);
	                	}else{
	                		$scope.getWatch(scope.property.unitCode);
	                	   }					 
				      }	 
	             };
	          
	  		$scope.getPropertyCode=function(unitCode){
				if(scope.property.precinctCode !=undefined&&scope.property.parcel!=undefined&&scope.property.buildingCode!=undefined &&scope.property.floor!=undefined){
			    $scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,unitCode);
			    scope.property.propertyCode=$scope.formData.propertyCode;
			    $scope.getProperty($scope.formData.propertyCode);
				}
			}; 
			
			$scope.getWatch=function(labelValue){
				if(!angular.isUndefined(labelValue)&&!angular.isUndefined(scope.property.propertyCode)){
					$scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,scope.property.unitCode);
				   $scope.getProperty($scope.formData.propertyCode);
				}			
					
			};
			
	    	 $scope.accept = function () {
	    		// scope.property.precinct=$scope.formData.precinct; 
	    		 scope.property.propertyType=$scope.formData.propertyType;
	    		 scope.property.propertyCode=$scope.formData.propertyCode;
	    		 scope.property.street=$scope.formData.street;
	    		 scope.property.state=$scope.formData.state;
	    		 scope.property.country=$scope.formData.country;
	    		 scope.property.poBox=$scope.formData.poBox;
	    		 scope.property.district=$scope.formData.district;
	    		 
	    		 scope.formData.addressNo = $scope.formData.propertyCode;
    			 scope.formData.street = $scope.formData.street;
    			 scope.formData.city  =   scope.property.precinct;// $scope.formData.precinct; 
    			 scope.formData.state =  $scope.formData.state;
    			 scope.formData.country = $scope.formData.country;
    			 scope.formData.zipCode = $scope.formData.poBox;
    			 scope.formData.district =  $scope.formData.district;
    			 scope.invalidBuildingCode = false;
    			 $uibModalInstance.dismiss('delete');
    			 if(!angular.isUndefined(scope.formData.addressNo)){
    				 $('#propertyCode').attr("disabled","disabled");
    				 
    			 }
	      	 };
	         $scope.cancel = function () {
	        	 $uibModalInstance.dismiss('cancel');
	         };
	         
	   	    $scope.getProperty = function(query){
	           	return http.get($rootScope.hostUrl+API_VERSION+'/property', {
	           	      params: {
	           	    	      sqlSearch: query,
	           	    	         limit : 15,
	           	    	         offset:0
	           	      		   }
	           	    }).then(function(res){   
	           	    	 $scope.propertyCodesData=res.data.pageItems;
	           	    	if($scope.propertyCodesData.length>0){
	         	    		 $scope.unitStatus=$scope.propertyCodesData[0].status;
	         	             scope.propetyId=$scope.propertyCodesData[0].id;
	         	             console.log(scope.propetyId);
	         	    		if($scope.unitStatus == 'OCCUPIED'){
	         	    		     $scope.errorData= [];
	       	                     $scope.errorData.push({code:'error.msg.property.code.already.allocated'});
	       	                    $("#generateProperty").addClass("validationerror");
	         	    	}
	       		    }else{
	       		    	
	       		    	delete $scope.errorData;
     	    	    	scope.propetyId=undefined;
     	    		   $("#generateProperty").removeClass("validationerror");
	       		        } 
	           	      return scope.propertyCodesData;
	           	 });
	         };
	         
	     }//end of propertyController
	  

	        scope.getExistsProperty = function(query){
	        	scope.invalidBuildingCode = true;
	           	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
	           	      params: {
	           	    	  		query: query
	           	      		   }
	           	    }).then(function(res){   
	           	    	 scope.propertyCodesData=res.data;
	           	      return scope.propertyCodesData;
	           	    });
	             };  

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        };
        scope.setChoice = function(){
            if(this.formData.active){
                scope.choice = 1;
            }
            else if(!this.formData.active){
                scope.choice = 0;
            }
        };
        scope.dbClick = function(){
        	console.log("dbclick");
        	return false;
        };
      
     
       /* scope.parentValueAssignFun = function(){
        	cosole.log(scope.fromData.parentId);
        	if(scope.isParent){
        		if(scope.fromData.parentId == null){
        			scope.fromData.parentId = 0;
        		}
        	}else{
        		scope.fromData.parentId = null;
        	}
        };*/
        scope.hello = function(parentClient){
        	console.log(parentClient.poId+" Hello "+parentClient.id);
        	scope.formData.parentId=parentClient.id;
        	scope.formData.parentPoId=parentClient.poId;
        };
       
        scope.parentValueAssignFun = function(){
        	
        	if(scope.isParent){
         		if(scope.formData.parentId == null){
         			scope.formData.parentId = 0;
         		}
         	}
         };
        
        scope.submit = function() {
        	scope.parentValueAssignFun();
        	if(scope.propertyMaster&&(angular.isUndefined(scope.propetyId))){
        		delete scope.property.precinctCode;
        		 resourceFactory.propertyCodeResource.save({},scope.property,function(data){
        			 scope.propetyId=data.resourceId;
        	        	scope.flag = true;
        	            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
        	            scope.formData.locale = scope.optlang.code;
        	            scope.formData.active = true;
        	            scope.formData.dateFormat = 'dd MMMM yyyy';
        	            scope.formData.activationDate = reqDate;
        	            scope.formData.flag=scope.configurationProperty;
        	            scope.formData.locale = scope.optlang.code;
        	            scope.formData.dateFormat = 'dd MMMM yyyy';
        	            if(scope.formData.idKey==null){
        	            	delete scope.formData.idKey;
        	            }
        	            if(_.isEmpty(scope.formData.idValue)){
        	            	delete scope.formData.idValue;
        	            }
        	            delete scope.formData.address;
        	            
        	            if(scope.date.dateOfBirth){scope.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
        	          
        	            resourceFactory.clientResource.save(scope.formData,function(data){
        	            	
        	              if (scope.file) {
        	            	  $upload.upload({
        	                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
        	                  data: {},
        	                  file: scope.file
        	                }).then(function(imageData) {
        	                  // to fix IE not refreshing the model
        	                  if (!scope.$$phase) {
        	                    scope.$apply();
        	                  }
        	                  if(scope.clientAddInfo){
        	            		  location.path('/clientadditionalinfo/' + data.resourceId);
        	            	  }else if(PermissionService.showMenu('READ_CLIENT')){
        	                	  location.path('/viewclient/id/'+data.resourceId);
        	            	  }else{
        	                	  location.path('/clients');
        	            	  }
        	                });
        	              } else{
        	            	  if(scope.clientAddInfo){
        	            		  location.path('/clientadditionalinfo/' + data.resourceId);
        	            	  }else if(PermissionService.showMenu('READ_CLIENT')){
        	            		  location.path('/viewclient/id/' + data.resourceId);
        	            	  }else{
        	            		  location.path('/clients');
        	            	  }
        	              }
        	            },function(errors) {
        	                if(errors.data.errors!=null){
        	                    scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
        	                  }else{
        	                      scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
        	                  }
        	              });
        	          /*function(errData){
        	          	  scope.flag = false;
        	            }*/
        	        	},function(errors) {
        	                if(errors.data.errors!=null){
          	                  scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
          	                }else{
          	                    scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
          	                }
          	            });
        	        	/*function(errorData){
        	        		 scope.flag = false;
        		 }*/
        }else{
        	scope.flag = true;
            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
            this.formData.locale = scope.optlang.code;
            this.formData.active = true;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = reqDate;
            this.formData.flag=scope.configurationProperty;
            this.formData.locale = scope.optlang.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
            
            
            
            this.formData.address = [];
            this.formData.address.push({
            "addressNo":scope.addressNo,
            "street":scope.street,
            "city":scope.city,
            "state":scope.state,
            "country":scope.country,
            "district":scope.district,
            "zipCode":scope.zipCode,
            "addressType":"PRIMARY"
            	
            });
            console.log(this.formData.address);
            this.billingData.addressType='BILLING';
            this.formData.address.push(scope.billingData);
            
           	for(var i in scope.officeDetails){
           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
           			scope.formData.officeId = scope.officeDetails[i].id;
           		}
           	}
            if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
            resourceFactory.clientResource.save(this.formData,function(data){
            	
              if (scope.file) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
                	  location.path('/viewclient/id/'+data.resourceId);
            	  }else{
                	  location.path('/clients');
            	  }
                });
              } else{
            	  console.log("")
            	  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
            		  location.path('/viewclient/id/' + data.resourceId);
            	  }else{
            		  location.path('/viewclient/id/' + data.resourceId);
            	  }
              }
            },function(errors) {
                if(errors.data.errors!=null){
                    scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                  }else{
                      scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                  }
              });
            /*function(errData){
          	  scope.flag = false;
            }*/
        	}
        	 
        	
        };
    }
  });
  mifosX.ng.application.controller('CreateClientController', [
                                                              '$scope',
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              '$http', 
                                                              'dateFilter',
                                                              'API_VERSION',
                                                              '$rootScope',
                                                              'Upload',
                                                              '$filter',
                                                              '$uibModal',
                                                              'PermissionService',
                                                              'webStorage',
                                                              'UIConfigService',
                                                              '$routeParams', 
                                                              mifosX.controllers.CreateClientController]).run(function($log) {
    $log.info("CreateClientController initialized");
  });
}(mifosX.controllers || {}));
