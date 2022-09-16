(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddressTreeviewController: function(scope, resourceFactory,$uibModal,route,PermissionService) {
     
      var idToNodeMap = {};

       scope.PermissionService = PermissionService;
        var str = "new";
        scope.services =[];
        resourceFactory.serviceResource.get({},function(data){
    		scope.services = data.pageItems;  
    	  
    	});
   
        
        scope.elementSelect = function(id,nodeName,nodeCode){
        	scope.nodeId = id;
        	scope.nodeName = nodeName;
        	scope.nodeCode = nodeCode;
        	scope.elementId = id.split("-");
        };
        scope.addCountry = function(){
        	
      	  $uibModal.open({
                templateUrl : 'addCountry.html',
                controller : addCountryController,
                resolve : {}
            });
        };
        
        scope.serviceAvailblity = function(addressType){
        	  $uibModal.open({
                  templateUrl : 'serviceAvailblity.html',
                  controller : serviceAvailblityController,
                  resolve : {
                	  addressType : function() {
							return addressType;
						}
                  }
              });
          };
        
        scope.editCountry = function(){
        	
        	  $uibModal.open({
                  templateUrl: 'editCountry.html',
                  controller: editCountryController,
                  resolve:{}
              });
        };
          scope.deleteCountry = function(){
        	  var stateCount = 0;
        	  for (var i in scope.stateObject){
        		  if(scope.nodeId == scope.stateObject[i].parentId){
        			  stateCount++;
        			  break;
        		  }
        	 	}
        		 if(stateCount)
        			 $uibModal.open({
        				 templateUrl: 'countryAlert.html',
        				 controller: countryAlertController,
        				 resolve:{}
        			 });
        		 else
        			 $uibModal.open({
        				 templateUrl: 'deleteCountry.html',
        				 controller: deleteCountryController,
        				 resolve:{}
        			 });
        	
          };
         //state
        scope.addState = function(){
        	  $uibModal.open({
                  templateUrl: 'addState.html',
                  controller: addStateController,
                  resolve:{}
              });
          };
          scope.editState = function(){
          	
        	  $uibModal.open({
                  templateUrl: 'editState.html',
                  controller: editStateController,
                  resolve:{}
              });
          };
          scope.deleteState = function(){
            	
        	  var districtCount = 0;
        	  for (var i in scope.districtObject){
        		  if(scope.nodeId == scope.districtObject[i].parentId){
        			  districtCount++;
        			  break;
        		  }
        	 	}
        	  if(districtCount)
        		  $uibModal.open({
        			  templateUrl: 'stateAlert.html',
        			  controller: stateAlertController,
        			  resolve:{}
        		  });
        	  else
        		  $uibModal.open({
        			  templateUrl: 'deleteState.html',
        			  controller: deleteStateController,
        			  resolve:{}
        		  });
          };
          
          
          
          //district start
         
          scope.addDistrict = function(){
        	  $uibModal.open({
                  templateUrl: 'addDistrict.html',
                  controller: addDistrictController,
                  resolve:{}
              });
          };
          scope.editDistrict = function(){
          	
        	  $uibModal.open({
                  templateUrl: 'editDistrict.html',
                  controller: editDistrictController,
                  resolve:{}
              });
          };
          scope.deleteDistrict = function(){
            	
        	  var cityCount = 0;
        	  for (var i in scope.cityObject){
        		  if(scope.nodeId == scope.cityObject[i].parentId){
        			  cityCount++;
        			  break;
        		  }
        	 	}
        	  if(cityCount)
        		  $uibModal.open({
        			  templateUrl: 'districtAlert.html',
        			  controller: districtAlertController,
        			  resolve:{}
        		  });
        	  else
        		  $uibModal.open({
        			  templateUrl: 'deleteDistrict.html',
        			  controller: deleteDistrictController,
        			  resolve:{}
        		  });
          };
          //end
          
          
          
          
          scope.addCity = function(){
        	  $uibModal.open({
                  templateUrl: 'addCity.html',
                  controller: addCityController,
                  resolve:{}
              });
          };
          scope.editCity = function(){
            	
        	  $uibModal.open({
                  templateUrl: 'editCity.html',
                  controller: editCityController,
                  resolve:{}
              });
          };
          scope.deleteCity = function(){
          	
        	  $uibModal.open({
                  templateUrl: 'deleteCity.html',
                  controller: deleteCityController,
                  resolve:{}
              });
          };
          
          
          var addCountryController = function ($scope, $uibModalInstance) {
        	  	$scope.formData = {};
        	  $scope.submit = function () {
        		  
        		  resourceFactory.addCountryResource.get($scope.formData,function(data){
        			  console.log(JSON.stringify(data));
        			  $uibModalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          
          var serviceAvailblityController = function ($scope, $uibModalInstance, addressType){
        	  $scope.formData = {};
        	  $scope.services = scope.services;
        	  var serviceList = [];
        	  var addressId=scope.elementId[1];
        	  resourceFactory.serviceAvailabiltyAddressResource.get({'addressType':addressType, 'addressId':addressId},function(data){
        		  $scope.servicesAvailables = data;
        		  for(var i=0;i<$scope.servicesAvailables.length;i++){
        			  for(var j=0;j<$scope.services.length;j++){
        				  if($scope.servicesAvailables[i].serviceId == $scope.services[j].id){
        					  $scope.services[j].checked = true;
        					  serviceList.push($scope.servicesAvailables[i].serviceId);
        					  break;
        				  }
        				  if(j==$scope.services.length){
        					  $scope.services[j].checked = false;
        				  }
        			  }
        		  }
        	  });
        	  $scope.submit = function () {
        		  $scope.formData.services =  serviceList;
        		  $scope.formData.addressType = addressType;
        		  $scope.formData.addressId = addressId;
        		  resourceFactory.serviceAvailabiltySaveAddressResource.save({'addressId':addressId},$scope.formData,function(data){
        			  $uibModalInstance.dismiss('cancel');
            	  });
        	  };
        	  $scope.serviceSelected = function(service){
        		  if(service.checked){
        			  serviceList.push(service.id);
        		  }else{
        			  for(var i=0;i<serviceList.length;i++){
        				  if(serviceList[i]==service.id){
        					  var removeIndex = i;
        					  ~removeIndex && serviceList.splice(removeIndex, 1);
        				  }
        			  }
        			  /*serviceList= _.without(serviceList,service.id);*/
        		  }
        	  };
        	  
        	  $scope.cancel = function () {
        		  for(var j=0;j<$scope.services.length;j++){
      				$scope.services[j].checked = false;
      			  }
                  $uibModalInstance.dismiss('cancel');
              };
          };
          
          
          
          var editCountryController = function ($scope, $uibModalInstance) {
        	  		
        	  		$scope.formData={};
        	  		$scope.formData.entityCode = scope.nodeCode;
	 				$scope.formData.entityName = scope.nodeName;
	 				/*$scope.formData.entitydialingCode = scope.nodedialingCode;*/
	 				
        	  $scope.submit = function () {
        		  	
        		  var countryId=scope.elementId[1];
        		  resourceFactory.editCountryResource.update({id:countryId},$scope.formData,function(data){
        			  $uibModalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          var deleteCountryController = function ($scope, $uibModalInstance) {
        	  	
        	  $scope.approveDeleteCountry = function () {
        		  $scope.countryId=scope.elementId[1];
        		  resourceFactory.editCountryResource.remove({id:$scope.countryId},{},function(data){
        			  $uibModalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          
          var countryAlertController = function ($scope, $uibModalInstance) {
        	  $scope.countryName = scope.nodeName;
        	  $scope.approve = function () {
        		  $uibModalInstance.close('delete');
              };
          };
          
	          
          var addStateController = function ($scope, $uibModalInstance) {
        	  $scope.formData = {};
        	  $scope.nodeName=scope.nodeName;
	        	  $scope.submit = function () {
	        		  
	        		  $scope.formData.parentEntityId = scope.elementId[1];
	        		  resourceFactory.addStateResource.get($scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
	       var editStateController = function ($scope, $uibModalInstance) {
	    	   		
	    	   		$scope.formData={};
    	 			$scope.formData.entityCode = scope.nodeCode;
    	 			$scope.formData.entityName = scope.nodeName;
	        	  $scope.submit = function () {
	        		  
	        		  var stateId=scope.elementId[1];
	        		  resourceFactory.editStateResource.update({id:stateId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        var deleteStateController = function ($scope, $uibModalInstance) {
	        	  $scope.approveDeleteState = function () {
	        		  $scope.stateId=scope.elementId[1];
	        		  resourceFactory.editStateResource.remove({id:$scope.stateId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        var stateAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.stateName = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };
	          
	          //district
	          var addDistrictController = function ($scope, $uibModalInstance) {
	        	  $scope.formData = {};
	        	  $scope.nodeName=scope.nodeName;
		        	  $scope.submit = function () {
		        		  
		        		  $scope.formData.parentEntityId = scope.elementId[1];
		        		  resourceFactory.addDistrictResource.get($scope.formData,function(data){
		        			  $uibModalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		              };
		          };
	          
		          var editDistrictController = function ($scope, $uibModalInstance) {
		    	   		
		    	   		$scope.formData={};
	  	 			$scope.formData.entityCode = scope.nodeCode;
	  	 			$scope.formData.entityName = scope.nodeName;
		        	  $scope.submit = function () {
		        		  
		        		  var districtId=scope.elementId[1];
		        		  resourceFactory.editDistrictResource.update({id:districtId},$scope.formData,function(data){
		        			  $uibModalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		              };
		        };
	          
		        var deleteDistrictController = function ($scope, $uibModalInstance) {
		        	  $scope.approveDeleteDistrict = function () {
		        		  $scope.districtId=scope.elementId[1];
		        		  resourceFactory.editDistrictResource.remove({id:$scope.districtId},{},function(data){
		        			  $uibModalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		              };
		        };
		        
		        var districtAlertController = function ($scope, $uibModalInstance) {
		        	  $scope.districtName = scope.nodeName;
		        	  $scope.approve = function () {
		        		  $uibModalInstance.close('delete');
		              };
		          };
	          

	           var addCityController = function ($scope, $uibModalInstance) {
	        	 $scope.formData = {};
	        	  $scope.nodeName=scope.nodeName;
		        	  $scope.submit = function (newCode,newName) {
		        		  
		        		  $scope.formData.parentEntityId = scope.elementId[1];
		        		  resourceFactory.addCityResource.get($scope.formData,function(data){
		        			  $uibModalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		              };
		      };
		     var editCityController = function ($scope, $uibModalInstance) {
		    	   		
		    	   		$scope.formData={};
 		    	 			$scope.formData.entityCode = scope.nodeCode;
		    	 			$scope.formData.entityName = scope.nodeName;
			        	  $scope.submit = function () {
			        		  
			        		  var cityId=scope.elementId[1];
			        		  resourceFactory.editCityResource.update({id:cityId},$scope.formData,function(data){
			        			  $uibModalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $uibModalInstance.dismiss('cancel');
			              };
			   };
			   var deleteCityController = function ($scope, $uibModalInstance) {
			        	  $scope.approveDeleteCity = function () {
			        		  $scope.cityId=scope.elementId[1];
			        		  resourceFactory.editCityResource.remove({id:$scope.cityId},{},function(data){
			        			  $uibModalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $uibModalInstance.dismiss('cancel');
			              };
			   };
	         
        resourceFactory.addressResource.getAllAddresses(function(data){
        	 
        	 scope.countryObject=[];	
        	 scope.stateObject=[];
        	 scope.districtObject=[];
        	 scope.cityObject=[];
        	 
         for(var i in data.pageItems){
        	  scope.countryObject.push({id:"A-"+data.pageItems[i].countryId,code:data.pageItems[i].countryCode,name:data.pageItems[i].countryName,children:[]});
        	  if(data.pageItems[i].stateId!=0)
        		scope.stateObject.push({id:"B-"+data.pageItems[i].stateId,code:data.pageItems[i].stateCode,name:data.pageItems[i].stateName,parentId:"A-"+data.pageItems[i].countryId,children:[]});
        	  if(data.pageItems[i].districtId!=0)
        	 scope.districtObject.push({id:"C-"+data.pageItems[i].districtId,code:data.pageItems[i].districtCode,name:data.pageItems[i].districtName,parentId:"B-"+data.pageItems[i].stateId,children:[]});
        	  if(data.pageItems[i].cityId!=0)
        		 scope.cityObject.push({id:"D-"+data.pageItems[i].cityId,code:data.pageItems[i].cityCode,name:data.pageItems[i].cityName,parentId:"C-"+data.pageItems[i].districtId,children:[]});
          }
         
          scope.rootArray=[];
          
          scope.countryObject=_.uniq(scope.countryObject,function(item,key,id){
              return item.id;
          });
         scope.stateObject=_.uniq(scope.stateObject,function(item,key,id){
              return item.id;
          });
         scope.districtObject=_.uniq(scope.districtObject,function(item,key,id){
             return item.id;
         });
         scope.cityObject=_.uniq(scope.cityObject,function(item,key,id){
             return item.id;
         });
        /* console.log(scope.countryObject);
         console.log("----------------------");
         console.log(scope.stateObject);
         console.log("----------------------");
         console.log(scope.cityObject);*/
          for(var i in scope.countryObject){ 
        	  
            scope.rootArray.push(scope.countryObject[i]);
          }
          
          for(var i in scope.stateObject){
        	  
        	  scope.rootArray.push(scope.stateObject[i]);
           }
          for(var i in scope.districtObject){
        	  
        	  scope.rootArray.push(scope.districtObject[i]);
           }
          
          for(var i in scope.cityObject){ 
              scope.rootArray.push(scope.cityObject[i]);
           }
          
             for(var i in scope.rootArray){
            	
                 idToNodeMap[scope.rootArray[i].id] = scope.rootArray[i];
             }
             
             function sortByParentId(a, b){
                 return a.parentId - b.parentId;
             }
             data.pageItems.sort(sortByParentId);
             var glAccountsArray = scope.rootArray;
            
             var root = [];
            for(var i = 0; i < glAccountsArray.length; i++) {
            	 var currentObj = glAccountsArray[i];
                 if(currentObj.children){
                     currentObj.collapsed = "true";
                 }

               if(typeof currentObj.parentId === "undefined") {
                     root.push(currentObj);        
               } else {
            	   
                     parentNode = idToNodeMap[currentObj.parentId];
                     parentNode.children.push(currentObj);
               };
             }
            scope.treedata = root;
        });
        
     }
  });
  mifosX.ng.application.controller('AddressTreeviewController', ['$scope', 'ResourceFactory','$uibModal','$route','PermissionService', mifosX.controllers.AddressTreeviewController]).run(function($log) {
    $log.info("AddressTreeviewController initialized");
  });
}(mifosX.controllers || {}));
