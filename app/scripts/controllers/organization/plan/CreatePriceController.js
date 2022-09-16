(function(module) {
  mifosX.controllers = _.extend(module, {
    CreatePriceController: function(scope, routeParams, resourceFactory, location,$rootScope,webStorage) {
        
    	scope.chargeDatas = [];
        scope.chargevariants = [];
        scope.discountdatas = [];
        scope.priceRegionDatas = [];
        scope.serviceDatas=[];
        scope.priceDatas = [];
        scope.formData = {};
        scope.prices = [];
        scope.planId = routeParams.id;
        scope.fieldserror = false;
        scope.labelerror = "requiredfields";
        scope.currencyCode = "";
        scope.currencyId = "";
        var contractPeriods = [];
        scope.glRealatedData=[];
       /* scope.plan = webStorage.get("plan");
        if(scope.plan.duration == undefined){
        	scope.duration = 0;
        }else{
        	scope.duration = scope.plan.duration
        }*/
        
        scope.formData.chargeOwner='self';
        
        
        scope.assignCurrencyDetailsToFormData = function(data){
        	
        	scope.currencyId = data.currencyId;
        	for(var i in scope.currencyDatas){
        		if(scope.currencyId == scope.currencyDatas[i].id){
        			scope.currencyCode = scope.currencyDatas[i].code;break;
        		}
        	}
        }
        
        
       /* resourceFactory.priceTemplateResource.get({planId: routeParams.id} , function(data) {
            scope.formData.planCode=data.planCode;
            scope.formData.isPrepaid=data.isPrepaid;
        	scope.chargeDatas = data.chargeData;
            scope.chargevariants = data.chargevariant;
            scope.discountdatas = data.discountdata;
            scope.priceRegionDatas = data.priceRegionData;
            scope.subscriptiondata = data.contractPeriods;
            scope.serviceDatas = data.serviceData;
            scope.serviceDatas.push({"id":0,"serviceCode":"none","serviceDescription":"None"});*/
            
            resourceFactory.priceResource.get({planId: routeParams.id, template: 'true'} , function(data) {
            	scope.currencyOptions=[];
            	scope.glRealatedData =data.glRealatedData;
            	scope.CURRENCYdropdown=data.currencydata.noncurrencyOptions;
            	scope.currencyOptions.push({
            		id:data.currencyId,
            		code:data.currencyCode
        		});
            	for(var i in scope.CURRENCYdropdown) {
        			scope.currencyOptions.push(scope.CURRENCYdropdown[i]);
        		}
            	
            	
            	scope.duration=data.duration;
            	scope.formData.planCode=data.planCode;
                scope.formData.isPrepaid=data.isPrepaid;
            	scope.chargeDatas = data.chargeData;
                scope.chargevariants = data.chargevariant;
                scope.discountdatas = data.discountdata;
                scope.priceRegionDatas = data.priceRegionData;
                /*scope.subscriptiondata = data.contractPeriods;*/
                scope.serviceDatas = data.serviceData;
                scope.serviceDatas.push({"id":0,"productCode":"none","productDescription":"None"});
            	if(data.pricingData != null){
            		/*console.log("condi")*/
            		scope.priceDatas = data.pricingData;
            	}
            	scope.currencyDatas = data.currencydata.currencyOptions;
            	scope.assignCurrencyDetailsToFormData(data);
            	
            	for ( var i in scope.priceDatas) {
            		/*Charge Varaint*/
            		for (var j in scope.chargevariants){
            			if(scope.priceDatas[i].chargeVariant == scope.chargevariants[j].value){
            				scope.priceDatas[i].chargevariant = scope.chargevariants[j].id;
            				
            			}
            		}/*Charge Code*/
            		for ( var k in scope.chargeDatas) {
            			if(scope.priceDatas[i].chargeCode == scope.chargeDatas[k].chargeDescription){
            				scope.priceDatas[i].chargeCode = scope.chargeDatas[k].chargeCode;
            			}
            		}/*Price Region*/
            		for ( var l in scope.priceRegionDatas) {
            			if(scope.priceDatas[i].priceregion == scope.priceRegionDatas[l].priceregion){
            				scope.priceDatas[i].priceregion = scope.priceRegionDatas[l].id;
            			}
            		}
            		for ( var m in scope.currencyOptions) {
            			if(scope.priceDatas[i].code == scope.currencyOptions[m].code){
            				scope.priceDatas[i].code = scope.currencyOptions[m].code;
            			}
            		}
            		for ( var m in scope.glRealatedData) {
            			if(scope.priceDatas[i].code == scope.glRealatedData[m].code){
            				scope.priceDatas[i].code = scope.glRealatedData[m].code;
            			}
            		}
            		
            	}
            	
            	if(data.duration == undefined){
                	scope.duration = 0;
                }else{
                	scope.duration = data.duration;
                }
            	
            	
            	contractPeriods = data.contractPeriods;
            	
            	
            	scope.subscriptiondata=[];
            	
            	getDuration();
            	
            });
      /*  });*/
        
        scope.addPriceData = function(){
        	if(scope.formData.chargeCode && scope.formData.chargeOwner && scope.formData.discountId &&
        			scope.formData.isPrepaid && scope.formData.planCode && scope.formData.price && scope.formData.priceregion ){
        		scope.fieldserror = false;
        		 if(scope.formData.isPrepaid == 'Y'){
        			 console.log(scope.formData);
        			 if(scope.formData.duration){
        				 scope.formData.chargevariant=2;
        				 scope.priceDatas.push(scope.formData);
        				 var planCode = scope.formData.planCode;
        		        	var isPrepaid = scope.formData.isPrepaid;
        		        	scope.formData = {};
        		        	scope.formData.planCode = planCode;
        		        	scope.formData.isPrepaid = isPrepaid;

        			 }
        		 }else{
        			 //scope.formData.duration = "Perpetual";
        			 scope.formData.chargevariant=2;
        			 console.log(scope.formData);
        			 scope.priceDatas.push(scope.formData);
        			 var planCode = scope.formData.planCode;
        	        	var isPrepaid = scope.formData.isPrepaid;
        	        	scope.formData = {};
        	        	scope.formData.planCode = planCode;
        	        	scope.formData.isPrepaid = isPrepaid;
        		 }
        		 getDuration();
        	}else{
        	 scope.errorDetails = [];
        	 scope.fieldserror = true;
             scope.labelerror = "fieldserror";
        	}
        };
        
        scope.removePriceData = function (index,priceId) {
            if(priceId !=undefined){/*Delete particular Price of plan */
            	 resourceFactory.deletePriceResource.remove({priceId: priceId} , {} , function() {
            		 scope.priceDatas.splice(index, 1);
            		 //console.log(priceId);
                });
            }else{/*Remove Price Data which was newly added */
            	scope.priceDatas.splice(index, 1);
            }
        };
			 
        priceDataSendingOneByOneFun = function(val){
        	if(scope.priceDatas[val].id){/*update plan price*/
        		scope.planPriceId = scope.priceDatas[val].id;
        		delete scope.priceDatas[val].chargeVariant;
        		delete scope.priceDatas[val].billingFrequency;
        		delete scope.priceDatas[val].contractId;
        		delete scope.priceDatas[val].currencyCode;
        		resourceFactory.updatePriceResource.update({priceId:scope.planPriceId},scope.priceDatas[val],function(data){
   				 if(val == scope.priceDatas.length-1){
   					 location.path('viewplan/'+routeParams.id);
   				 }else{
   					 val += 1;
   					 priceDataSendingOneByOneFun(val);
   			 	 }
   			 });
        		
        }else{/*create new  plan price*/
        	resourceFactory.priceResource.save({'planId':routeParams.id},scope.priceDatas[val],function(data){
				 if(val == scope.priceDatas.length-1){
					 location.path('viewplan/'+routeParams.id);
				 }else{
					 val += 1;
					 priceDataSendingOneByOneFun(val);
			 	 }
			 });
           }
		 };
        
        scope.submit = function() {
        	for(var i in scope.priceDatas){
        		scope.priceDatas[i].locale = scope.optlang.code;
        		if(i==scope.priceDatas.length-1){
        			priceDataSendingOneByOneFun(0);
        		}
        	}
        };
        
        var getDuration = function(){
        	for(var i in contractPeriods){
        		if(contractPeriods[i].Contractdata!="All"){
        			scope.subscriptiondata.push(contractPeriods[i]);
        			    if(contractPeriods[i].id == scope.duration){
                		scope.formData.duration = contractPeriods[i].Contractdata ;
                	}
        		}
        		
             }
        	
        	
        	console.log(scope.duration);
        	
        }
    }
  });
  mifosX.ng.application.controller('CreatePriceController', [
    '$scope', 
    '$routeParams', 
    'ResourceFactory', 
    '$location',
    '$rootScope',
    'webStorage',
    mifosX.controllers.CreatePriceController]).run(function($log) {
    $log.info("CreatePriceController initialized");
  });
}(mifosX.controllers || {}));
