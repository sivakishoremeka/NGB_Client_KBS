(function(module) {
  mifosX.controllers = _.extend(module, {
	  OfficePaymentsController: function(scope,resourceFactory, routeParams, location,dateFilter,webStorage,$rootScope,http,API_VERSION) {

        scope.formData = {};
        scope.officeId = routeParams.officeId;
        scope.partnerId = routeParams.partnerId ;
        scope.officeName = webStorage.get("officeName");
        scope.partnerName =  webStorage.get("partnerName");
        scope.poId = webStorage.get("poId");
        scope.start={};
        scope.start.date = new Date();
        
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };
        
        scope.getOfficeData = function(query){
			  scope.error = false;
	        	return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(result){
	        	    	scope.officeDetails = [];
		        	      for(var i in result.data.officeOptions){
		        	    	  scope.officeDetails.push(result.data.officeOptions[i]);
		        	    	  if(i == 7)
		        	    		  break;
		        	      }
		        	      
		        	    if(scope.officeDetails.length == 0){
		        	    	delete scope.formData.name;
		        	    	delete scope.formData.nameDecorated;
		        	    	delete scope.formData.externalId;
		        	    }
	        	      return scope.officeDetails;
	        	    });
	        };
        
        
        resourceFactory.officeResource.get({officeId: scope.officeId}, function (data) {
            scope.office = data;
            
        });
        resourceFactory.officePaymentsTemplateResource.getPayments(function(data){
        	scope.payments = data;
            scope.data = data.data;
            scope.routeTo = function (id) {
                location.path('/viewoffice/' + id);
            };
            
            scope.paymentTypeData=function(value){
            	
            	for(var i=0;i<scope.data.length;i++){
            		  if(scope.data[i].id === value){
            			  scope.paymentType=scope.data[i].mCodeValue;
            		    }
            	      }
                  };
        });
        
        scope.reset = function(partnerId,officeId){
            if(partnerId&&officeId){
              location.path('/viewpartner/'+routeParams.partnerId+'/'+routeParams.officeId);
       	      webStorage.add("callingTab", {someString: "financial" });
           	}else if(officeId){
       		   location.path('/viewoffice/'+routeParams.officeId); 
       	   }
        };
        
        scope.partnersTab = function(){
      	   webStorage.add("callingTab", {someString: "Partners" });
       };
        
        scope.submit = function() {

          scope.flag = true;
          scope.formData.locale = scope.optlang.code;
          scope.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
      	  scope.formData.paymentDate= paymentDate;
      	  scope.formData.officePoId = scope.poId;
      	  scope.formData.collectionBy = scope.formData.officeDetails.id;
      	  scope.formData.collectorName = scope.formData.officeDetails.name;
          if(scope.paymentType==='Cheque'){
        	    scope.formData.isChequeSelected = true;
          }else{
        	  delete scope.formData.isChequeSelected;
          }
          delete scope.formData.officeDetails;
          resourceFactory.officePaymentsResource.postPayments({officeId : routeParams.officeId}, scope.formData, function(){
        	  if(scope.partnerId){
        		  location.path('/viewpartner/'+routeParams.partnerId+'/'+routeParams.officeId);
        		  webStorage.add("callingTab", {someString: "financial" });
        		  
        	  }else{
                 location.path('/viewoffice/'+routeParams.officeId);
        	  }
          });
          };
    }
  });
  mifosX.ng.application.controller('OfficePaymentsController', [
    '$scope', 
    'ResourceFactory', 
    '$routeParams', 
    '$location',
    'dateFilter',
    'webStorage',
    '$rootScope',
    '$http',
    'API_VERSION',
    mifosX.controllers.OfficePaymentsController]).run(function($log) {
    $log.info("OfficePaymentsController initialized");
  });
}(mifosX.controllers || {}));
