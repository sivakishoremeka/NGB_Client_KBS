(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateOfficeController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
    	
        scope.offices = [];
        scope.officeTypes = [];
        scope.businessTypes = [];
        scope.first = {};
        scope.first.date = new Date();
        scope.officesBackup = [];
        
        resourceFactory.officeTemplateResource.get({} , function(data) {
            //scope.offices = angular.copy(data.allowedParents);
            scope.officesBackup = angular.copy(data.allowedParents);
            scope.officeTypes = data.officeTypes;
            scope.businessTypes = data.businessTypes;
            //scope.addressData=data.addressData;
            scope.cities=data.addressData.cityData;
            scope.payments= data.paymentTypeEnum;
            scope.segmentTypes=data.segmentTypes;
        });
        
        scope.officeTypeChangFun = function(){
        	scope.offices = [];
        	console.log(scope.officesBackup);
        	if(scope.formData.officeType == "MSO"){
        		for(var i in scope.officesBackup){
        			if(scope.officesBackup[i].id ==1){
        				scope.offices.push(scope.officesBackup[i]);break;
        			}
        		}
        	}
        	else if(scope.formData.officeType == "LCO"){
        		for(var i in scope.officesBackup){
        			if(scope.officesBackup[i].officeType !="LCO" && scope.officesBackup[i].id !=1){
        				scope.offices.push(scope.officesBackup[i]);
        			}
        		}
        	}
        	else if(scope.formData.officeType == "DIST"){
        		for(var i in scope.officesBackup){
        			if(scope.officesBackup[i].officeType !="LCO" && scope.officesBackup[i].officeType !="DIST"
        				&& scope.officesBackup[i].id !=1){
        				scope.offices.push(scope.officesBackup[i]);
        			}
        		}
        	}
        	
        	else{
        		for(var i in scope.officesBackup){
        			if(scope.officesBackup[i].id !=1){
        				scope.offices.push(scope.officesBackup[i]);
        			}
        		}	
        	}
        };
       
        scope.getStateAndCountry=function(city){
    	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
        		scope.formData.state = data.state;
        		scope.formData.country = data.country;
        		scope.formData.district = data.district;
    	  },function(errors) {
        	  if(errors.data.errors!=null){
  				scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
          	  }else{
          		  scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
          	  }
    		});
        };
         
        scope.onFileSelect = function($files) {
            scope.file = $files[0];
          };
        scope.getCommisionModel=function(commisionModel) {
        	console.log(commisionModel);
            if(commisionModel.equals("PostPaid")){
            	scope.formData.commisionModel=0;
            	console.log("ram");
            }else{
            	scope.formData.commisionModel=1;
            	console.log("ya");
            }
        };  
        scope.submit = function() {   
          scope.formData.clientData = {};
          this.formData.locale = scope.optlang.code;
          var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
          this.formData.dateFormat = 'dd MMMM yyyy';
          this.formData.openingDate = reqDate;
          if("PostPaid"===this.formData.commisionModel){
        	  this.formData.commisionModel=0;
          }else{
        	  this.formData.commisionModel=1;
          }
          
          
          scope.normalPlnData = {
   			   "entryType":"IND",
   			   "clientCategory":20,
   			   "officeId": scope.formData.parentId,
   			   "title":"Mr",
   			   "lastname":".",
   			   "firstname":scope.formData.contactPerson,
   			   "phone":scope.formData.phoneNumber,
   			   "email":scope.formData.email,
   			   "idKey":260,
   			   "externalId":"",
   			   "billMode":"Both",
   			   "idValue":"00000",
   			   "locale":scope.optlang.code,
   			   "active":true,
   			   "dateFormat":"dd MMMM yyyy",
   			   "activationDate":reqDate,
   			   "flag":false,
   			   
   	     };
          scope.normalPlnData.address = [{
  	    	addressNo 	: scope.formData.addressName,
  	    	city 		: scope.formData.city,
  	    	state		: scope.formData.state, 
  	    	country     : scope.formData.country,
  	    	district 	: scope.formData.district,
  	    	zipCode 	: scope.formData.zip,
  	    	addressType : "PRIMARY"
	        },
	        {
      	    addressNo 	: scope.formData.addressName,
      	    city 		: scope.formData.city,
      	    state		: scope.formData.state, 
      	    country     : scope.formData.country,
      	    district 	: scope.formData.district,
      	    zipCode 	: scope.formData.zip,
      	    addressType : "BILLING"
		   }
    ];
          scope.formData.clientData = scope.normalPlnData;
	    	delete scope.formData.normalPlnData;
          
          resourceFactory.officeResource.save(this.formData,function(data){
        		 location.path('/viewoffice/' + data.resourceId);
          },function(errors) {
        	  if(errors.data.errors!=null){
				scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
        	  }else{
        		  scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
        	  }
  		});
        };
    }
  });
  mifosX.ng.application.controller('CreateOfficeController', ['$scope', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.CreateOfficeController]).run(function($log) {
    $log.info("CreateOfficeController initialized");
  });
}(mifosX.controllers || {}));
