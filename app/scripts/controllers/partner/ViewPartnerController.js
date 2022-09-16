(function(module) {
	mifosX.controllers = _.extend(module, {

		ViewPartnerController : function(scope, routeParams, rootScope,	resourceFactory, webStorage,PermissionService,route,$uibModal,paginatorService, location) {

			scope.agreements = [];
			scope.officeFinanceTrans = [];
			scope.PermissionService = PermissionService;
			scope.officeId=routeParams.officeId;
			scope.date = {};
			scope.formData = {};
            scope.partner = [];
            
			 var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "financial") {
					scope.FinancialTab = true;
					webStorage.remove('callingTab');
				}
			}
			
			
			 scope.partnersTab = function(){
		       	   webStorage.add("callingTab", {someString: "Partners" });
		     };

			resourceFactory.partnerResource.get({partnerId : routeParams.id}, function(data) {
				scope.partner = data;
				webStorage.add("partnerName", scope.partner.partnerName);
				webStorage.add("poId", scope.partner.poId);
				webStorage.add("settlementPoId", scope.partner.settlementPoId);
                
				//for agreement data
				resourceFactory.agreementResource.get({partnerId : scope.officeId}, function(data) {
					scope.agreements = data;
				});

			});

			//for office finance Transactions
			scope.getfinancialtransactions = function() {
	
				resourceFactory.officeFinancialTransactionResource.get({officeId : scope.officeId}, function(data) {
					scope.officeFinanceTrans = data;
					
					
				});
				
			/*	scope.partnersTab = function() {
					
					webStorage.add("callingTab", {someString : "Partners"});
				};*/
			};
			
			//for office / partner Disbursement details 
			scope.getPartnerDisbursements = function(){
				
				 scope.patnerDisbursementData = [];
			      scope.searchData = {};
			      scope.sourceDatas = [];
			      scope.patnerDatas = [];
			        
			      scope.disbursementsFetchFunction = function(offset, limit, callback) {
			    	      	var params = {};
			    	      	params.offset = offset;
			    	      	params.limit = limit;
			    	      	scope.partnerType =	webStorage.get("partnerName");
			    	      	if(scope.partnerType && scope.partnerType != 'ALL'){
			    	      		params.partnerType = scope.partnerType;
			    	      	}
			    	    /*  	if(scope.searchData.sourceType && scope.searchData.sourceType != 'ALL'){
			    	      		params.sourceType = scope.searchData.sourceType;
			    	      	}*/
			    			resourceFactory.patnerDisbursementResource.get(params , callback);
			    	};
			      scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);
			      
			
		   };
			
		   scope.removeSourceCategories = function(planCode){	
	        	  if(scope.planCode>=1){
	        	scope.agreements.splice(planCode,1);}
	        };
		   
			 /**
	       	 * Delete Agreement
	       	 * */
	         scope.deleteAgreement = function (id,planPoId,dealPoId,poId,settlementPoId,packageId){
	        	 console.log(id);
	         	scope.agreementId=id;
	          	 $uibModal.open({
	  	                templateUrl: 'deletePopupForAgreement.html',
	  	                controller: deleteAgreementController,
	  	                resolve:{

		                	  planPoId : function() {
									return planPoId;
								},
		        	  		  dealPoId:function() {
									return dealPoId;
								},
							  poId:function() {
									return poId;
								},
								settlementPoId:function() {
									return settlementPoId;
								},
								packageId:function() {
									return packageId;
								}
	  	                	
	  	                }
	  	        });
	         };
	         
	      	var deleteAgreementController = function($scope,$uibModalInstance,planPoId,dealPoId,poId,settlementPoId,packageId) {
	      		$scope.formData = {};
	      		
	      		$scope.approve = function () {
	      			$scope.formData = {};
	      			$scope.formData.planPoId = planPoId;
	      			$scope.formData.dealPoId = dealPoId;
	      			$scope.formData.poId = poId;
	      			$scope.formData.settlementPoId = settlementPoId;
	      			$scope.formData.packageId = packageId;
	      			
	      			console.log($scope.formData);
	              	resourceFactory.agreementDeleteResource.remove({agreementId: scope.agreementId},$scope.formData,function(data) {
	              		console.log($scope.formData);
	                    route.reload();
		              	$uibModalInstance.dismiss('delete');
	              	});
	              	//$uibModalInstance.dismiss('delete');
	      		};
	            $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	            };
	        }
	      	scope.getAllTickets = function() {
				resourceFactory.officeTicketResource.getAll({officeId : routeParams.id}, function(data) {
					scope.tickets = data;
					scope.clientId = routeParams.id;
				});
			};
			
	         /*function deleteAgreementController($scope,$uibModalInstance,planPoId,dealPoId,poId,settlementPoId) {
		      		$scope.approve = function () {
		      			scope.deleteAgreementFormData = {};
		      			scope.deleteAgreementFormData.planPoId = planPoId;
		      			scope.deleteAgreementFormData.dealPoId = dealPoId;
		      			scope.deleteAgreementFormData.poId = poId;
		      			scope.deleteAgreementFormData.settlementPoId = settlementPoId;
		      			console.log(scope.deleteAgreementFormData);
		              	resourceFactory.agreementDeleteResource.remove({agreementId: scope.agreementId},scope.deleteAgreementFormData,function(deleteAgreementFormData) {
		              		console.log(scope.deleteAgreementFormData);
		                    route.reload();
		              	});
		            	$uibModalInstance.dismiss('delete');
		      		};
		            $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		            };
		        }*/
			
			scope.routeToticket = function(officeId, ticketid) {
				console.log(officeId+"_"+ticketid);
				location.path('/viewOfficeTicket/' + officeId + '/' + ticketid);
			};
	         
			scope.routeToEditTicket=function(officeId,ticketId){
				console.log(officeId+"_"+ticketId);
				location.path('/editOfficeTicket/' + officeId + '/' + ticketId);
			}
			scope.callCloseTicket= function(officeId, ticketId){
				  $uibModal.open({
	                  templateUrl: 'CloseTicket.html',
	                  controller: CloseTicketController,
	                  resolve:{
	                	  officeId : function() {
								return officeId;
							},
							ticketId:function() {
								return ticketId;
							},
						}
	              });
	          }
			
			var CloseTicketController = function ($scope, $uibModalInstance,officeId, ticketId) {		
	            $scope.statusDatas=[];
	            $scope.formData={};
	            var locationOrigin = window.location.origin;
	        	var locationPathname = window.location.pathname;
	            resourceFactory.ticketResourceTemplate.getForCloseTicket({templateFor: 'closeticket'}, function(data) {       	 	
	        	$scope.statusDatas = data;
	        	$scope.officeId=officeId;
				$scope.ticketId=ticketId;               
	        });
	        
	        $scope.reset123 = function(){
		       	$uibModalInstance.dismiss('delete');
		    };
		        
	        $scope.closeTicket = function() { 
	        	this.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+$scope.officeId+"/";
	            resourceFactory.closeOfficeTicketResource.update({'ticketId': $scope.ticketId},this.formData,function(data){
	            	location.path('/viewpartner/'+scope.officeId+'/'+scope.officeId);
	            	route.reload();
	            	$uibModalInstance.dismiss('delete');
	            });
	           
	        };
	    
	    };
			
		}
	});
  mifosX.ng.application.controller(
			'ViewPartnerController',[    
              '$scope', 
              '$routeParams', 
              '$rootScope', 
              'ResourceFactory',
	          'webStorage',
	          'PermissionService',
	          '$route',
	          '$uibModal',
	          'PaginatorService', 
	          '$location',
  mifosX.controllers.ViewPartnerController ]).run(function($log) {
	$log.info("ViewPartnerController initialized");
 });
}(mifosX.controllers || {}));