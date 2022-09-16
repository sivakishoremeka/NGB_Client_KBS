(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateVoucherPinController: function(scope, resourceFactory, location,dateFilter,$rootScope,webStorage) {
	    	
	    	scope.formData = {};
	        scope.pinCategoryDatas = [];
	        scope.pinTypeDatas = [];
	        scope.plandatas = [];
	        scope.start={};
	        scope.start.date = new Date();
	        scope.lengthValidationError = false;
	        scope.offices = [];
	        scope.valueMCodeDatas = [];
	        var tempOffice = {};
	        scope.voucherType = "voucher";
	        
	        scope.globalConfigs =  webStorage.get("global_configuration")
	        for(var i in scope.globalConfigs){
	        	if(scope.globalConfigs[i].name == "Office_Entity"){
	        		scope.officeEntity = scope.globalConfigs[i].enabled;
	        	}
	        	if(scope.globalConfigs[i].name == "voucherPins"){
	        		scope.voucherPins = scope.globalConfigs[i].enabled;
	        	}
	        	
	        };
	        
	        if(scope.officeEntity == true){
	        	for(var i in scope.globalConfigs){
		        	if(scope.globalConfigs[i].name == "Office_Entity"){
		        		tempOffice = scope.globalConfigs[i].value;
		        	}
		        }
	        }
	        
	        if(scope.voucherPins == true){
	        	for(var i in scope.globalConfigs){
		        	if(scope.globalConfigs[i].name == "voucherPins"){
		        		var tempVoucherPins = scope.globalConfigs[i].value;
		        		tempVoucherPins = JSON.parse(tempVoucherPins);
		        		scope.formData.length = tempVoucherPins.length_pin;
		    	        scope.formData.serialNo = tempVoucherPins.length_serial;
		    	        scope.formData.pinCategory = tempVoucherPins.pin_category;
		    	        scope.voucherType = tempVoucherPins.voucher_type;
		        	}
		        }
	        }
	        
	        resourceFactory.voucherpinTemplateResource.get(function(data) {
	            scope.pinCategoryDatas = data.pinCategoryData;
	            scope.pinTypeDatas.push({"value":"VALUE"},{"value":"PRODUCT"});
	            scope.offices = data.offices;
	            scope.valueMCodeDatas = data.valueMCodeDatas;
	            scope.off(scope.offices);
	        });
	        
	        scope.off = function(offi){
	        	for(var i in offi){
	            	if(offi[i].name == tempOffice){
	            		var tempOfficeId = offi[i].id;
	            		scope.formData.officeId = tempOfficeId;
	            	}
	            }
	        };
	        
	        resourceFactory.priceResource.query(function(data){
	        	if(data.length >=1){
	        		scope.planDatas = _.filter(data, function(item) {
	                      return item.isPrepaid != "N";
	                  });
	        	scope.planPriceData = [];
        		for(var i in scope.planDatas){
        			var planId		= scope.planDatas[i].planId;
        			var planCode	= scope.planDatas[i].planCode;
        			for(var j in scope.planDatas[i].pricingData){
        				scope.planDatas[i].pricingData[j].plan_duration = planCode+"-"+scope.planDatas[i].pricingData[j].duration+"-"+scope.planDatas[i].pricingData[j].price;
        				scope.planDatas[i].pricingData[j].planId		= planId;
        				
        				scope.planPriceData.push(scope.planDatas[i].pricingData[j]);
        			}
        		}
	        	}
	        });
	        /*resourceFactory.orderTemplateResource.get({planId: 0},function(data) {
	            scope.planDatas = data.plandata;
	       });*/
	        
	        scope.setPinValue = function(){
	        	scope.formData.pinValue = null;
	        };
	        
	        //coupon code start
	        scope.radioTypeSelection = function(){
	        	delete scope.formData.pinType;
	        	delete scope.formData.pinValue;
	        	if(scope.voucherType == "coupon"){
	        		resourceFactory.promotionResource.get(function(data) {
	    				scope.promotionDatas = data;
	    			});
	        	}else{
	        		resourceFactory.priceResource.query(function(data){
	    	        	if(data.length >=1){
	    	        		scope.planDatas = _.filter(data, function(item) {
	    	                      return item.isPrepaid != "N";
	    	                  });
	    	        	scope.planPriceData = [];
	            		for(var i in scope.planDatas){
	            			var planId		= scope.planDatas[i].planId;
	            			var planCode	= scope.planDatas[i].planCode;
	            			for(var j in scope.planDatas[i].pricingData){
	            				scope.planDatas[i].pricingData[j].plan_duration = planCode+"-"+scope.planDatas[i].pricingData[j].duration+"-"+scope.planDatas[i].pricingData[j].price;
	            				scope.planDatas[i].pricingData[j].planId		= planId;
	            				
	            				scope.planPriceData.push(scope.planDatas[i].pricingData[j]);
	            			}
	            		}
	    	        	}
	    	        });
	        	}
	        };
	        
	        //coupon code endsss
	        
	        scope.submit = function() {  
	        	
	        	/*if(scope.formData.beginWith && scope.formData.length){*/
	        	/* if(scope.formData.beginWith.length < scope.formData.length){	*/
	        		 scope.lengthValidationError = false;
	        		 scope.formData.locale = scope.optlang.code;
	        		 scope.formData.dateFormat = "dd MMMM yyyy";
		             var exipiryDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		             scope.formData.expiryDate=exipiryDate;
		             
		             //coupon code start
		             if(scope.voucherType == "coupon"){
		            	 scope.formData.pinType = angular.uppercase(scope.voucherType);
		             }
		             scope.formData.batchType = angular.uppercase(scope.voucherType);
		             //coupon code end
		             
		             if(scope.formData.pinType == "PRODUCT"){
		              for(var i in scope.planPriceData){
		            	 if(scope.planPriceData[i].id == scope.formData.pinValue){
		            		 scope.formData.pinValue = scope.planPriceData[i].planId;
		            		 scope.formData.priceId = scope.planPriceData[i].id;
		            	 }
		              }
		             }else if(scope.formData.pinType == "VALUE"){
		            	 for(var i in scope.valueMCodeDatas){
			            	 if(scope.valueMCodeDatas[i].id == scope.formData.pinValue){
			            		 scope.formData.pinValue = scope.valueMCodeDatas[i].mCodeValue;
			            	 }
			              }
		             }
		             
		            resourceFactory.voucherpinResource.save(scope.formData,function(data){
		            	location.path('/voucherpins');
		          });
	        	 
	        	 /*}else{
	        		 scope.lengthValidationError = true;
	        	 }
	          }*/
 
	        	
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateVoucherPinController', ['$scope', 'ResourceFactory', '$location','dateFilter','$rootScope','webStorage', mifosX.controllers.CreateVoucherPinController]).run(function($log) {
	    $log.info("CreateVoucherPinController initialized");
	  });
	}(mifosX.controllers || {}));

