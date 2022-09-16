(function(module) {
  mifosX.controllers = _.extend(module, {
    EditOfficeController: function(scope, routeParams, resourceFactory, location,dateFilter,$rootScope) {
    	
        scope.formData = {};
        scope.first = {};
        resourceFactory.officeResource.get({officeId: routeParams.id, template: 'true'} , function(data) {
        	if(data.openingDate){
            var editDate = dateFilter(data.openingDate,'dd MMMM yyyy');
            scope.officeTypes = data.officeTypes;
            scope.first.date = new Date(editDate);
            scope.businessTypes = data.businessTypes;
            scope.offices = data.allowedParents;
            scope.payments= data.paymentTypeEnum;
            scope.parentId=data.parentId;
            scope.parentName=data.parentName;
            scope.dasTypes = data.segmentTypes;
            //scope.addressData = data.addressData;
            }
            
            for(var i in data.officeTypes){
            	if(data.officeTypes[i].name == data.officeType){
            		scope.formData.officeType = data.officeTypes[i].id;
            	}
            }
            for(var i in data.offices){
            	if(data.offices[i].name == data.offices){
            		scope.formData.office = data.offices[i].id;
            	}
            }
            
            for(var i in data.paymentTypeEnum){
            	if(data.paymentTypeEnum[i].name == data.paymentTypeEnum){
            		scope.formData.payment = data.paymentTypeEnum[i].id;
            	}
            }
            
            for(var i=0;i<scope.dasTypes.length;i++){
            	if(scope.dasTypes[i].name==data.dasTypeValue){
                	scope.dasType=scope.dasTypes[i].id;
                }
            }
            
            scope.formData = {
              name : data.name,
              externalId : data.externalId,
              officeType : data.officeType,
              city : data.city,
              state : data.state,
              country : data.country,
              addressName : data.addressName,
              phoneNumber : data.phoneNumber,
              email : data.email,
              contactPerson : data.contactPerson,
              zip : data.zip,
              businessType : data.businessType,
              parentId : data.parentId,
              district : data.district,
              poId : data.poId,
              payment:data.payment,
              subscriberdues : data.subscriberDues,
              pancardNo:data.pancardNo,
              companyRegNo : data.companyRegNo,
              commisionModel : data.commisionModel,
              gstRegNo : data.gstRegNo,
              dasType : scope.dasType
            };
           
            if(scope.formData.commisionModel==1){
            	scope.formData.commisionModel='Prepaid';
            }else{
            	scope.formData.commisionModel='PostPaid';
            }
            
            
            if(scope.formData.payment==1){
            	scope.formData.payment='Advance';
            }else if(scope.formData.payment==2){
            	scope.formData.payment='Arrear';
            }else if(scope.formData.payment==3){
            	scope.formData.payment='Prepaid';
            }
        });
         
        scope.getStateAndCountry=function(city){
      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
          		scope.formData.state = data.state;
          		scope.formData.country = data.country;
          		scope.formData.district = data.district;
          		
      	  });
        };
        
        scope.changeParent = function(officeId){
        	this.formData.parentTransfer=scope.parentId+" to "+officeId; 
        }
        scope.submit = function() {
        	if("PostPaid"===this.formData.commisionModel){
          	  this.formData.commisionModel=0;
            }else{
          	  this.formData.commisionModel=1;
            }
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            this.formData.locale = scope.optlang.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.openingDate = reqDate;
            resourceFactory.officeResource.update({'officeId': routeParams.id},this.formData,function(data){
             location.path('/viewoffice/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('EditOfficeController', ['$scope', '$routeParams', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.EditOfficeController]).run(function($log) {
    $log.info("EditOfficeController initialized");
  });
}(mifosX.controllers || {}));
