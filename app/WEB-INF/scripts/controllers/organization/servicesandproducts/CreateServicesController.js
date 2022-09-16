(function(module) {
  mifosX.controllers = _.extend(module, {
CreateServicesController: function(scope, resourceFactory, location,dateFilter) {
	  scope.formData = {};
	  scope.services = [];
      scope.statuses = [];
      scope.serviceDetailsData = [];
      scope.serviceArray = [];
      scope.serviceFormData = [];
      scope.paramCategory = "P";
      scope.formData.serviceCategory = 'Service';
      /*scope.serviceCategories = ["Service"];*/
      scope.paramCategories = ["P","S"];
      scope.paramTypes = ["Text","Combo","Date","Boolean","Password","Query"];
      scope.paramValues = ["true","false"];
      scope.paramType = dateFilter(new Date(),'yyyy-MM-dd');
	    resourceFactory.serviceTemplateResource.get(function(data) {
	    	 scope.services= data.serviceTypes;
	    	 scope.statuses= data.status;
	    	 scope.serviceParamsData = angular.copy(data.serviceParamsData);
	    	 scope.serviceCategorys = data.serviceCategorys;
	    	 for(var i in scope.statuses){
	    		 if((scope.statuses[i].value).toLowerCase() == "active"){
	    			 scope.formData.status = scope.statuses[i].value;
	    		 }
	    	 }
	         
	    });
        
         scope.deleteService = function (index) {
            scope.serviceArray.splice(index,1);
          };
        
          /*scope.changeServiceCategory = function(){
        	  scope.serviceArray = [];
        	  delete scope.formData.serviceType;
          }*/
          
        scope.addService = function () {
        	if (scope.serviceFormData.paramName && scope.serviceFormData.paramType && scope.serviceFormData.paramValue && scope.serviceFormData.paramCategory) {
									              scope.serviceArray
											.push({
												paramName : scope.serviceFormData.paramName,
												paramType : scope.serviceFormData.paramType,
												paramValue: scope.serviceFormData.paramValue,
												paramCategory: scope.serviceFormData.paramCategory
												
											});
              scope.serviceFormData.paramName = undefined;
              scope.serviceFormData.paramType = undefined;
              scope.serviceFormData.paramValue = undefined;
              scope.serviceFormData.paramCategory = undefined;
        	}
          };
	        scope.onAddChangeParam = function(paramType,index){
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
	        
	        scope.addDetail = function(paramName,paramType,paramCategory,paramValue){
	        	  scope.serviceFormData.paramName = paramName;
				  scope.serviceFormData.paramType = paramType;
				  scope.serviceFormData.paramCategory = paramCategory;
				  scope.serviceFormData.paramValue = paramValue; 	  
				  
				  scope.addService();
		    };
		    
		    scope.addServiceDetailsForTv = function(){
	    		for(var i in scope.serviceParamsData){
     			  if(scope.serviceParamsData[i].mCodeValue == "Network_node"){
     				 //scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select b.id,code_value,order_position  from m_code a, m_code_value b where a.id = b.code_id and code_name='Provisioning' order by id");
      				   scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select ne.id as id, ne.system_code as systemcode,ne.system_name as systemname,ne.is_group_supported as isGroupSupported from b_network_element ne where status='ACTIVE'");
     			  }else if(scope.serviceParamsData[i].mCodeValue != "Network_node" && scope.serviceParamsData[i].mCodeValue != "Technology"){
     				 scope.addDetail(scope.serviceParamsData[i].id,"Text","P","123"); 
     			  }
	    		}
	    }  
	    
	    scope.addServiceDetailsForBB = function(){
	    	for(var i in scope.serviceParamsData){
 			  if(scope.serviceParamsData[i].mCodeValue == "Network_node"){
 				 //scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select b.id,code_value,order_position from m_code a, m_code_value b where a.id = b.code_id and code_name='Provisioning' order by id");
 				 scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select ne.id as id, ne.system_code as systemcode,ne.system_name as systemname,ne.is_group_supported as isGroupSupported from b_network_element ne where status='ACTIVE'");
 			  }else if(scope.serviceParamsData[i].mCodeValue == "Technology"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select b.id,code_value,order_position from m_code a, m_code_value b where a.id = b.code_id and code_name='Technology' order by id"); 
 			  }else if(scope.serviceParamsData[i].mCodeValue == "userName"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Text","S","Srikanth"); 
 			  }else if(scope.serviceParamsData[i].mCodeValue == "password"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Text","S","Rajnikanth"); 
 			  }else{
 				 scope.addDetail(scope.serviceParamsData[i].id,"Text","P","123");  
 			  }
    		}
	    };
	        
	    scope.typeChangeFun = function(serviceType){
	    	scope.serviceArray = [];
	    	
	    	if(scope.formData.serviceCategory == 'Service'){
	    		if(serviceType == "CATV" ){
	    			 scope.addServiceDetailsForTv();
	    		}else if(serviceType == "BB" ){
	    			 scope.addServiceDetailsForBB();
	    		}
       		  
       	  }/*else if(scope.formData.serviceCategory == 'Product'){
       		resourceFactory.serviceResourceForDetails.get({serviceId:serviceType,paramCategory:scope.paramCategory},function(data) {
       			  	scope.serviceDetailsData = data.serviceDetailDatas;
       			  	for(var i in scope.serviceDetailsData){
       			  	  scope.serviceFormData.paramName = scope.serviceDetailsData[i].paramName;
      				  scope.serviceFormData.paramType = scope.serviceDetailsData[i].paramType;
      				  scope.serviceFormData.paramCategory = scope.serviceDetailsData[i].paramCategory;
      				  scope.serviceFormData.paramValue = scope.serviceDetailsData[i].paramValue; 
      				  scope.addService();
       			  	}
       	      });
       	  }*/
	    };
	        
	        
        scope.submit = function() {  
        	
        	if(scope.formData.serviceCategory == 'Service'){
        		scope.formData.serviceCategory = 'S';
        	}/*else{
        		scope.formData.serviceCategory = 'P';
        	}*/
        	scope.formData.serviceArray =new Array();
            if (scope.serviceArray.length > 0) {
             
                for (var i in scope.serviceArray) {
					                   scope.formData.serviceArray
												.push({
													paramName : scope.serviceArray[i].paramName,
													paramType : scope.serviceArray[i].paramType,
													paramValue : scope.serviceArray[i].paramValue,
													paramCategory : scope.serviceArray[i].paramCategory
												});
                };
              }
            
          resourceFactory.serviceResource.save(scope.formData,function(data){
        		  location.path('/services');
          });
        };
    }
  });
 mifosX.ng.application.controller('CreateServicesController', [
                                                              '$scope', 
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              'dateFilter',
                                                              mifosX.controllers.CreateServicesController]).run(function($log) {
    $log.info("CreateServicesController initialized");
  });
}(mifosX.controllers || {}));
