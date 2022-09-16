(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChannelMappingController: function(scope, resourceFactory, location,webStorage,$rootScope,http,API_VERSION) {
			
			 scope.formData={};
		     scope.productDatas = {};
		     scope.channelDatas = {};
		     scope.availableChannels = [];
			 scope.selectedChannels = [];
			 scope.allowed = [];
			 scope.restricted = [];
				
		     
		     resourceFactory.channelMappingTemplateResource.gettemplate(function(data) {
				  scope.productDatas = data.productDatas;
				  //scope.channelDatas = data.channelDatas;
				  scope.availableChannels = data.availableChannels;
				  scope.allowedChannels = data.availableChannels;
			});
		     
		     scope.restrict = function(){
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availableChannels){
		                    if(scope.availableChannels[j].id == this.allowed[i])
		                    {
		                        var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.name = scope.availableChannels[j].channelName;
		                        scope.selectedChannels.push(temp);
		                        scope.allowedChannels.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedChannels){
		                    if(scope.selectedChannels[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.channelName = scope.selectedChannels[j].name;
		                        scope.availableChannels.push(temp);
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
		    	   scope.formData.productId = value; 	
		        };
		        
		        
		        scope.getBothProduct =function(productCode,productDescription){
		        	return productCode+"--"+productDescription;
		        };
		        
		        
		     
		     
		     scope.reset123 = function(){
		          location.path('/broadcasterchannelmapping');
		          webStorage.add("callingTab", {someString: "channelmapping" });
		  	 };
		  	 
		  	scope.submit = function(){
		  		console.log("Success");
		  		scope.formData.channelDetail = [];
	        	scope.formData.locale = "en";
	        	var temp = [];
	             for(var i in scope.selectedChannels){
	                 temp[i] = scope.selectedChannels[i].id;
	             }
	             scope.formData.channelDetail = temp;
	             
	     		resourceFactory.channelMappingResource.save(scope.formData,function(data){
	     			location.path('/broadcasterchannelmapping');
	     			webStorage.add("callingTab", {someString: "channelmapping" });
		             
	     		});	
	     	};  	 
		}
	});
	mifosX.ng.application.controller('CreateChannelMappingController', [
	 '$scope', 
	 'ResourceFactory', 
	 '$location',
	 'webStorage',
	 '$rootScope',
	 '$http', 
     'API_VERSION',
	mifosX.controllers.CreateChannelMappingController]).run(function($log) {
	   $log.info("CreateChannelMappingController initialized");
	});	
}(mifosX.controllers || {}));