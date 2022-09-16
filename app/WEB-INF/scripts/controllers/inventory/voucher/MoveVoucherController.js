(function(module) {
	  mifosX.controllers = _.extend(module, {
	    MoveVoucherController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,$rootScope) {
	    	 
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
	    	 var idData = idDataString[0];
	    	 scope.itemDescription= idData+"-"+transferData.itemDescription;

	    	 
	    	 var saleRef = parseInt(idData);
	    	 scope.formData.type = typeData;
	    	 scope.formData.saleRefNo=saleRef;
	    	 scope.formData.quantity = transferData.orderdQuantity;
	    	 scope.formData.toOffice=transferData.toOfficeNum;
	    	 scope.formData.fromOffice=transferData.fromOfficeNum;
	        
	    	 
	        
	        
	        scope.reset123 = function(){
	        	location.path('/stocktransfer');
		       };
		       scope.voucherSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.formData.quantity = parseInt(scope.formData.quantity);
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();		        	
		        	scope.formData.movedDate = reqDate;
		        	console.log(scope.formData)
		        	resourceFactory.moveVoucherUpdateResource.update({officeId: scope.formData.toOffice},scope.formData,function(data){
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/stocktransfer');
		          });
		        	
		        };
		        
		    	
	    }
	  });
	  mifosX.ng.application.controller('MoveVoucherController', ['$scope','webStorage', 'ResourceFactory','$location','dateFilter','PermissionService','$rootScope', mifosX.controllers.MoveVoucherController]).run(function($log) {
	    $log.info("MoveVoucherController initialized");
	  });
	}(mifosX.controllers || {}));
