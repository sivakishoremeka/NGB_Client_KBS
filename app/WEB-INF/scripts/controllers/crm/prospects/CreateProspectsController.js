(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateProspectsController : function(scope,resourceFactory,location, route, http, dateFilter,API_VERSION, $rootScope) {
			
			scope.sourceOfPublicityDatas = [];
			scope.planDatas = [];
			scope.offices = [];
			scope.countryDatas = [];
			scope.stateDatas = [];
			scope.cityDatas = [];
			scope.first = {};
			var datetime = new Date();
			scope.first.date = datetime;
			scope.first.time = datetime.getHours() + ":" + datetime.getMinutes();
			var addressType;
			var addressId;
			scope.formData = {};
			scope.minDate = new Date();
			scope.formData.prospectType = "1";
			var serviceDataList = [];
			
			$('#timepicker1').timepicker({
				showInputs : false,
				showMeridian : false,
			});
			resourceFactory.prospectTemplateResource.getTemplate(function(data) {
				scope.sourceOfPublicityDatas = data.sourceOfPublicityData;
				scope.planDatas = data.planData;
				scope.countryDatas = data.countryData;
				scope.stateDatas = data.stateData;
				scope.cityDatas = data.cityData;
				scope.districtDatas = data.district;
										
				for ( var i in scope.sourceOfPublicityDatas) {					
					if (scope.sourceOfPublicityDatas[i].mCodeValue == "Phone") {												
						scope.formData.sourceOfPublicity = scope.sourceOfPublicityDatas[i].mCodeValue;					
					}									
				}
				
				scope.officeDetailsFun = function(officeOptions){
		        	scope.officeDetails = [];
		        	for(var i in officeOptions){
		        		if(scope.isCustomerUnderLco){
		        			 if(officeOptions[i].officeType=="LCO"){
			        	    	  scope.officeDetails.push(officeOptions[i]);
		        			 }
		        		}else{
		        			 scope.officeDetails.push(officeOptions[i]);
		        		}
		        		 if(scope.officeDetails.length>=7){
		   	    		  break;}
		        	}
		        }
				
				scope.getData = function(query){
					return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
		        	      params: {
		        	    	  		query: query
		        	      		   }
		        	    }).then(function(result){
		        	    	scope.officeDetailsFun(result.data.officeOptions);
		        	    if(scope.officeDetails.length == 0){
		        	    	delete scope.formData.name;
		        	    	delete scope.formData.nameDecorated;
		        	    	delete scope.formData.externalId;
		        	    	delete scope.formData.officeType;
		        	    }
		        	    return scope.officeDetails;
		        	});
		        }; 
		        
		        scope.groupByOffice = function(externalId, name){
		        	return externalId+"--"+name;
		        };
		        
			scope.getStateAndCountry = function(city) {			
				resourceFactory.AddressTemplateResource.get({ city : scope.formData.city }, function(data) {										
					scope.formData.state = data.state;
					scope.formData.country = data.country;
					scope.formData.district = data.district;
				    
				 });
				
				 resourceFactory.serviceAvailabiltyByCityResource.get({'addressType':'city', 'address':scope.formData.city},function(data){
					 scope.serviceDatas = data;
				 });
				
			  };
			  scope.getSelectedservice = function(serviceData){
				  if(serviceData.checked){
					  serviceDataList.push(serviceData.serviceCode);
        		  }else{
        			  for(var i=0;i<serviceDataList.length;i++){
        				  if(serviceDataList[i]==serviceData.serviceCode){
        					  var removeIndex = i;
        					  ~removeIndex && serviceDataList.splice(removeIndex, 1);
        				  }
        			  }
        			 
        		  }
        	  };
        	
		    });
		   scope.submit = function() {			
				this.formData.locale = scope.optlang.code;
				var reqDate = dateFilter(scope.first.date,'dd/MM/yyyy');
				this.formData.preferredCallingTime = reqDate+ " " + $('#timepicker1').val() + ':00';
				this.formData.city = this.formData.city;			
				this.formData.city;
				this.formData.service =  serviceDataList;
				
				for(var i in scope.officeDetails){
	           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
	           			scope.formData.officeId = scope.officeDetails[i].id;
	           		}
	           	}
				resourceFactory.prospectResource.save(this.formData, function(data) {
					location.path('/leads');
					route.reload();	 
			 });							
		  };	
		  
		}
	});
	mifosX.ng.application.controller('CreateProspectsController', [ 
	 '$scope', 
	 'ResourceFactory',
	 '$location',
	 '$route',
	 '$http',
	 'dateFilter', 
	 'API_VERSION',
	 '$rootScope',
	mifosX.controllers.CreateProspectsController]).run(function($log) {
	  $log.info("CreateProspectsController initialized");	
    });
}(mifosX.controllers || {}));