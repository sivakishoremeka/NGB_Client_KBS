(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditQuoteController: function(scope, routeParams, resourceFactory, location,$rootScope,webStorage,dateFilter) {
    	
		  scope.date = {};
		  scope.quote = {};
		  scope.formData = {};
		  scope.quoteFormData = {};
		  scope.viewquote=[];
		  scope.formData.status = "New";
		  scope.quote.date = new Date();
		  scope.minDate = new Date();
		  scope.minendDate = new Date();
		  scope.prospects = [];
		  scope.serviceDatas = [];
		  scope.chargecodes = [];
		  scope.availablePlans = [];
		  scope.planPrice = [];
		  scope.servicePlans = [];
		  
		  
		  scope.quoteId = routeParams.quoteId;
		  console.log(scope.quoteId);
		  
		  resourceFactory.prospectResource.get({ prospectId : routeParams.id }, function(data) {				
				scope.formData.customerId = data.id;
				scope.formData.customerName = data.firstName;
				scope.formData.address = data.address;
				scope.formData.streetArea = data.streetArea;
				scope.formData.cityDistrict = data.cityDistrict;
				scope.formData.district = data.district;
				scope.formData.state = data.state;
				scope.formData.country = data.country;
				scope.formData.zipCode = data.zipCode;
				/*var x = Math.floor((Math.random() * 10000));
				var y = routeParams.id;
				scope.formData.quoteNo ='QN'+y+x;*/
				
		  });
		  
		  resourceFactory.clientserviceTemplateResource.get(function(data) {
			  scope.serviceDatas = data.serviceData;
		  });
		  
		  scope.serviceChangeFun = function(service){
			  var serviceId = service.id;
			 resourceFactory.quoteServicePlanResource.get({serviceId:serviceId} , function(data) {
		         scope.availablePlans = data;
		     });
		  }
		  
		  resourceFactory.chargecodeResource.query(function(data) {
	            scope.chargecodes = data;
	      });
		  
		  scope.ChangeFun = function(){
			 resourceFactory.quotePlanPriceResource.get({'planId':scope.formData.availablePlan.planId,'chargecode':scope.formData.chargeCode} , function(data) {
		         scope.planPrice = data;         
		         for(var i in scope.planPrice){
		                if(scope.planPrice[0]){	                	
		                 scope.formData.recurringCharge = scope.planPrice[0].recurringCharge;
		                 if(scope.formData.recurringCharge == null){
		                 	scope.formData.recurringCharge = 0;
		                 }
		                 
		                 scope.formData.oneTimeCharge = scope.planPrice[0].oneTimeCharge;
		                 if(scope.formData.oneTimeCharge == null){
		                 scope.formData.oneTimeCharge = 0;
		                }
		                }else{
		                	scope.formData.recurringCharge = 0;
		                	scope.formData.oneTimeCharge = 0;
		                }
		           }
		     });
		  }
		  
		  scope.addServicePlanData = function () {
		    	 if (scope.formData.serviceData.id && scope.formData.availablePlan.planId && (scope.formData.recurringCharge || scope.formData.oneTimeCharge || scope.formData.chargeCode) ) {
		    		 
		    		 scope.servicePlans.push({serviceId:scope.formData.serviceData.id, serviceCode:scope.formData.serviceData.serviceCode,
		                planId:scope.formData.availablePlan.planId,planDescription:scope.formData.availablePlan.planDescription,chargeCode:scope.formData.chargeCode,recurringCharge:scope.formData.recurringCharge,oneTimeCharge:scope.formData.oneTimeCharge
		             });
		    		 
		    		 scope.totalCharge(scope.servicePlans);
		          }
		  };
		  
		  scope.removeServicePlans = function (index) {
	            scope.servicePlans.splice(index,1);
	            scope.totalCharge(scope.servicePlans);
	      };
	      
	      scope.totalCharge = function(servicePlan){
	    	  var servicePlans = servicePlan;
	    	  scope.servicePlans = servicePlans;
	    	  
	    	  console.log(JSON.stringify(servicePlans));
	    	  scope.formData.totalCharge = 0;
	    	  
		    	  if(scope.servicePlans.length > 0){
		    		  delete scope.servicePlans.$promise;
			    	  delete scope.servicePlans.$resolved;	 
		    		  for(var i in scope.servicePlans){
		    				 console.log(i);
		    				 scope.charge = scope.servicePlans[i].recurringCharge + scope.servicePlans[i].oneTimeCharge;
		    				 scope.formData.totalCharge = scope.formData.totalCharge + scope.charge; 
		    		     } 
		    	  }
	          }
		resourceFactory.quoteGenerationResource.get({ leadId : routeParams.id ,'quoteId': routeParams.quoteId }, function(data) {
			scope.viewquote = data;
			if(scope.viewquote != null){
           		
           		scope.servicePlans = scope.viewquote;
           		scope.formData.totalCharge=scope.viewquote[0].totalCharge;
           		scope.formData.quoteNo =scope.viewquote[0].quoteNumber;
           		scope.formData.note = scope.viewquote[0].Notes;
           	}


			
		});
	      scope.submit = function() {
	        	
	    	    var reqDate = dateFilter(scope.quote.date,'dd MMMM yyyy');
	    	  
	    	    scope.quoteFormData.leadId = scope.formData.customerId;
	    	    scope.quoteFormData.quoteStatus = scope.formData.status;
	    	    scope.quoteFormData.dateFormat = 'dd MMMM yyyy';
	    	    scope.quoteFormData.quoteDate = reqDate;
	    	    scope.quoteFormData.totalCharge = scope.formData.totalCharge;
	    	    scope.quoteFormData.Notes = scope.formData.note;
	    	    scope.quoteFormData.quoteNo = scope.formData.quoteNo;
	    	  
	        	 scope.quoteFormData.servicePlanDetails =new Array();
	        	 if (scope.servicePlans.length > 0) {
	                 for (var i in scope.servicePlans) {
	                	 delete scope.servicePlans.$promise;
				    	  delete scope.servicePlans.$resolved;	
	                	 scope.quoteFormData.servicePlanDetails.push({serviceId:scope.servicePlans[i].serviceId, 
	                	   planId:scope.servicePlans[i].planId,planRecurirngCharge:scope.servicePlans[i].recurringCharge,
	                	   planonetimeCharge:scope.servicePlans[i].oneTimeCharge,chargeCode:scope.servicePlans[i].chargeCode,locale:scope.optlang.code});
	                 };
	            }
	        	 
	        	this.quoteFormData.locale = scope.optlang.code;
	            resourceFactory.editquoteResource.update({quoteId : routeParams.quoteId},scope.quoteFormData,function(data){
	            	location.path('/viewprospects/' + routeParams.id);
	               });
	        };
		  
		  
    }
  });
  mifosX.ng.application.controller('EditQuoteController', [
    '$scope', 
    '$routeParams', 
    'ResourceFactory', 
    '$location',
    '$rootScope',
    'webStorage',
    'dateFilter',
    mifosX.controllers.EditQuoteController]).run(function($log) {
    $log.info("EditQuoteController initialized");
  });
}(mifosX.controllers || {}));
