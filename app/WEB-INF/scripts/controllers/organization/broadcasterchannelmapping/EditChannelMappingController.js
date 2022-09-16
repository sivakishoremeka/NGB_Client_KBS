(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChannelMappingController: function(scope, routeParams, resourceFactory, location,webStorage,$rootScope,http,API_VERSION) {
			
			scope.formData = {};
	        scope.channelmappingId=routeParams.id;
	        scope.availableChannels = [];
		    scope.selectedChannels = [];
			scope.allowed = [];
		    scope.restricted = [];
		    scope.productDatas = [];
		    
		    
	        
	        resourceFactory.channelMappingResource.get({channelmappingId: routeParams.id, template: 'true'} , function(data) {
	    		  scope.productDatas = data.productDatas;
	    		  //scope.channelDatas = data.channelDatas;
	    		  
	    		  scope.formData = {
	    				   productId:data.productId,
	            		   channelId:data.channelId,
	              };
	    		  scope.availableChannels = data.availableChannels;
		          scope.selectedChannels = data.selectedChannels;
		          for(var i in scope.productDatas){
		        	  if(scope.productDatas[i].id==routeParams.id){
		        		  scope.productData=scope.productDatas[i]; 
		        		  scope.ProductFun(scope.productData); 
		        	  }
		          }
	        });
	        
	        scope.restrict = function(){
	            for(var i in scope.allowed)
	            {
	                for(var j in scope.availableChannels){
	                    if(scope.availableChannels[j].id == scope.allowed[i])
	                    {
	                        scope.selectedChannels.push(scope.availableChannels[j]);
	                        scope.availableChannels.splice(j,1);
	                    }
	                }
	            }
	        };
	        scope.allow = function(){
	            for(var i in scope.restricted)
	            {
	                for(var j in scope.selectedChannels){
	                    if(scope.selectedChannels[j].id == scope.restricted[i])
	                    {
	                        scope.availableChannels.push(scope.selectedChannels[j]);
	                        scope.selectedChannels.splice(j,1);
	                    }
	                }
	            }
	        };
	        
		  scope.getData = function(query){
		     return http.get($rootScope.hostUrl+API_VERSION+'/channelmapping/template/', {
		      	 params: {
		      	    	productCode: query
		      	    	  		
		      	      	}
		      	 }).then(function(result){
		        	   scope.productDatas = [];
			        	  for(var i in result.data.productDatas){
			        	    scope.productDatas.push(result.data.productDatas[i]);
			        	    console.log(result.data.productDatas[i]);
			        	    if(i == 7)
			        	    	break;
			        	      }

		        	      return scope.productDatas;
		        	    });
		    };  
		    
		    
		    scope.ProductFun = function(productData){
		    	   var value = productData.id;
		    	   console.log("Hello");
		    	   scope.formData.productId = value; 	
		    };
			  
	        scope.getBothProduct =function(productCode,productDescription){
	        	return productCode+"--"+productDescription;
	        };
	        
	        scope.reset123 = function(){
	        	  webStorage.add("callingTab", {someString: "channelmapping" });
	        };
	        scope.submit = function() {
	        	
	        	scope.formData.channelDetail = [];
	             for(var i in scope.selectedChannels){
	            	 scope.formData.channelDetail[i] = scope.selectedChannels[i].id;
	             }
	        	
	              resourceFactory.channelMappingResource.update({'channelmappingId': scope.channelmappingId},scope.formData,function(data){
	              location.path('/ViewChannelMapping/' + data.resourceId);
	             });
	        };     
		}
	});
	mifosX.ng.application.controller('EditChannelMappingController', [
	 '$scope', 
	 '$routeParams', 
	 'ResourceFactory', 
	 '$location', 
	 'webStorage',
	 '$rootScope',
	 '$http', 
     'API_VERSION',
	mifosX.controllers.EditChannelMappingController]).run(function($log) {
		$log.info("EditChannelMappingController initialized");
	});
}(mifosX.controllers || {}));