(function(module) {
	  mifosX.controllers = _.extend(module, {
	    MoveMrnController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,$rootScope) {
	    	 scope.mrnIds = [];
	    	 scope.grvIds = [];
	    	 scope.first = {};
	    	 scope.formData={};
	    	 scope.first.date = new Date();
	    	 
	    	 
	    	 var transferData= webStorage.get("transferData");
	    	 
	    	
	    	 var idText = transferData.id.split("(");
	    	 var typeData = idText[0].trim().toLowerCase();
	    	 if(typeData=='item sale'){
	    		 typeData='sale';
	    	 }
	    	 var idDataString = idText[1].split(")");
	    	 console.log(idDataString[0]);
	    	 var idData = idDataString[0];
	    	 scope.itemDescription= idData+"-"+transferData.itemDescription;
	    		 
	    	 scope.formData.type = typeData;
	    	 if(typeData == 'mrn'){
	    		 scope.formData.mrnId=idData;
	    	 }else if(typeData == 'sale'){
	    		 scope.formData.itemId=idData;
	    	 }else if(typeData == 'grv'){
	    		 scope.formData.grvId=idData;
	    	 }
	    	 
	    	 
	    	/*  resourceFactory.moveMrnResource.get(function(data) {
	        	scope.mrnIds = data.mrnIds;
	        	scope.grvIds = data.grvIds;
	        	scope.formData = data;
	        	scope.itemIds=data.itemsaleIds;
	        	console.log(scope.formData);
	        });
	        */
	        
	        
	    	 scope.getSerialNumbers = function(itemId){
	    		 resourceFactory.moveMrnResource.get({mrnId: itemId},function(data) {
	        		 scope.serialNumbers = data.serialNumber;
	        	});
	        };
	        scope.getSerialNumbersForItems = function(saleId){
	        	 resourceFactory.moveMrnResource.get({itemsaleId: saleId},function(data) {
	        		 scope.serialNumbers1 = data.serialNumber;
	 	        });
	        };
	        scope.getSerialNumbersForGRV = function(grvId){
	        	 resourceFactory.moveMrnResource.get({grvId: grvId},function(data) {
	        		 scope.serialNumbers2 = data.serialNumber;
	 	        });
	        };
	        scope.getBoth =function(mrnId,description){
	        	return mrnId+"--"+description;
	        };
	        
	        scope.getBothGrv =function(grvId,description){
	        	return grvId+"--"+description;
	        };
	        console.log(idData);
	        
	        
	        /*if(typeData=='mrn'){
	    		   scope.getSerialNumbers(idData);
	   		 }else if(typeData=='sale'){
	   			scope.getSerialNumbersForItems(idData);
	   		 }else if(typeData=='grv'){
	   			scope.getSerialNumbersForGRV(idData);
	   		 }*/
	        
	        scope.reset123 = function(){
	        	location.path('/stocktransfer');
		       };
		       scope.mrnSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete scope.formData.grvIds;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.moveMrnSaveResource.save(scope.formData,function(data){
		        		/*location.path('/viewmovemrn/'+data.resourceId);*/
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/stocktransfer');
		          });
		        	
		        };
		        
		        
		    	scope.saleSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete scope.formData.grvIds;
		        	delete this.formData.mrnId;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.moveItemSaleSaveResource.save(this.formData,function(data){
		        		/*location.path('/viewmovemrn/'+data.resourceId);*/
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/stocktransfer');
		          });
		        	
		    	};
		    	
		    	scope.grvSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.grvIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete this.formData.itemId;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.moveGrvSaveResource.save(scope.formData,function(data){
		        		/*location.path('/viewmovemrn/'+data.resourceId);*/
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/stocktransfer');
		          });
		        	
		        };
		    	
	    }
	  });
	  mifosX.ng.application.controller('MoveMrnController', ['$scope','webStorage', 'ResourceFactory','$location','dateFilter','PermissionService','$rootScope', mifosX.controllers.MoveMrnController]).run(function($log) {
	    $log.info("MoveMrnController initialized");
	  });
	}(mifosX.controllers || {}));
