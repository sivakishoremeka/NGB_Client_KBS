(function(module) {
      mifosX.controllers = _.extend(module, {
          CreatePartnerAgreementController: function(scope, resourceFactory, location,dateFilter,$rootScope,webStorage,routeParams) {
             
              scope.formData = {};
              scope.finalData = {};
              scope.officeId= routeParams.id;
              scope.officeId = routeParams.officeId;

              scope.date = {};
              scope.date.startDate = dateFilter(new Date(),'dd MMMM yyyy');
              scope.minDate=dateFilter(new Date(),'dd MMMM yyyy');
/*              var dd=new Date();
              scope.formData.endDate = dateFilter(dd.setDate(dd.getDate()+1),'dd MMMM yyyy');*/
              scope.agreementTypes = [];
              scope.sourceDatas = [];
              scope.partnerSourceData = [];
              scope.sourceData = [];
              scope.index=0;
              scope.partnerName =  webStorage.get("partnerName");
              scope.poId = webStorage.get("poId");
              scope.settlementPoId = webStorage.get("settlementPoId");
              scope.clientId = webStorage.get("clientId");
              scope.clientServiceId = webStorage.get("clientServiceId");
              
              
              scope.subscriptiondatas = [];
              scope.contractPeriods = [];
              scope.paytermdatas = [];
              scope.postpaidPlanDatas = [];
              scope.hardwarePlandata = [];
              scope.settlementPlanData = [];
              scope.prepaidPlanDatas  = [];
              /*scope.date = {};
              scope.date.saleDate = dateFilter(new Date(),"dd MMMM yyyy");*/
              scope.formData.dateFormat = "dd MMMM yyyy";
              
              resourceFactory.officeResource.get({officeId:  scope.officeId}, function (data) {
                  scope.office = data;
                  });
              
              resourceFactory.agreementTemplateResource.get(function(data) {
                  
                 scope.agreementTypes =data.agreementTypes;
                 /*scope.sourceDatas = data.sourceData;
                 scope.shareTypes = data.shareTypes;*/
                   
              });
              
                //order plan template resource
                resourceFactory.orderTemplateResource.get({'planId': routeParams.planId,clientId:scope.clientId},function(data) {
                        
                        scope.settlementPlanData = data.settlementPlanDatas;
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
                        scope.paytermdatas=data.paytermdata;;
                        scope.formData = {
                                  billAlign: true,
                                  //autoRenew : isAutoRenew
                                };         
                  });
              
                scope.setBillingFrequency = function(plandata) {
                	  var value = plandata.id;
                      $('plancode').css({"color":"red"});
                    scope.paytermdatas=undefined;
                    /* resourceFactory.orderResource.get({planId:value,clientId: routeParams.id,template: 'true'} , function(data) {
                         scope.paytermdatas=data.paytermdata;
                         scope.formData.paytermCode=scope.paytermdatas[0].paytermtype;
                         scope.subscriptiondatas=data.subscriptiondata;
                         scope.formData.isPrepaid=data.isPrepaid;
                         scope.isPrepaidPlan=data.isPrepaid;
                         scope.formData.planCode=value;
                         scope.formData.contractPeriod=data.contractPeriod;
                        
                     });*/
               };
                
              
              scope.partnersTab=function(){
                    webStorage.add("callingTab", {someString: "offices" });
                };
                  
                  scope.addSourceCategories = function(plandata){
                	  var value = plandata.id;
                	  $('plancode').css({"color":"red"});
                      scope.paytermdatas=undefined;
                      scope.index = scope.index+1;
                        scope.partnerSourceData.push({
                                                        source : scope.sourceData.source,
                                                        shareType : scope.sourceData.shareType,
                                                        shareAmount : scope.sourceData.shareAmount,
                                                        status : scope.sourceData.status,
                                                        index : scope.sourceData.sequence=scope.index,
                                                        locale : scope.optlang.code,
                                                    });
                        
                        
                        resourceFactory.orderResource.get({planId:value,clientId: routeParams.id,template: 'true'} , function(data) {
                            scope.paytermdatas=data.paytermdata;
                            scope.formData.paytermCode=scope.paytermdatas[0].paytermtype;
                            scope.subscriptiondatas=data.subscriptiondata;
                            scope.formData.isPrepaid=data.isPrepaid;
                            scope.isPrepaidPlan=data.isPrepaid;
                            scope.formData.planCode=value;
                            scope.formData.contractPeriod=data.contractPeriod;
                           
                        });
                        scope.sourceData.source = undefined;
                        scope.sourceData.shareType = undefined;
                        scope.sourceData.shareAmount = undefined;
                        scope.sourceData.status = undefined;
                        scope.sourceData.index = undefined;
                        
                    };      
                  
                    scope.removeSourceCategories = function(index){    
                          if(scope.index>=1){
                        scope.partnerSourceData.splice(index,1);}
                    };  
                    
                    scope.planPoidANdDealPoIdAddingtoformData = function(){
                           for(var i in  scope.settlementPlanData){
                               if(scope.settlementPlanData[i].id == scope.formData.planCode){
                                   scope.formData.planPoId = scope.settlementPlanData[i].planPoId;
                                   scope.formData.dealPoId = scope.settlementPlanData[i].dealPoId;
                               }
                           }
                       }
                    
                    scope.getBothPlans = function(planCode, planDescription){
                        
                          return planCode+"--"+planDescription;
                               
                    };
           
              scope.submit =function(){
            	    scope.finalData.plans = [];
                    scope.formData.locale = scope.optlang.code;
                    scope.formData.dateFormat = 'dd MMMM yyyy';
                    var startDate = dateFilter(scope.date.startDate, 'dd MMMM yyyy');
                    var endDate = dateFilter(scope.date.endDate, 'dd MMMM yyyy');
                    scope.formData.start_date = startDate;
                    scope.formData.endDate = endDate;
                    scope.formData.officeId = routeParams.officeId;
                    scope.formData.sourceData = scope.partnerSourceData;
                    scope.planPoidANdDealPoIdAddingtoformData();
                    scope.formData.poId = scope.poId;
                    scope.formData.settlementPoId = scope.settlementPoId;
                    scope.formData.contractPeriod = 1;
                    scope.formData.paytermCode = "1 Month";
                    scope.formData.clientId = scope.clientId;
                    scope.formData.clientServiceId = scope.clientServiceId;
                    scope.formData.id = scope.formData.planCode;
                    scope.formData.clientPoId = scope.clientPoId;
                    scope.formData.isNewplan = true;
                    
                    scope.finalData.plans.push(scope.formData);
                    
                    resourceFactory.agreementResource.save({partnerId: routeParams.id},scope.finalData,function(data){
                     location.path('/viewoffice/' +scope.officeId );
                  }/*,function(errors){
                      for(var i in  scope.partnerSourceData){
                        var error= $("#source" +scope.partnerSourceData[i].index).val();
                        var error1= $("#shareType" +scope.partnerSourceData[i].index).val();
                        var error2= $("#shareAmount" +scope.partnerSourceData[i].index).val();
                    
                        if(error == "?"){
                        $("#source" +scope.partnerSourceData[i].index).addClass("validationerror");}
                        if(error1 == "?"){
                        $("#shareType" +scope.partnerSourceData[i].index).addClass("validationerror");}
                        if(error2 == ""){
                        $("#shareAmount" +scope.partnerSourceData[i].index).addClass("validationerror");}
                      }
                  }*/);
        };        
        
          }
      });
      mifosX.ng.application.controller('CreatePartnerAgreementController',
        ['$scope',
         'ResourceFactory',
         '$location',
         'dateFilter',
         '$rootScope',
         'webStorage',
         '$routeParams', mifosX.controllers.CreatePartnerAgreementController]
      ).run(function($log) {
        $log.info("CreatePartnerAgreementController initialized");
      });
    }(mifosX.controllers || {}));
		        		 /*scope.formData.planCode=value;
		        		 scope.formData.contractPeriod=data.contractPeriod;
		        		
		             });
		       };
		        
			  
			  scope.partnersTab=function(){
		        	webStorage.add("callingTab", {someString: "Partners" });
		        };
				  
				  scope.addSourceCategories = function(){
					  scope.index = scope.index+1;
			        	scope.partnerSourceData.push({
														source : scope.sourceData.source,
														shareType : scope.sourceData.shareType,
														shareAmount : scope.sourceData.shareAmount,
														status : scope.sourceData.status,
														index : scope.sourceData.sequence=scope.index,
														locale : scope.optlang.code,
													});
			        	scope.sourceData.source = undefined;
			        	scope.sourceData.shareType = undefined;
			        	scope.sourceData.shareAmount = undefined;
			        	scope.sourceData.status = undefined;
			        	scope.sourceData.index = undefined;
						
			        };	  
				  
			        scope.removeSourceCategories = function(index){	
			        	  if(scope.index>=1){
			        	scope.partnerSourceData.splice(index,1);}
			        };  
			        
			        scope.planPoidANdDealPoIdAddingtoformData = function(){
				    	   for(var i in  scope.planDatas){
				    		   if(scope.planDatas[i].id == scope.formData.planCode){
				    			   scope.formData.planPoId = scope.planDatas[i].planPoId;
				    			   scope.formData.dealPoId = scope.planDatas[i].dealPoId;
				    		   }
				    	   }
				       }
			        
			        scope.getBothPlans = function(planCode, planDescription){
			        	
						  return planCode+"--"+planDescription;
						   	
			        };
		   
			  scope.submit =function(){
				  
					scope.formData.locale = scope.optlang.code;
				    scope.formData.dateFormat = 'dd MMMM yyyy';
				    var startDate = dateFilter(scope.date.startDate, 'dd MMMM yyyy');
				    var endDate = dateFilter(scope.formData.endDate, 'dd MMMM yyyy');
				    //var reqDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
			        scope.formData.startDate = startDate;
			        scope.formData.endDate = endDate || "";
			       // scope.formData.saleDate = reqDate;
			        scope.formData.officeId = routeParams.officeId;
		            scope.formData.sourceData = scope.partnerSourceData;
		            scope.planPoidANdDealPoIdAddingtoformData();
		            scope.formData.poId = scope.poId;
		            scope.formData.settlementPoId = scope.settlementPoId;
			        resourceFactory.agreementResource.save({partnerId: routeParams.id},scope.formData,function(data){
			    	 location.path('/viewpartner/' +scope.partnerId + '/' + scope.officeId); 
			      },function(errors){
			    	  for(var i in  scope.partnerSourceData){
			    		var error= $("#source" +scope.partnerSourceData[i].index).val();
			    		var error1= $("#shareType" +scope.partnerSourceData[i].index).val();
			    		var error2= $("#shareAmount" +scope.partnerSourceData[i].index).val();
			    	
			    		if(error == "?"){
			    		$("#source" +scope.partnerSourceData[i].index).addClass("validationerror");}
			    		if(error1 == "?"){
			    		$("#shareType" +scope.partnerSourceData[i].index).addClass("validationerror");}
			    		if(error2 == ""){
			    		$("#shareAmount" +scope.partnerSourceData[i].index).addClass("validationerror");}
			    	  }
			      });
	    };        
		 
		  }
	  });
	  mifosX.ng.application.controller('CreatePartnerAgreementController',
		['$scope', 
		 'ResourceFactory', 
		 '$location',
		 'dateFilter',
		 '$rootScope',
		 'webStorage',
		 '$routeParams', mifosX.controllers.CreatePartnerAgreementController]
	  ).run(function($log) {
	    $log.info("CreatePartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));
*/