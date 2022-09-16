(function(module) {
	  mifosX.controllers = _.extend(module, {
	    MoveMrnCartoonController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,$rootScope) {
	    	 scope.mrnIds = [];
	    	 scope.cartoonNumbers = [];
	    	 scope.first = {};
	    	 scope.first.date = new Date();
	        resourceFactory.movemrncartoontemplateresource.get(function(data) {
	        	scope.mrnIds = data.mrnIds;
	        	scope.formData = data;
	        	scope.itemIds=data.itemsaleIds;
	        });
	        
	        
	       scope.getCartoonNumbers = function(itemId){
	        	 resourceFactory.movemrncartoontemplateresource.get({mrnId: itemId},function(data) {
	        		// scope.mrnIds = data.mrnIds;
	        		 scope.cartoonNumbers = data.cartoonNumber;
	 	        });
	        };
	        scope.getCartoonNumbersForItems = function(saleId){
	        	 resourceFactory.movemrncartoontemplateresource.get({itemsaleId: saleId},function(data) {
	        		 scope.cartoonNumbers1 = data.cartoonNumber;
	        			

	 	        });
	        };
	        scope.getBoth =function(mrnId,description){
	        	return mrnId+"--"+description;
	        };
	        
	        scope.reset123 = function(){
		    	   location.path('/stocktransfer');
		       };
		       scope.mrncartoonSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete this.formData.itemId;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.movemrncartoonresource.save(this.formData,function(data){
		        		/*location.path('/viewmovemrn/'+data.resourceId);*/
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/stocktransfer');
		          });
		        	
		        };
		        
		    	/*scope.saleSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete this.formData.mrnId;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.movemrncartoonresource.save(this.formData,function(data){
		        		location.path('/viewmovemrn/'+data.resourceId);
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/inventory');
		          });
		        	
		    	};*/
	    }
	  });
	  mifosX.ng.application.controller('MoveMrnCartoonController', ['$scope','webStorage', 'ResourceFactory','$location','dateFilter','PermissionService','$rootScope', mifosX.controllers.MoveMrnCartoonController]).run(function($log) {
	    $log.info("MoveMrnCartoonController initialized");
	  });
	}(mifosX.controllers || {}));
