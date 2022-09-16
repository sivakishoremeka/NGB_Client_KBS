(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewClientTopInfoController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,
				  																	$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.clientId;
			  
			  var clientData = webStorage.get('clientData');
			  console.log("viewclienttopinfo");
			  console.log(clientData);
			  if(webStorage.get('clientData')){
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.displayName=clientData.displayName;
				    scope.statusActive=clientData.statusActive;
				    scope.accountNo=clientData.accountNo;
				    scope.officeName=clientData.officeName;
				    scope.balanceAmount=clientData.balanceAmount;
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.currency=clientData.currency;
				    scope.imagePresent=clientData.imagePresent;
				    scope.categoryType=clientData.categoryType;
			        scope.email=clientData.email;
			        scope.phone=clientData.phone;
			        scope.addressNo=clientData.addressNo;
			        scope.street=clientData.street;
			        scope.city=clientData.city;
			        scope.state=clientData.state;
			        scope.country=clientData.country;
			        scope.walletAmount=clientData.walletAmount;
			        scope.activationDate=clientData.activationDate;
			        scope.displayName=clientData.displayName;
			        scope.stbSerialNo=clientData.stbSerialNo;
			        scope.scSerialNo=clientData.scSerialNo;
			        scope.currencyCode=clientData.currencyCode;
			        scope.officeHierarchy=clientData.officeHierarchy;
			        if(scope.imagePresent){
			        	scope.image=clientData.image;
			        }
		  		}
			 
	    }
	  });
	  mifosX.ng.application.controller('ViewClientTopInfoController', [
	                                                           '$scope',
	                                                           'webStorage',
	                                                           '$routeParams',
	                                                           '$location',
	                                                           'ResourceFactory',
	                                                           'dateFilter',
	                                                           '$rootScope',
	                                                           'API_VERSION',
	                                                           '$http',
	                                                           mifosX.controllers.ViewClientTopInfoController]).run(function($log) {
        $log.info("ViewClientTopInfoController initialized");
    });
}(mifosX.controllers || {}));