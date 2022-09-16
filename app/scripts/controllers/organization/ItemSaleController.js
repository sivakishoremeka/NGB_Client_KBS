(function(module) {
  mifosX.controllers = _.extend(module, {
	  ItemSaleController: function(scope, resourceFactory, location,dateFilter,routeParams,webStorage,$rootScope,http,API_VERSION) {
		  
		   scope.officeId = routeParams.officeId;
		   scope.officeName = webStorage.get("officeName");
		   scope.partnerId = 0;
		   if(routeParams.partnerId){
		   scope.partnerId = routeParams.partnerId;
		   }
		   scope.partnerName = webStorage.get("partnerName");
    	   scope.officeDatas = [];
    	   scope.itemDatas = [];
    	   scope.purchase = {};
    	   scope.purchaseBy={};
    	   scope.purchase.date = new Date();
    	   scope.formData={};
    	   scope.data={};
    	   scope.chargeDatas ={};
    	   scope.discountType = 'Percentage';
    	   scope.tempOfficeDatas = [];
    	   
    	   scope.userOfficeData =  webStorage.get("officeData");
    	   
    	   scope.globalConfigs =  webStorage.get("global_configuration")
	        for(var i in scope.globalConfigs){
	        	if(scope.globalConfigs[i].name == "officeHierarchy"){
	        		scope.isOfficeHierarchy = scope.globalConfigs[i].enabled;break;
	        	}
	        };
    	   
    	   /*This is used to get Purchase By and Purchase From based on logged in user officeType*/
    	   scope.getParentOfficeData = function(parentId){
      		 resourceFactory.officeResource.get({officeId: parentId}, function (data) {
                      scope.officeDatas.push(data);
                      scope.tempOfficeDatas.push(data);
                      if(data.parentId != null && data.parentId != undefined){
                      	scope.getParentOfficeData(data.parentId);
                      }
                });
      	  }
    	  /*END*/
    	  
        resourceFactory.itemSaleTemplateResource.get(function(data) {
        	
        	 scope.officeDatas = data.officeDatas;
        	 scope.itemDatas = data.itemDatas;
        	 scope.chargeDatas = data.chargeDatas;
        	 
        	 for(var i in scope.officeDatas){
        		 if(scope.officeDatas[i].id == scope.purchaseFrom){
        			 scope.officeDatas.splice(i,1); 
        		 }
        	 }
        	 
         	/*This is used to get Purchase By and Purchase From based on logged in user officeType*/
 			    if (scope.userOfficeData.officeType == 'LCO'){
 			    	for(var i in scope.officeDatas){
 		           		if(scope.officeDatas[i].id == scope.userOfficeData.officeId){
 		           			scope.formData.purchaseBy = scope.officeDatas[i].externalId;
 		           			scope.parentId = scope.officeDatas[i].parentId;
 		           			
 		           			/*isOfficeHierarchy is defined in Golbal config based on this value Purchase from drop down list will show the all parent offices for LCO User*/
 		           			if(scope.isOfficeHierarchy == true){
	 		           			if(scope.parentId != null || scope.parentId != undefined){
	 		           			   scope.getParentOfficeData(scope.parentId);
	 		           			}
 		           			} else {
	 		           			resourceFactory.officeResource.get({officeId: scope.parentId}, function (data) {
	 		           			     scope.officeDatas.push(data);
	 		                         scope.tempOfficeDatas.push(data);
	 		           				 scope.formData.purchaseFrom = data.externalId;
	 		                        
	 		                    });
 		           			}
 		           		}
 		           	}
 			    } 
 			/*End*/
        	 
        });
        
      /*  scope.getData = function(query){
        	return http.get($rootScope.hostUrl+API_VERSION+'/itemsales/template', {
        	      params: {
        	    	  		query: query
        	      		   }
        	    }).then(function(result){
        	    	scope.officeDatas = [];
	        	      for(var i in result.data.officeDatas){
	        	    	  scope.officeDatas.push(result.data.officeDatas[i]);
	        	    	  if(i == 7)
	        	    		  break;
	        	      }

	        	    if(scope.officeDatas.length == 0){
	        	    	delete scope.formData.name;
	        	    	delete scope.formData.nameDecorated;
	        	    	delete scope.formData.externalId;
	        	    }
        	      return scope.officeDatas;
        	    });
        };*/
        
        
        scope.getData = function(query, getAll){
        	return http.get($rootScope.hostUrl+API_VERSION+'/mrn/searching/1/', {
        	      params: {
        	    	  		officename: query,
        	    	  		getAll : getAll
        	      		   }
        	    }).then(function(result){
        	    	scope.officeData = [];
        	    	
        	    	/*This is used to get Purchase By and Purchase From drop down list based on logged in user officeType*/
        	    	if(scope.userOfficeData.officeType == 'LCO'){
        	    		for(var i in scope.tempOfficeDatas){
        	        		 if(scope.tempOfficeDatas[i].externalId == scope.formData.purchaseBy){
        	        			 scope.tempOfficeDatas.splice(i,1); 
        	        		 }
        	        	 }
        	    		scope.officeData = scope.tempOfficeDatas;
        	    	} else {
        	    		for(var i in result.data.officeData){
        	    			if(result.data.officeData[i].externalId == scope.formData.purchaseBy){
        	    				result.data.officeData.splice(i,1); 
       	        		 }
  	        	    	  scope.officeData.push(result.data.officeData[i]);
  	        	    	  if(i == 10)
  	        	    		  break;
  	        	      }
        	    	}
        	    	
        	    	/* Old Condition
	        	      for(var i in result.data.officeData){
	        	    	  scope.officeData.push(result.data.officeData[i]);
	        	    	  if(i == 10)
	        	    		  break;
	        	      }*/
        	    	
                   /*END*/
	        	    if(scope.officeData.length == 0){
	        	    	delete scope.formData.name;
	        	    	delete scope.formData.nameDecorated;
	        	    	delete scope.formData.externalId;
	        	    }
        	      return scope.officeData;
        	    });
        };
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };
        
        scope.goBack = function(){
        	location.path('/inventory');
        };
        
        scope.getBothItem = function(itemCode,itemDescription){
        	return itemCode+"--"+itemDescription;
        };
        
        scope.getBothCharge = function(chargeCode, chargeDescription){
        	return chargeCode+"--"+chargeDescription;
        };
        scope.itemData=function(itemId){
        	
        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
        		delete scope.formData.quantity;
        		delete scope.formData.itemPrice;
        		scope.formData.itemId=itemId;
        		scope.formData.unitPrice = data.unitPrice;
        		for(var i in scope.chargeDatas){
        			if(scope.chargeDatas[i].chargeCode == data.chargeCode){
        				scope.formData.chargeCode = scope.chargeDatas[i].id;
        			}
        			
        		}
			scope.formData.currencyId = data.currencyId;
	        });	
        };
        scope.itemDataQuantity=function(quantity,itemId,discount,discountType){
        	delete scope.formData.itemPrice;
        	scope.data.unitPrice=scope.formData.unitPrice;
        	scope.data.locale=scope.optlang.code;
        	scope.discount = discount;
        	scope.discountType = discountType;
        	scope.data.quantity=quantity;
        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},scope.data, function(data) {
        		scope.formData.itemId=itemId;
        		//scope.formData.chargeAmount = data.totalPrice;
        		if(scope.discountType && scope.discount){
            		var discount = scope.discount;
            		var chargeAmount = data.totalPrice;
            		if(scope.discountType =="Percentage"){
            			var discountAmount =  (chargeAmount)*(discount)/100;
            			scope.formData.chargeAmount = chargeAmount-discountAmount;     			
            		}else{
            			scope.formData.chargeAmount = chargeAmount-discount;
            		}
            		
            	} else {
            		scope.formData.chargeAmount = data.totalPrice;
            	}
	        });
        
        };
     
        scope.submit = function() {
        	
        	scope.formData.locale = scope.optlang.code;
           	var reqDate = dateFilter(scope.purchase.date,'dd MMMM yyyy');
            scope.formData.dateFormat = 'dd MMMM yyyy';
            scope.formData.purchaseDate = reqDate;
            if(scope.officeId !=0){  	
            scope.formData.purchaseBy= scope.officeId;
            }
            
            /*This is used to add office id to purchase from formData based on office Type */
            /*if(scope.userOfficeData.officeType == 'LCO'){
            	scope.formData.purchaseFrom = scope.parentOfficeData.id;
            } else {
            	for(var i in scope.officeDatas){
               		if(scope.officeDatas[i].externalId == scope.formData.purchaseFrom){
               			scope.formData.purchaseFrom = scope.officeDatas[i].id;break;
               		}
               	}
            }*/
            /*End*/
            
            for(var i in scope.officeDatas){
           		if(scope.officeDatas[i].externalId == scope.formData.purchaseFrom){
           			scope.formData.purchaseFrom = scope.officeDatas[i].id;break;
           		}
           	}
            
            for(var i in scope.officeDatas){
           		if(scope.officeDatas[i].externalId == scope.formData.purchaseBy){
           			scope.formData.purchaseBy = scope.officeDatas[i].id;break;
           		}
           	}
            resourceFactory.itemSaleResource.save(scope.formData,function(data){

            	if(scope.officeId == 0){
            		location.path('/stocktransfer');
            	}else if(scope.partnerId !=0){
            		location.path('/viewpartner/'+scope.partnerId+'/'+routeParams.officeId);		
            	}else{
            		location.path('/viewoffice/'+routeParams.officeId);		
            	}
          });
        };
        
        scope.partnersTab = function(){
       	   webStorage.add("callingTab", {someString: "Partners" });
        };
    }
  });
  mifosX.ng.application.controller('ItemSaleController', [
    '$scope', 
    'ResourceFactory', 
    '$location',
    'dateFilter',
    '$routeParams',
    'webStorage',
    '$rootScope', 
    '$http', 
    'API_VERSION',
 mifosX.controllers.ItemSaleController]).run(function($log) {
    $log.info("ItemSaleController initialized");
 });
}(mifosX.controllers || {}));
