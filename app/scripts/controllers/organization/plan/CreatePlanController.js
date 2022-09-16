(function(module) {
	 mifosX.controllers = _.extend(module, {
		 CreatePlanController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
			
			 scope.billRuleDatas = [];
		     scope.availableProducts = [];
		     scope.totalAvailableProducts = [];
		     scope.selectedProducts = [];
		     scope.planStatus =[];
		     scope.provisionSysDatas = [];
		     scope.subscriptiondata = [];
		     scope.volumeTypes = [];
		     scope.allowed = [];
		     scope.restricted = [];
		     scope.nonselectedservice = [];
		     scope.services=[];
		     scope.allowed = [];
		     scope.date = {};
		     scope.start={};
		     scope.end={};
		     scope.restricted = [];
		     scope.products = [];
		     scope.restrictedProducts =[];
		     scope.start.date = new Date();
		     scope.minDate = new Date();
		     scope.minendDate = new Date();
		     scope.currencydatas = [];
		     scope.serviceCodes = [];
		     scope.contracts=[];
		     
		     resourceFactory.planTemplateResource.get(function(data) {
		    	 
		    	 scope.billRuleDatas = data.billRuleDatas;
		         scope.availableProducts = data.products;
		         
		         /*for(var i in scope.availableProducts){
		        	 scope.availableProducts[i].productDisplay = scope.availableProducts[i].productCode+"--"+scope.availableProducts[i].productDescription;
		        	 console.log(scope.availableProducts[i].productDisplay);
		         }*/
		         
		         
		         //scope.selectedProducts = data.products;
		         scope.totalAvailableProducts = data.products;
		         scope.planStatus = data.planStatus;
		         scope.provisionSysDatas = data.provisionSysData;
		        // scope.subscriptiondata = data.subscriptiondata;
		         scope.volumeTypes = data.volumeTypes;
		         scope.productmix = data;
		         scope.allowedProducts = data.products;
		         scope.planTypeData = data.planTypeData;
		         scope.subscriptiondatas = data.subscriptiondata;
		    
		         scope.currencydatas = data.currencydata.currencyOptions;
		         scope.serviceCodes = data.services;
		         
		        for(var i in scope.subscriptiondatas) {
         			if(scope.subscriptiondatas[i].subscriptionPeriod!="Perpetual"){
         				scope.contracts.push(scope.subscriptiondatas[i]);
                	}
         		}
		         
		         scope.formData = {
		                 isPrepaid:false,
		                 status :scope.planStatus[0].id,
		                 provisioingSystem:true,
		                 isAdvance:false
		             };
		     });
		    	           
		     scope.removeSelectedProductsFromAvailable = function(){
		    	 
		    	/* console.log("selected=================");
		    	 console.log(scope.selectedProducts);
		    	 console.log("available=================");
		    	 console.log(scope.availableProducts);*/
		    	 
		    	 for(var i in scope.availableProducts){
		    		 for(var j in scope.selectedProducts){
		    			 if(scope.availableProducts[i].id == scope.selectedProducts[j].id){
		    				 console.log(scope.selectedProducts);
		    				 scope.availableProducts.splice(i,1);break; 
		    			 }
		    		 }
		    		 
		    	 }
		     }
		     
		     
		     scope.serviceChangeFun = function(){
		    	 scope.availableProducts = [];
		    	 for(var i in scope.totalAvailableProducts){
		    		 if(scope.totalAvailableProducts[i].serviceId == scope.formData.serviceId){
		    			 console.log(scope.selectedProducts);
		    			 scope.availableProducts.push(scope.totalAvailableProducts[i]);
		    		 }
		    	 }
		    	 scope.removeSelectedProductsFromAvailable();
		     }
		     scope.$watch('start.date', function() {
		    	    scope.doSomething();  
		    	});
		     
		     scope.doSomething =function(){
		    	   scope.minendDate=scope.start.date;
		    	   if(scope.end.date){
		    		   if(new Date(scope.start.date) > new Date(scope.end.date))
		    			   scope.end.date = scope.start.date;
		    	   }
		       };
		       
		       scope.restrict = function(){
		    	   
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availableProducts){
		                    if(scope.availableProducts[j].id == this.allowed[i])
		                    {
		                    	console.log(scope.selectedProducts);
		                        var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.productCode = scope.availableProducts[j].productCode;
		                        temp.productDescription = scope.availableProducts[j].productDescription;
		                        scope.selectedProducts.push(temp);
		                        scope.availableProducts.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        /*
		        scope.restrict = function(){
		            for(var i in scope.allowed)
		            {
		                for(var j in scope.products){
		                    if(scope.products[j].id == scope.allowed[i])
		                    {
		                        scope.selectedProducts.push(scope.products[j]);
		                        scope.products.splice(j,1);
		                    }
		                }
		            }
		        };*/
		        
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedProducts){
		                    if(scope.selectedProducts[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.productCode = scope.selectedProducts[j].productCode;
		                        temp.productDescription = scope.selectedProducts[j].productDescription;
		                     //   temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
		                        scope.availableProducts.push(temp);
		                        scope.selectedProducts.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        /*
		        scope.allow = function(){
		            for(var i in scope.restricted)
		            {
		                for(var j in scope.selectedProducts){
		                    if(scope.selectedProducts[j].id == scope.restricted[i])
		                    {
		                        scope.products.push(scope.selectedProducts[j]);
		                        scope.selectedProducts.splice(j,1);
		                    }
		                }
		            }
		        };*/
		        
		        
		        scope.getBothcurrency = function(code,name){
		        	return code+"----"+name;
		        };
		        
		        scope.getBothProducts = function(productCode, productDescription){
		        	
					  return productCode+"--"+productDescription;
					   	
		        };
		        
		        /*scope.typeChangeFun = function(serviceId){
		        
		        	if(scope.formData.serviceId == 'allowed'){
		           		resourceFactory.productResourceForDetails.get({productId:serviceId,paramCategory:scope.paramCategory},function(data) {
		           			  	scope.serviceDetailsData = data.serviceDetailDatas;
		           			  	for(var i in scope.serviceDetailsData){
		           			  	  scope.serviceFormData.paramName = scope.serviceDetailsData[i].paramName;
		          				  scope.serviceFormData.paramType = scope.serviceDetailsData[i].paramType;
		          				  scope.serviceFormData.paramCategory = scope.serviceDetailsData[i].paramCategory;
		          				  scope.serviceFormData.paramValue = scope.serviceDetailsData[i].paramValue; 
		          				  scope.addService();
		           			  	}
		           	      });
		           	  }
		        
		        };*/
		        
		        
		        scope.submit = function() {
		        	scope.formData.locale = scope.optlang.code;
		        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy HH:mm:ss');
		        	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy HH:mm:ss');
		        	if(scope.formData.isPrepaid){
		        		scope.formData.duration=scope.contract.id;
		        	}
		        	if(scope.formData.provisioingSystem == true){
		        		scope.formData.provisioingSystem = 'Provision';
		        	}else{ 
		        		scope.formData.provisioingSystem = 'None';
		        	}
		        	scope.formData.dateFormat = 'dd MMMM yyyy HH:mm:ss';
		        	scope.formData.startDate = reqDate;
		        	scope.formData.endDate = reqEndDate;
		        	if(scope.formData.isPrepaid){
		        	scope.formData.units =0;
		        	scope.formData.volume = "None";
		        	}
		        	 var temp = [];
		             for(var i in scope.selectedProducts){
		                 temp[i] = scope.selectedProducts[i].id;
		             }
		             scope.formData.products = temp;
		             resourceFactory.planResource.save(this.formData,function(data){
		             		location.path('/plans');
		              });
		             
		        };
		   }
	 });
	 
mifosX.ng.application.controller('CreatePlanController', [
	     '$scope', 
	     'ResourceFactory', 
	     '$location',
	     'dateFilter',
	     '$rootScope', 
mifosX.controllers.CreatePlanController]).run(function($log) {
$log.info("CreatePlanController initialized");
});
}(mifosX.controllers || {}));