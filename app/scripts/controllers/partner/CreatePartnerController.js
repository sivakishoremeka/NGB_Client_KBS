(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePartnerController: function(scope, resourceFactory, location,$rootScope,webStorage,Upload,API_VERSION,dateFilter) {
        scope.offices = [];
        scope.partnerTypes = [];
        scope.currencydatas = [];
        scope.officeTypes = [];
        scope.businessTypes = [];
        scope.formData = {};
        scope.first = {};
        scope.first.date = new Date();
        
       	 resourceFactory.partnerTemplateResource.get(function(data) {
            scope.offices = data.allowedParents;
            scope.currencydatas = data.currencyData.currencyOptions;
            scope.cityDatas = data.citiesData;
            scope.configCurrency = data.configCurrency
            scope.officeTypes = data.officeTypes;;
            scope.businessTypes = data.businessTypes;
            //for head office
            for(var i in data.allowedParents){
            if(data.allowedParents[i].id==1){
            	 scope.formData.parentId=data.allowedParents[i].id;
            }
            }
            //for config currency
            /*for(var j in scope.configCurrency){
               for(var i in scope.currencydatas){
            		  if(scope.configCurrency[j].currency == scope.currencydatas[i].code){
            			 scope.formData.currency=scope.currencydatas[i].code;
                         break;
            		 }
            	 }
            }*/
            
            for(var i in data.officeTypes){
            	  if(data.officeTypes[i].name == "Agent"){
            		  scope.formData.officeType = data.officeTypes[i].id;
            	  }
              }
            //scope.formData.officeType = data.officeTypes[1].id;
            for(var i in data.officeTypes){
            	  if(data.officeTypes[i].name == "Office"){
            		scope.officeType = data.officeTypes[i].id;
            	  }
              }
              scope.formData = {
                parentId : scope.offices[0].id,
                officeType :scope.officeType,
              };
        });
        
        scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.country = data.country;
            		scope.formData.district = data.district;
        	  });
          };
          scope.onFileSelect = function($files) {
            scope.file = $files[0];
           
          };
          
          scope.reset123 = function(){
       	   webStorage.add("callingTab", {someString: "Partners" });
          };
        
        scope.submit = function() {   
          //this.formData.parentId =1;
          this.formData.locale ="en";
          scope.formData.roleName ="Partner";
          var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
          this.formData.dateFormat = 'dd MMMM yyyy';
          this.formData.openingDate = reqDate;
          
          resourceFactory.partnerResource.save(this.formData,function(data){
        	  
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
                    location.path('/viewpartner/' +data.resourceId+ '/'+ data.officeId);
                  });
        	  }else{
        		  location.path('/viewpartner/' +data.resourceId + '/' + data.officeId);
        	  }	
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePartnerController', 
  ['$scope', 
   'ResourceFactory', 
   '$location',
   '$rootScope',
   'webStorage', 
   'Upload',
   'API_VERSION',
   'dateFilter',
    mifosX.controllers.CreatePartnerController
    ]).run(function($log) {
    $log.info("CreatePartnerController initialized");
  });
}(mifosX.controllers || {}));