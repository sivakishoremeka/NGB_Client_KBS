(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateTaxMappingController: function(scope, resourceFactory, routeParams, location, dateFilter, $rootScope) {
        scope.chargecodetaxs = [];
        scope.typetaxmapdatas = [];
        scope.priceRegionDatas = [];
        scope.priceDatas = [];
        scope.date = {};
        scope.start = {};
        scope.formData = {};
        scope.start.date = new Date();
        scope.minDate = new Date();
        
        resourceFactory.taxmappingtemplateResource.getAlltaxmapping({'chargeCode':routeParams.chargeCode}, function(data) {

        	scope.taxTypeDatas = data.taxTypeData;
            scope.priceRegionDatas = data.priceRegionData;
            scope.formData = data;
            for(var i in data.taxMapDatas){
            	var reqDate = dateFilter(data.taxMapDatas[i].startDate, 'dd MMMM yyyy');
            	data.taxMapDatas[i].startDate = reqDate;
            scope.priceDatas.push(data.taxMapDatas[i]);
            	
            }
        });
        
        scope.doSomething =function(){
     	   if(scope.end.date){
     		   if(new Date(scope.start.date) > new Date(scope.end.date))
     			   scope.end.date = scope.start.date;
     	   }
        };
        
        scope.addTaxData = function(){
        	if(scope.formData.chargeCode && scope.formData.taxCode && 
        		scope.formData.taxType && scope.formData.rate && scope.formData.taxRegion ){
        		var reqDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
        		scope.formData.dateFormat = 'dd MMMM yyyy';
        		scope.formData.startDate = reqDate;
        		scope.formData.locale = scope.optlang.code;
        		delete scope.formData.priceRegionData;
                delete scope.formData.taxTypeData;
                delete scope.formData.taxMapDatas;
        		resourceFactory.getTaxmappingResource.save({'taxId':routeParams.chargeCode}, scope.formData, function(data){
        			scope.getId = data.resourceId;
   					/* location.path('/viewtaxmapping/' + data.resourceId+'/'+scope.chargeCodeId);*/
        		});

        		scope.transferData = angular.copy(scope.formData);
            	for ( var l in scope.priceRegionDatas) {
        			if(scope.transferData.taxRegion == scope.priceRegionDatas[l].id){
        			  scope.transferData.taxRegion = scope.priceRegionDatas[l].priceregion;
        			}
        		}
            
            	scope.priceDatas.push(scope.transferData);
            	var chargeCode = scope.formData.chargeCode;
        	   	scope.formData = {};
        	   	scope.formData.chargeCode = chargeCode;
             } 
          };
       
        	 scope.removeTaxData = function (index,taxId) {
                /* if(taxId !=undefined){*//*Delete particular taxdata */
                
        		 if(taxId==undefined){
        			 taxId = scope.getId;
        		 }
        		 resourceFactory.getTaxmappingResource.remove({taxId: taxId} , {} , function() {
        			 scope.priceDatas.splice(index, 1);
        		 });
        		 
             };
        	
        priceDataSendingOneByOneFun = function(val){
        	
        	/*if(!scope.priceDatas[val].id){update plan price
        		scope.taxId = scope.priceDatas[val].id;
        		var reqDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
        		scope.priceDatas[val].dateFormat = 'dd MMMM yyyy';
        		scope.priceDatas[val].startDate = reqDate;
        	    delete scope.priceDatas[val].id;
        	    delete scope.priceDatas[val].taxRegionId;
        		 resourceFactory.getTaxmappingResource.update({'taxId': scope.taxId}, scope.priceDatas[val], function(data){
   				 if(val == scope.priceDatas.length-1){
   					location.path('/viewtaxmapping/' + data.resourceId+'/'+scope.chargeCodeId);
   				 }else{
   					 val += 1;
   					 priceDataSendingOneByOneFun(val);
   			 	 }
   			 });
        	}*/
        	if(!scope.priceDatas[val].id){/*create new  plan price*/
        		scope.taxId = scope.priceDatas[val]
        		delete scope.priceDatas[val].priceRegionData;
        		delete scope.priceDatas[val].taxTypeData;
        		delete scope.priceDatas[val].taxMapDatas;
        		delete scope.priceDatas[val].id;
        	    delete scope.priceDatas[val].taxRegionId;
        		var reqDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
        		scope.priceDatas[val].dateFormat = 'dd MMMM yyyy';
        		scope.priceDatas[val].startDate = reqDate;
        		 resourceFactory.getTaxmappingResource.save({'taxId':routeParams.chargeCode}, scope.priceDatas[val], function(data){
    				 if(val == scope.priceDatas.length-1){
    					 location.path('/viewtaxmapping/' + data.resourceId+'/'+scope.chargeCodeId);
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
        
        /*scope.submit = function() {
        	this.formData.locale = scope.optlang.code;
        	var reqDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.startDate = reqDate;
         
            delete this.formData.priceRegionData;
            delete this.formData.taxTypeData;
            resourceFactory.getTaxmappingResource.save({'taxId':routeParams.chargeCode}, this.formData, function(data){
            		location.path('/taxmapping/' + routeParams.chargeCode + '/' + data.resourceId);
            });
        };*/
    }
  });
  mifosX.ng.application.controller('CreateTaxMappingController', [
       '$scope', 
       'ResourceFactory',
       '$routeParams',
       '$location',
       'dateFilter',
       '$rootScope',
       mifosX.controllers.CreateTaxMappingController
       ]).run(function($log) {
    	   $log.info("CreateTaxMappingController initialized");
       });
}(mifosX.controllers || {}));