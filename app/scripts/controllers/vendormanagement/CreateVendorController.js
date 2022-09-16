(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorController : function(scope,resourceFactory, 
				location, dateFilter, $rootScope) {
			
			scope.countryDatas = [];
			scope.currencyDatas = [];
			scope.formData = {};
						
			resourceFactory.VendorTemplateResource.getTemplateDetails(function(data) {
				scope.countryDatas = data.countryData;
				scope.currencyDatas = data.currencyOptions;
			});
				
			scope.submit = function() {			
				this.formData.locale = scope.optlang.code;
								
				resourceFactory.VendorLemplateResource.save(this.formData, function(data) {
					location.path('/vendormanagement');										
				});							
			};						
		}			
	});
	mifosX.ng.application.controller('CreateVendorController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'$rootScope',
	mifosX.controllers.CreateVendorController 
	]).run(function($log) {
		$log.info("CreateVendorController initialized");	
	});
}(mifosX.controllers || {}));
