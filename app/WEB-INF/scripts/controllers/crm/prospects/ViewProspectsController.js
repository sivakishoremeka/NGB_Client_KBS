(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewProspectsController : function(scope, routeParams, route, location,resourceFactory, httpk, PermissionService,$uibModal,$rootScope,API_VERSION,TENANT){
		
			scope.prospects = [];
			scope.prospectDetailData = [];
			scope.viewquote=[];
			scope.PermissionService = PermissionService;
			scope.formData={};
			resourceFactory.prospectResource.get({ prospectId : routeParams.id }, function(data) {				
				scope.prospects = data;
			});
			
			resourceFactory.prospectHistoryResource.getHistoryProspects({ prospectdetailid : routeParams.id }, function(data) {
				scope.prospectDetailData = data.prospectDetailData;
			});
			
			resourceFactory.quoteGenerationResource.get({ leadId : routeParams.id}, function(data) {
				scope.viewquote = data;
				
				var quotes = {};
				var servicePlans = {};
				
				for(var i=0;i < scope.viewquote.length; i++){
					var temp = {};
					var quoteId = scope.viewquote[i].quoteId;
					
					if (!servicePlans[quoteId]) {
						servicePlans[quoteId] = [];
	        	    }
	        	    
	        	    if (!quotes[quoteId]) {
	        	    	quotes[quoteId] = [];
	        	    }
	        	    
	        	    quotes[quoteId].leadId = scope.viewquote[i].leadId;
	        	    quotes[quoteId].status = scope.viewquote[i].status;
	        	    quotes[quoteId].quoteNumber = scope.viewquote[i].quoteNumber;
	        	    quotes[quoteId].totalCharge = scope.viewquote[i].totalCharge;
	        	    temp.serviceId = scope.viewquote[i].serviceId;
	        	    temp.serviceCode = scope.viewquote[i].serviceCode;
	        	    temp.planId = scope.viewquote[i].planId;
	        	    temp.planDescription = scope.viewquote[i].planDescription;
	        	    temp.recurringCharge = scope.viewquote[i].recurringCharge;
	        	    temp.oneTimeCharge = scope.viewquote[i].oneTimeCharge;
	        	    temp.chargeCode = scope.viewquote[i].chargeCode;
	        	    temp.frequency = scope.viewquote[i].frequency
	        	    servicePlans[quoteId].push(temp);        	    
				}	
				
				 scope.viewquote = [];
		        	  for (var quoteId in servicePlans) {
		        			  scope.viewquote.push({quoteId: quoteId,leadId:quotes[quoteId].leadId,status:quotes[quoteId].status,quoteNumber:quotes[quoteId].quoteNumber,totalCharge:quotes[quoteId].totalCharge,servicePlans: servicePlans[quoteId]});  	  
		        	  }					
					
			});
			
			
			scope.getVal = function(flag) {
				if (flag === "Closed" || flag === "Canceled") {
					return false;
				} else {
					return true;
				}
			};
			scope.convertProspect = function() {
				resourceFactory.prospectConvertResource.save({ deleteProspectId : routeParams.id }, {}, function(data) {
					
					location.path('/viewclient/id/' + data.resourceId);
				});
			};
			scope.elevatetoProspect = function(Prospect) {
				scope.formData.Prospect = "Prospect";
				resourceFactory.prospectElevateResource.update({prospectId : routeParams.id}, {}, function(data) {
					route.reload();
				});
			};
			/*scope.exportFinancialCSV = function() {
				$uibModal.open({
					templateUrl : 'downloadCSVQuatationData.html',
					controller : DownloadCSVQuotationDataController,
					resolve : {}
				});
			};
			var DownloadCSVQuotationDataController = function($scope, $uibModalInstance) {
				$scope.formData = {};
				$scope.formData.downloadType = 'csv';
				$scope.accept = function() {
					var downloadType = $scope.formData.downloadType;
					console.log($rootScope.hostUrl+ API_VERSION + '/quotes/download/' + routeParams.id + '?downloadType='
							+ downloadType +  '&tenantIdentifier=' + TENANT);
					window.open($rootScope.hostUrl+ API_VERSION + '/quotes/download/' + routeParams.id + '?downloadType='
									+ downloadType +  '&tenantIdentifier=' + TENANT);
					$uibModalInstance.close('delete');
				};
				$scope.reject = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};*/
			
			
			scope.exportPDF = function() {

				/*
				 * http({ method:'PUT', url: $rootScope.hostUrl+
				 * API_VERSION
				 * +'/billmaster/'+statementId+'/print?tenantIdentifier=default',
				 * data: {} })
				 */

				window.open($rootScope.hostUrl + API_VERSION
						+ '/quotes/' + routeParams.id
						+ '/print?tenantIdentifier=' + TENANT);
			};
			
			scope.quotationData = function() {
				$uibModal.open({
					templateUrl : 'QuatationData.html',
					controller : QuotationDataController,
					resolve : {}
				});
			};
			var QuotationDataController = function($scope, $uibModalInstance) {
				resourceFactory.quotestatusresource.get({ leadId : routeParams.id}, function(data) {
					$scope.viewquote = data;
					 
				});
				
				$scope.accept = function(viewquotes) {
					var quoteId = viewquotes.quoteId;
					console.log(quoteId);
					scope.formData.quoteId = quoteId;
					scope.formData.quoteStatus="accepted";
					console.log(scope.formData);
					resourceFactory.quotationStatusResource.update({leadId : routeParams.id },scope.formData,function(data) {
						$scope.status = data;
						$uibModalInstance.close('delete');
						route.reload();
						
					});
				
				};
				$scope.reject = function(viewquotes) {
					var quoteId = viewquotes.quoteId;
					scope.formData.quoteId = quoteId;
					scope.formData.quoteStatus="rejected";
					console.log(scope.formData);
					resourceFactory.quotationStatusResource.update({leadId : routeParams.id },scope.formData, function(data) {
						$scope.statuss = data;
						$uibModalInstance.close('delete');
						route.reload();
					});
						
				};
			};		
		}
	});
	mifosX.ng.application.controller('ViewProspectsController',[ 
	  '$scope', 
	  '$routeParams', 
	  '$route', 
	  '$location',
	  'ResourceFactory', 
	  '$http', 
	  'PermissionService',
	  '$uibModal', 
	  '$rootScope', 
	  'API_VERSION', 
	  'TENANT',
	mifosX.controllers.ViewProspectsController]).run(function($log) {	
	   $log.info("ViewProspectsController initialized");			
	});
}(mifosX.controllers || {}));
