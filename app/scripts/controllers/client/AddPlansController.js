(function(module) {
	 mifosX.controllers = _.extend(module, {
		 AddPlansController: function(scope,webStorage, resourceFactory, location,dateFilter,$rootScope,routeParams) {
			 scope.formData = {};
			 scope.availablePlans = [];
		     scope.selectedPlans = [];
			 scope.allowed = [];
		     scope.restricted = [];
		     scope.formData.planDetails = [];
		     scope.salesCataloges = [];
		     scope.clientId=routeParams.id;
		     scope.subscriptiondatas = [];
		     scope.billFrequencyCodeData = [];
		     scope.planId=routeParams.planId;
		     scope.planData = [];
		     temp = [];
		     scope.poidLists={};
		     scope.start = {};
		     scope.addPlansData={};
		     
		   //the datetime date is only for display
			 scope.dateTime = new Date().toDateString();
			 
		     scope.start.date = new Date();
		     
		     var clientData = webStorage.get('clientData');
		     scope.paytermCodeId = clientData.chargeCycleId;
		     scope.paytermCode = clientData.chargeCycle;
		     console.log(scope.paytermCodeId);
		     console.log(scope.paytermCode);
		     
		     var orderData = webStorage.get('orderData');
			 console.log(orderData);
		     
		     scope.globalConfigs =  webStorage.get("global_configuration")
		        for(var i in scope.globalConfigs){
		        	if(scope.globalConfigs[i].name == "is-CRM-Enable"){
		        		scope.isCrm = scope.globalConfigs[i].enabled;break;
		        	}
		        };
		     
		     //salescatalogeTemplate get call
			/* resourceFactory.salescatalogeTemplateResource.get(function(data) {
				 scope.SalesCataloges = angular.copy(data);
			 });*/
			 
			 
			 /*//salescatalogemappingTemplate get call
			 resourceFactory.salescatalogemappingTemplateResource.get(function(data) {
				 scope.salesCataloges  = data.salesCatalogeDatas;
			 });
*/			 
			//user cataloge resource to select plans based on sales plan category
	  	        resourceFactory.userscatalogeResource.get({category:'all'},function(data) {
					 scope.salesCataloges  = data.allPlanDatas;
				});
			 
			 //orderTemplate get call
			 /*resourceFactory.orderTemplateResource.get({'planId': routeParams.planId,'clientId': routeParams.id,'clientServiceId':routeParams.clientServiceId},function(data) {
		     	   
		     	   //scope.plandatas = angular.copy(data.plandata);	
		     	   scope.clientServiceData = angular.copy(data.clientServiceData);
		           scope.subscriptiondatas=data.subscriptiondata;
	                  for (var i in data.subscriptiondata) {
		                 	if(data.subscriptiondata[i].Contractdata == "Perpetual"){
		                 		 scope.formData.contractPeriod=data.subscriptiondata[i].Contractdata; 
		                 	}
		              };
		              
		           scope.paytermdatas=data.paytermdata;
		           scope.clientId = routeParams.id;
		           scope.formData = {
		              		billAlign: true,
		              		//autoRenew : isAutoRenew
		                    };
		     	   
		        });*/
			 
			 // charge code get
			 resourceFactory.chargecodetemplateResource.get(function(data) {
					scope.chargeTypes = data.chargeTypeData;
					scope.durationTypes = data.durationTypeData;
					scope.billFrequencyCodes = data.billFrequencyCodeData;
					
				});
			 
			 scope.removeSelectedPlansFromAvailable = function(){
		    	 for(var i in scope.availablePlans){
		    		 for(var j in scope.selectedPlans){
		    			 if(scope.availablePlans[i].id == scope.selectedPlans[j].id){
		    				 scope.availablePlans.splice(i,1);break; 
		    			 }
		    		 }
		    	 }
		     }
			 
			 scope.serviceChangeFun = function(salesCatalogeId){
				 resourceFactory.salescatalogesResource.get({salesCatalogeId:salesCatalogeId,'planId': 0,'clientId': routeParams.id,'clientServiceId':routeParams.clientServiceId} , function(data) {
			         scope.availablePlans = data.planData;
					 scope.totalAvailablePlans = data.planData;
					 scope.subscriptiondatas = data.subscriptiondata;          
			        });
				if(scope.formData.billFrequencyCode != null){
					scope.billFrequencyChangeFun(scope.formData.billFrequencyCode);
				}
				scope.selectedPlans = [];
		     }
			 
			 
			 scope.billFrequencyChangeFun = function(billFrequency){
				 scope.availablePlans =[];
				 for(var i in scope.totalAvailablePlans){
					/* if(scope.totalAvailablePlans[i]. == billFrequency){*/
						 scope.availablePlans.push(scope.totalAvailablePlans[i]);
					/* }*/
				 }
				 scope.removeSelectedPlansFromAvailable();
			 }
			 
			 
			 /*for(var i in scope.totalAvailableProducts){
	    		 if(scope.totalAvailableProducts[i].serviceId == scope.formData.serviceId){
	    			 console.log(scope.selectedProducts);
	    			 scope.availableProducts.push(scope.totalAvailableProducts[i]);
	    		 }
	    	 	}
	    	 	scope.removeSelectedProductsFromAvailable();
	     	}*/
			 
			 
			 
			 
			  
			 scope.restrict = function(){
		    	   
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availablePlans){
		                    if(scope.availablePlans[j].id == this.allowed[i])
		                    {
		                    	var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.planCode = this.allowed[i];
		                        temp.planDescription = scope.availablePlans[j].planDescription;
		                        temp.planPoId=scope.availablePlans[j].planPoId;
		                        temp.dealPoId=scope.availablePlans[j].dealPoId;
		                        temp.paytermCode=scope.availablePlans[j].chargeCycle;/*written on April 07 2020*/
		                        if(scope.isCrm  == true){
		                        temp.paytermCode=scope.availablePlans[j].chargeCycle;
		                        for (var k in scope.subscriptiondatas) {
    			                   	if(scope.subscriptiondatas[k].Contractdata == 'Perpetual'){
    			                   		temp.contractPeriod=scope.subscriptiondatas[k].id;
		                        		break;
    			                   	}
    			        		}
		                        }else{
		                        	if(scope.availablePlans[j].isPrepaid == 'Y'){
		                        		temp.contractPeriod=scope.availablePlans[j].contractPeriodId;
		                        	}else{
		                        		//temp.contractPeriod = 1;
		                        		for (var k in scope.subscriptiondatas) {
		    			                   	if(scope.subscriptiondatas[k].Contractdata == 'Perpetual'){
		    			                   		temp.contractPeriod=scope.subscriptiondatas[k].id;
				                        		break;
		    			                   	}
		    			        		}
		                        	}
		                        }
		                        scope.selectedPlans.push(temp);
		                        scope.availablePlans.splice(j,1);
		                    }
		                }
		            }
		        };
			 
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedPlans){
		                    if(scope.selectedPlans[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.planCode = this.restricted[i];
		                        temp.planDescription = scope.selectedPlans[j].planDescription;
		                        temp.planPoId=scope.selectedPlans[j].planPoId;
		                        temp.dealPoId=scope.selectedPlans[j].dealPoId;
		                        temp.paytermCode=scope.selectedPlans[j].chargeCycle;/*written on April 07 2020*/
		                        if(scope.isCrm  == true){
		                        	temp.paytermCode=scope.selectedPlans[j].chargeCycle;
		                        	for (var k in scope.subscriptiondatas) {
	    			                   	if(scope.subscriptiondatas[k].Contractdata == 'Perpetual'){
	    			                   		temp.contractPeriod=scope.subscriptiondatas[k].id;
			                        		break;
	    			                   	}
	    			        		}
		                        }else{
		                        	if(scope.selectedPlans[j].isPrepaid == 'Y'){
		                        		temp.contractPeriod=scope.selectedPlans[j].contractPeriodId;
		                        	}else{
		                        		//temp.contractPeriod = 'Perpetual';
		                        		for (var k in scope.subscriptiondatas) {
		    			                   	if(scope.subscriptiondatas[k].Contractdata == 'Perpetual'){
		    			                   		temp.contractPeriod=scope.subscriptiondatas[k].id;
				                        		break;
		    			                   	}
		    			        		}
		                        	}
		                        }
		                        scope.availablePlans.push(temp);
		                        scope.selectedPlans.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.getBothPlans = function(planCode, planDescription){
		        	
					  return planCode+"--"+planDescription;
					   	
		        };
		        scope.clientAndclientServicePoIds = function(){
			    	   var clientData = webStorage.get('clientData');
			    	   scope.poidLists.clientPoId = clientData.poId;
			    	   scope.clientServiceDetails = clientData.clientServiceDetails;
			    	   for(var i in scope.clientServiceDetails){
			    		   console.log(scope.clientServiceDetails[i].id+"_"+routeParams.clientServiceId);
			    		   if(scope.clientServiceDetails[i].id == routeParams.clientServiceId){
			    			   scope.poidLists.clientServicePoId =  scope.clientServiceDetails[i].clientServicePoId;
			    			   break;
			    		   }
			    	   }
			       }
		        scope.submit = function() {  
		        	this.formData.clientServiceId = routeParams.clientServiceId;
		        	scope.clientAndclientServicePoIds();
		        	scope.formData.locale = "en";
		        	this.formData.locale = scope.optlang.code;
		           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		            this.formData.dateFormat = 'dd MMMM yyyy';
		            this.formData.start_date = reqDate;
		        	/*if(isCrm = true){
		        		scope.formData.contractPeriod = 1;
				    	 scope.formData.billFrequencyCode = "Monthly";
		        	}*/
		            
		        	/*scope.formData.plan = {
		        		    "billAlign":true,
		        		    "planCode":scope.formData.planCode,
		        		    "contractPeriod":scope.formData.contractPeriod,
		        		    "paytermCode":"Monthly",
		        		    "clientServiceId":scope.formData.clientServiceId,
		        		    "isNewplan":true,
		        		    "locale":"en",
		        		    "dateFormat":"dd MMMM yyyy",
		        		    "planPoId":0,
		        		    "dealPoId":0
			    	   };
		        	scope.formData.plans.push(scope.formData.plan);
			    	   delete scope.formData.plans;*/
		        	
		        	scope.clientAndclientServicePoIds();
		            for(var i in scope.selectedPlans){
		            	scope.selectedPlans[i].clientServiceId = routeParams.clientServiceId;
		            	scope.selectedPlans[i].clientPoId=scope.poidLists.clientPoId;
		            	scope.selectedPlans[i].clientServicePoId=scope.poidLists.clientServicePoId;
		            	scope.selectedPlans[i].catalogeId=scope.formData.catalogeId;
		            	scope.selectedPlans[i].billAlign=true;
		            	scope.selectedPlans[i].clientId=routeParams.id;
		            	/*if(scope.isCrm  == true){
		            		scope.selectedPlans[i].contractPeriod = 1;
		            		scope.selectedPlans[i].paytermCode =  "Monthly";
		            	}*/
		            	/*if(scope.isCrm  == false){
		            		//scope.selectedPlans[i].contractPeriod=scope.formData.contractPeriod;
		            		scope.selectedPlans[i].paytermCode=scope.paytermCode;
		            	}*/
		            	scope.selectedPlans[i].clientServiceId = routeParams.clientServiceId;
		            	scope.selectedPlans[i].locale = "en";
		            	scope.selectedPlans[i].locale = scope.optlang.code;
    		           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
    		           	scope.selectedPlans[i].dateFormat = 'dd MMMM yyyy';
    		           	scope.selectedPlans[i].start_date = reqDate;
    		           	scope.selectedPlans[i].isNewplan=true;
    		        }
		        	 var temp = angular.copy(scope.selectedPlans);
				    scope.addPlansData.plans = temp;
		            resourceFactory.multipleordersResource.save({clientId:scope.clientId},scope.addPlansData,function(data){
		            	location.path('/viewclient/id/' + scope.clientId);
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
	 mifosX.ng.application.controller('AddPlansController', [
  	     '$scope', 
  	     'webStorage',
  	     'ResourceFactory', 
  	     '$location',
  	     'dateFilter',
  	     '$rootScope', 
  	     '$routeParams',
  	mifosX.controllers.AddPlansController]).run(function($log) {
    $log.info("AddPlansController initialized");
    });
}(mifosX.controllers || {}));