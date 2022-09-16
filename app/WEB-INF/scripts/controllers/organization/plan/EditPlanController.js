(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPlanController: function(scope, routeParams, resourceFactory,dateFilter, location,$rootScope) {
    	
    	scope.planId = routeParams.id;
    	scope.formData = {};
    	scope.planStatus = [];
        scope.billRuleDatas = [];
        scope.subscriptiondata = [];
        scope.provisionSysDatas = [];
        scope.date = {};
        scope.products=[];
        scope.selectedProducts = [];
        scope.volumeTypes=[];
        scope.planTypeData=[];
        scope.currencydatas = [];
        scope.serviceCodes = [];
        scope.contracts = [];
        
        resourceFactory.planResource.get({planId: scope.planId, template: 'true'} , function(data) {
        	
        	
            scope.formData = {
            					planCode 				: data.planCode,
            					status 					: data.status,
            					planDescription 		: data.planDescription,
            					billRule 				: data.billRule,
            					planType				: data.planType,
            					currencyId				: data.currencyId
            				  };
            
            scope.planStatus=data.planStatus;
            scope.billRuleDatas = data.billRuleDatas;
            scope.provisionSysDatas=data.provisionSysData;
            scope.planTypeData=data.planTypeData;
            scope.currencydatas = data.currencydata.currencyOptions;
            scope.serviceCodes  = data.services;
            scope.subscriptiondatas = data.subscriptiondata;
            
            var startDate =data.startDate; 
            var endDate =data.endDate;
            
            for(var i in scope.subscriptiondatas) {
     			if(scope.subscriptiondatas[i].subscriptionPeriod!="Perpetual"){
     				scope.contracts.push(scope.subscriptiondatas[i]);
            	}
     		}
            
            scope.date.startDate = dateFilter(new Date(startDate),'dd MMMM yyyy');
            if(endDate){
            	 scope.date.endDate = dateFilter(new Date(endDate),'dd MMMM yyyy');
            }
            scope.products = data.products;
            scope.totalAvailableProducts = data.products;
            scope.selectedProducts = data.selectedProducts;
            scope.volumeTypes=data.volumeTypes;
            if(data.allowTopup == 'Y'){
            	scope.formData.allowTopup = true;
            	scope.formData.volume = data.volume;
            	scope.formData.units = data.units;
            }else{
            	scope.formData.allowTopup = false;
            }
            scope.formData.provisioingSystem = data.provisionSystem =="Provision"?true:false;
            scope.formData.isPrepaid = data.isPrepaid =='Y'?true:false;
            scope.formData.isHwReq = data.isHwReq =='Y'?true:false;
            scope.formData.serviceId = data.selectedProducts[0].serviceId;
            scope.serviceChangeFun();
            
            scope.subscriptiondatas = data.subscriptiondata;
			for(var i=0;i<scope.subscriptiondatas.length;i++){
                if(scope.subscriptiondatas[i].id==data.duration){
                	scope.formData.duration = scope.subscriptiondatas[i].id;
                	scope.contract = scope.subscriptiondatas[i];
                	break;
                }
			}
            
            
            
        });
        
        scope.getBothcurrency = function(code,name){
        	return code+"----"+name;
        };
        
        scope.getBothProducts = function(productCode, productDescription){
        	
			  return productCode+"--"+productDescription;
        };
        
       scope.removeSelectedProductsFromAvailable = function(){
        	/*console.log("total available");
	    	console.log(scope.totalAvailableProducts);
	    	console.log("selected ");
	    	console.log(scope.selectedProducts);*/
	    	
	    	 for(var i in scope.products){
	    		 for(var j in scope.selectedProducts){
	    			 if(scope.products[i].id == scope.selectedProducts[j].id){
	    				 scope.products.splice(i,1);break; 
	    			 }
	    		 }
	    	 }
	     }
        
        
        scope.serviceChangeFun = function(){
	    	//console.log("servicechangefun called");
	    	
        	scope.products = [];
	    	 for(var i in scope.totalAvailableProducts){
	    		 if(scope.totalAvailableProducts[i].serviceId == scope.formData.serviceId){
	    			 console.log(scope.selectedProducts);
	    			 scope.products.push(scope.totalAvailableProducts[i]);
	    			 
	    		 }
	    	 }
	    	 scope.removeSelectedProductsFromAvailable();
	     }
        
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
        };
        scope.allow = function(){
            for(var i in scope.restricted)
            {
                for(var j in scope.selectedProducts){
                    if(scope.selectedProducts[j].id == scope.restricted[i])
                    {
                    	console.log(JSON.stringify(scope.selectedProducts[j]));
                        scope.products.push(scope.selectedProducts[j]);
                        scope.selectedProducts.splice(j,1);
                    }
                }
              
            }
           
        };
        
        scope.submit = function() {
          
          // reformatting selected products
             scope.formData.products = [];
             for(var i in scope.selectedProducts){
            	 scope.formData.products[i] = scope.selectedProducts[i].id;
             }
             if(scope.formData.isPrepaid){
	        		scope.formData.duration=scope.contract.id;
	        	}
             if(scope.formData.provisioingSystem == true){
         		scope.formData.provisioingSystem = 'Provision';
         	 }else{ 
         		scope.formData.provisioingSystem = 'None';
         	 }
             if(scope.formData.isPrepaid){
             	scope.formData.units =0;
             	scope.formData.volume = "None";
             	}
             scope.formData.locale = scope.optlang.code;
             scope.formData.dateFormat = 'dd MMMM yyyy';
             scope.formData.volume='None';
         	scope.formData.units=0;
             scope.formData.startDate = dateFilter(scope.date.startDate,scope.formData.dateFormat);
             scope.formData.endDate = dateFilter(scope.date.endDate,scope.formData.dateFormat);
             resourceFactory.planResource.update({'planId':scope.planId},scope.formData,function(data){
            	 location.path('/viewplan/' + data.resourceId);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanController', [
   '$scope', 
   '$routeParams', 
   'ResourceFactory', 
   'dateFilter',
   '$location',
   '$rootScope', 
   mifosX.controllers.EditPlanController]).run(function($log) {
    $log.info("EditPlanController initialized");
  });
}(mifosX.controllers || {}));
