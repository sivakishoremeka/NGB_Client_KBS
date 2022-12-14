(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditServicesController: function(scope, routeParams, location, resourceFactory,dateFilter) {
		  
		 scope.formData = {};
		 scope.serviceId = routeParams.id;
    	 scope.services = [];
         scope.statuses = [];
         scope.serviceArray = [];
         scope.formData.serviceCategory = 'Service';
         /*scope.serviceCategories = ["Service"];*/
         scope.paramCategories = ["P","S"];
         scope.paramTypes = ["Text","Combo","Date","Boolean","Password","Query"];
         scope.paramValues = ["true","false"];
         scope.serviceFormData = [];
        resourceFactory.serviceResource.get({serviceId: scope.serviceId, template: 'true'} , function(data) {
        	  scope.services= data.serviceTypes;
              scope.statuses= data.status;
              scope.serviceParamsData = data.serviceParamsData;
              scope.serviceArray=data.serviceDetailDatas;
              scope.serviceDetailDatas = angular.copy(data.serviceDetailDatas);
              scope.serviceCategorys = data.serviceCategorys;
              
              scope.formData = {
				        			serviceCode 		: data.serviceCode,
				          			serviceDescription 	: data.serviceDescription,
				          			status 				: data.serviceStatus,
				          			serviceType 		: data.serviceType,
				          			serviceCategory     : data.serviceCategory,
				          			isOptional 			: data.isOptional,
          						};
              if(scope.formData.serviceCategory == 'S'){
            		scope.formData.serviceCategory = 'Service';
            	}
              /*else{
            		scope.formData.serviceCategory = 'Product';
            	}*/
              
              if(data.isOptional=="Y"){
    				scope.formData.isOptional=true;
    			}
              
              if(data.isAutoProvision =="Y"){
  				scope.formData.isAutoProvision=true;
  			}
        });
        
        scope.addService = function () {
        	if (scope.serviceFormData.paramName && scope.serviceFormData.paramType && scope.serviceFormData.paramCategory) {
        		scope.serviceArray
						.push({
							paramName: scope.serviceFormData.paramName,
							codeParamName : scope.serviceFormData.mCodeValue,
							paramType : scope.serviceFormData.paramType,
							paramValue: scope.serviceFormData.paramValue,
							paramCategory: scope.serviceFormData.paramCategory
						});
				scope.serviceFormData.paramName = undefined;
				scope.serviceFormData.paramType = undefined;
				scope.serviceFormData.paramValue = undefined;
				scope.serviceFormData.mCodeValue = undefined;
				scope.serviceFormData.paramCategory = undefined;
        	}
          };
        
          scope.deleteService = function (index) {
	          scope.serviceArray.splice(index,1);
	      };
	      
	      scope.onAddChangeParam = function(paramType,index){
	        	/*if(index != null){
	            		scope.serviceArray[index].paramValue = [];
	        	}else{
	        		scope.serviceFormData.paramValue = [];
	        	}*/
	        	if(index != null){
	        		if(paramType == "Query"){
	        			scope.serviceArray[index].paramValue = "select distinct c.id as clientId, c.email as email from m_client c where c.id = ? ";
	        			scope.serviceArray[index].paramCategory = "S";
	        		}else{
	            		scope.serviceArray[index].paramValue = [];
	        		}
	        	}else{
	        		if(paramType == "Query"){
	        			scope.serviceFormData.paramValue = "select distinct c.id as clientId, c.email as email from m_client c where c.id = ? ";
	        			scope.serviceFormData.paramCategory = "S";
	        		}else{
	        			scope.serviceFormData.paramValue = [];
	        		}
	        	}
	        };
	        
        scope.submit = function() {
        	if(scope.formData.serviceCategory == 'Service'){
        		scope.formData.serviceCategory = 'S';
        	}
        	/*else{
        		scope.formData.serviceCategory = 'P';
        	}*/
        	
        	scope.formData.serviceArray =new Array();
            if (scope.serviceArray.length > 0) {
         	   for (var i in scope.serviceArray) {
         		   scope.formData.serviceArray.push({
         			   paramName:scope.serviceArray[i].paramName,
         			   paramType:scope.serviceArray[i].paramType,
         			   paramValue:scope.serviceArray[i].paramValue,
         			   paramCategory:scope.serviceArray[i].paramCategory
         			   });
              };
           }
            this.formData.serviceArray = scope.formData.serviceArray;
            delete this.formData.serviceDetailDatas;
        	
             resourceFactory.serviceResource.update({serviceId: scope.serviceId},scope.formData,function(data){
             location.path('/viewservices/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditServicesController', [
                                                             '$scope',
                                                             '$routeParams',
                                                             '$location', 
                                                             'ResourceFactory',
                                                             'dateFilter',
                                                             mifosX.controllers.EditServicesController]).run(function($log) {
    $log.info("EditServicesController initialized");
  });
}(mifosX.controllers || {}));