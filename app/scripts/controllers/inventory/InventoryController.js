(function(module) {
  mifosX.controllers = _.extend(module, {
    InventoryController: function(scope,webStorage, routeParams, location,$uibModal, resourceFactory, paginatorService,PermissionService,route,$rootScope,dateFilter) {
    	
    	 scope.itemdetails = [];
    	 scope.officeDatas = [];
    	 scope.itemMasterDatas = [];
    	 scope.itemhistory = [];
    	 
    	 /*scope.itemDetailsFetchFunction = function(offset, limit, callback) {
 			resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit} , function(data){
 				scope.totalpropeties = data.totalFilteredRecords;
 	        	scope.allDatas = data.pageItems;
 	        	if(scope.totalpropeties%14 == 0)	
 	        		scope.totalPages = scope.totalpropeties/14;
 	        	else
 	        		scope.totalPages = Math.floor(scope.totalpropeties/14)+1;   
 	        	callback(data);
 			});
 		
     	};	
     scope.itemdetails = paginatorService.paginate(scope.itemDetailsFetchFunction, 14);*/
     		
     		resourceFactory.itemDetailTemplateDropdownResource.get({} , function(data) {
     			scope.officeDatas = data.officeData;
     			scope.itemMasterDatas = data.itemMasterData;
     	           
             });
     		
    	
    	scope.searchItemDetails123 = function(offset, limit, callback) {
			resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } ,  function(data){
	    			  scope.totalpropeties = data.totalFilteredRecords;
	  	        	scope.allDatas = data.pageItems;
	  	        	if(scope.totalpropeties%14 == 0)	
	  	        		scope.totalPages = scope.totalpropeties/14;
	  	        	else
	  	        		scope.totalPages = Math.floor(scope.totalpropeties/14)+1;   
	  	        	callback(data);
	    		  }); 
		};
	  		
  		scope.searchItemDetails = function(filterText) {
  			scope.filterText = filterText;
  			scope.itemdetails = paginatorService.paginate(scope.searchItemDetails123, 14);
  		};
  		
  		scope.searchStatusDetails = function(offset, limit, callback) {
        	  if(scope.source == 'ALL')
  	    	  resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit,officeName : scope.officeName,itemCode : scope.itemCode} , callback);
        	  else
        		  resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit , 
  		    		  sqlSearch: scope.source ,officeName : scope.officeName,itemCode : scope.itemCode} , callback);
  	    };
  	  		
  	    scope.searchSource = function(source) {
  	    	scope.source = source;
  	    	scope.itemdetails = paginatorService.paginate(scope.searchStatusDetails, 14);
  	    };
  	    

 		
 		scope.deviceShow= function(){
 			if(scope.filterText!=null){
 				return scope.filterText;
 			}else if (scope.source!=null){
 				return scope.source;
 			}else if (scope.officeName!=null){
 				return scope.officeName;
 			}else if(scope.itemCode!=null){
 				return scope.itemCode;
 			}
 		}
 		
 		scope.editProvSerial= function(itemId,valueQuality,provisionalserialNum){
 			scope.itemid=itemId;
            scope.valueQuality=valueQuality;
            scope.provisionalserialNum=provisionalserialNum;
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $uibModal.open({
                  templateUrl: 'EditProvSerial.html',
                  controller: EditQualityController,
                  resolve:{}
              });
         };
         
         scope.editQuality = function(itemId,valueQuality,provisionalserialNum,serialNumber){
	      
        	 scope.itemid=itemId;
	            scope.valueQuality=valueQuality;
	            scope.provisionalserialNum=provisionalserialNum;
	            scope.serialNumber=serialNumber;
	        	  scope.errorStatus=[];scope.errorDetails=[];
	        	  $uibModal.open({
	                  templateUrl: 'EditQuality.html',
	                  controller: EditQualityController,
	                  resolve:{}
	              });
	     };
          
          
          var EditQualityController = function ($scope, $uibModalInstance) {

	          	resourceFactory.itemDetailTemplateResource.get(function(data) {
	                  $scope.qualityDatas = data.qualityDatas;
	                  $scope.quality=scope.valueQuality;
	                  $scope.provserialnum=scope.provisionalserialNum;
	                  $scope.serialNumber= scope.serialNumber;
	              });
	        	  $scope.approveQuality = function (value,provserialnum,serialNumber) {
	        		//  alert(value);
	        		  $scope.flagEditQuality=true;
	        		  //if(this.formData == undefined || this.formData == null){
	        			  this.formData = {"quality":value};
	        			  this.formData = {"quality":value,"provisioningSerialNumber":provserialnum,"serialNumber":serialNumber};
	        		  //}
	        		  resourceFactory.itemDetailsResource.update({'itemId': scope.itemid},this.formData,function(data){
	        	      
	        	          $uibModalInstance.close('delete');
	        	          location.path("/viewitemdetails/"+data.resourceId);
	        	        },function(errData){
			        		$scope.flagEditQuality = false;
			          });
	              };
	              $scope.cancelQuality = function () {
	                  $uibModalInstance.dismiss('cancel');
	              }; 
	          };
	          
	          scope.itemHistoryPopup = function(serialNumber){
	    		   scope.serialNumber = serialNumber;
	               $uibModal.open({
	                   templateUrl: 'itemhistory.html',
	                   controller: ItemhistoryController,
	                   resolve:{}
	               });
	       	  };
	       	  
	       	var ItemhistoryController=function($scope,$uibModalInstance){
	    		$scope.searchHistory123 = function(offset, limit, callback) {
			    	  resourceFactory.itemhistoryResource.getAlldetails({offset: offset, limit: limit , 
			    		  sqlSearch:  scope.serialNumber } , callback); 
			     };
			  		
			     $scope.itemhistory = paginatorService.paginate($scope.searchHistory123, 14);
			     
	    		$scope.accept = function(){
	    		 $uibModalInstance.close('delete');
	    		};
	        };
	        
	        scope.deleteItemDetail = function(id){
	        	scope.itemDetailId=id;
	            $uibModal.open({
	                templateUrl: 'approvedelete.html',
	                controller: approveToDelete,
	                resolve:{}
	            });
	    	};
	    	
	    	var approveToDelete = function ($scope, $uibModalInstance) {
	            $scope.approveToDelete = function () {
	               resourceFactory.itemDetailsforDeleteResource.delete({'itemId':scope.itemDetailId},{},function(data){ 
	            	  route.reload();
	            	 location.path('/inventory');

	            });
	                $uibModalInstance.close('delete');
	            };
	            $scope.cancelItem = function () {
	            	$uibModalInstance.dismiss('cancel');
	            };
	        };
	        
	      /*  scope.routeTo = function(accountNumber){
	        	if(id !== 0 && id!=undefined && id!=null){
	        		if(PermissionService.showMenu('READ_CLIENT'))
	        			location.path('/viewclient/id/'+ accountNumber);
	        	}else{}
	        };*/
	        
	        scope.routeTo = function(clientId){
	        	if(clientId!== 0 && clientId!== undefined && clientId!== null){
	       			location.path('/viewclient/id/'+ clientId);
	        	}
	        };
	
	      /* scope.routeTo = function(clientId){
	            location.path('/viewclient/id/'+ clientId);
	          };
    	*/
    }
  });
  mifosX.ng.application.controller('InventoryController', ['$scope','webStorage', '$routeParams', '$location','$uibModal', 'ResourceFactory','PaginatorService','PermissionService','$route','$rootScope', 'dateFilter',mifosX.controllers.InventoryController]).run(function($log) {
    $log.info("InventoryController initialized");
  });
}(mifosX.controllers || {}));


	
