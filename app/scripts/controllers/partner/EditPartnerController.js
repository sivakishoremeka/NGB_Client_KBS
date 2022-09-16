(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPartnerController: function(scope, resourceFactory, routeParams,location,$rootScope,webStorage,Upload,API_VERSION,dateFilter) {
        scope.offices = [];
        scope.partnerTypes = [];
        scope.currencydatas = [];
        scope.formData = {};
        scope.partnerId =  routeParams.partnerId;
        scope.partnerName =  webStorage.get("partnerName");
        scope.first = {};
       	 
       	resourceFactory.partnerResource.get({partnerId: routeParams.partnerId,template:'true'} , function(data) {
       		
       		
       		if(data.openingDate){
       		 var editDate = dateFilter(data.openingDate,'dd MMMM yyyy');
             scope.officeTypes = data.officeTypes;
             scope.first.date = new Date(editDate);
             scope.businessTypes = data.businessTypes;

       		}
            scope.formData  = angular.copy(data);
            scope.officeId =  scope.formData.officeId;
            scope.partnerName = scope.formData.partnerName;
            webStorage.add("partnerName", scope.formData.partnerName);
            scope.offices = data.allowedParents;
            scope.currencydatas = data.currencyData.currencyOptions;
            scope.cityDatas = data.citiesData;
            scope.businessType = data.businessType;
            //scope.officeType = data.officeType;
            
           // scope.formData.officeType  = data.officeTypes[1].id;

      
          
            
           /* for(var i in data.officeTypes){
            	if(data.officeTypes[i].name == data.officeType){
            		scope.formData.officeType = data.officeTypes[i].id;
            	}
            }*/
            for(var i in data.offices){
            	if(data.offices[i].name == data.offices){
            		scope.formData.office = data.offices[i].id;
            	}
            }
            
         
      });
        
        scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.district = data.district;
            		scope.formData.country = data.country;
            		
        	  });
          };
          scope.onFileSelect = function($files) {
            scope.file = $files[0];
            scope.file = new File([""], "filename");
            console.log(scope.file);
          };
          
          scope.reset123 = function(partnerId,officeId){
          if(partnerId&&officeId){
        	  location.path('/viewpartner/' +partnerId +'/'+ officeId);
          }else{	  
       	   webStorage.add("callingTab", {someString: "Partners" });
          }
          };
        
        scope.submit = function() {  
        	
        scope.formData.locale = scope.optlang.code;
        //scope.formData.roles = [10];
          
          delete scope.formData.id;
          delete scope.formData.officeId;
          delete scope.formData.parentName;
          delete scope.formData.openingDate;
          delete scope.formData.balanceAmount;
          delete scope.formData.creditLimit;
          delete scope.formData.currencyData;
          delete scope.formData.officeTypes;
          delete scope.formData.allowedParents;
          delete scope.formData.configCurrency;
          delete scope.formData.citiesData;
          delete scope.formData.statesData;
          delete scope.formData.countryData;
        //  delete scope.formData.externalId;
          delete scope.formData.businessTypes;
          var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
          this.formData.locale = scope.optlang.code;
          this.formData.dateFormat = 'dd MMMM yyyy';
          this.formData.openingDate = reqDate;
          
          resourceFactory.partnerResource.update({partnerId : scope.partnerId},this.formData,function(data){
        	  
        	  if (scope.file) {
            	  Upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/partners/'+data.officeId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                    // to fix IE not refreshing the model
                    if (!scope.$$phase) {
                      scope.$apply();
                    }
                    location.path('/viewpartner/' +data.resourceId +'/'+data.officeId);
                  });
        	  }else{
        		  location.path('/viewpartner/' +data.resourceId +'/'+data.officeId);
        	  }	
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPartnerController', 
  ['$scope', 
   'ResourceFactory', 
   '$routeParams',
   '$location',
   '$rootScope',
   'webStorage', 
   'Upload',
   'API_VERSION',
   'dateFilter',
    mifosX.controllers.EditPartnerController
    ]).run(function($log) {
    $log.info("EditPartnerController initialized");
  });
}(mifosX.controllers || {}));