(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateRateBalanceController : function(scope, resourceFactory,
				location, $uibModal, route, paginatorService, routeParams) {

			scope.formData = {};
			scope.ratebalance = [];
			scope.currencyDatas = [];
			scope.RumDatas = [];
			scope.TimeperiodDatas = [];
			scope.TierDatas = [];
			scope.UomDatas = [];
			scope.glRealatedDatas=[];
			scope.UsageDatas=[];
			scope.usageRateQuantityTierDatas=[];
			scope.usageRateQuantityTierId = 0;
			var usageRateQuantityTier={};
			scope.usageRateQuantityTierStepDatas=[];
			scope.usageRateBalanceDatas=[];
			
			/* Nested Tier List Collapse/Expand */
			scope.tableRowExpanded = false;
		    scope.tableRowIndexExpandedCurr = "";
		    scope.tableRowIndexExpandedPrev = "";
		    scope.tierIdExpanded = "";
		    
		    /* Nested Step List Collapse/Expand */
			scope.tableRowExpanded1 = false;
		    scope.tableRowIndexExpandedCurr1 = "";
		    scope.tableRowIndexExpandedPrev1 = "";
		    scope.stepIdExpanded1 = "";
			
			resourceFactory.usageRatePlanResource.get({ratePlanId: routeParams.id},function(data){
				scope.ratePlanData = data;
				scope.ratePlanDatas = scope.getBothPlanprice(data.planDesc, data.productDesc);
			});
			
			scope.getBothPlanprice = function(planDesc, productDesc) {
				return planDesc + "--" + productDesc;
			};
			
			/*ADD Tier Template Html */
			scope.addTier = function() {
				$uibModal.open({
					templateUrl : 'AddTierData.html',
					controller : AddTierDataController,
					resolve : {}
				});
			};

			/* ADD Tier Controller */
			var AddTierDataController = function($scope, $uibModalInstance) {
				
				
				$scope.submit2 = function(){
					$scope.formData2.locale ="en";
					$scope.formData2.usageRateplanId = routeParams.id;

					resourceFactory.usageRateQuantityTier.save($scope.formData2,function(data){
						$uibModalInstance.close('delete');
						route.reload();
		           },function(errData){
		           });
				};
				
				$scope.reject = function(){
					$uibModalInstance.close('delete');
					route.reload();
  	  			};
				
			};
			
			/* This is used to get usage rate quantity tier data based on ratePlanId*/
			resourceFactory.usageRateQuantityTierResource.get({ratePlanId: routeParams.id},function(data){
				scope.usageRateQuantityTierDatas = data;
			});
			
			/*ADD Tier Step Template Html */
			scope.addTierStep = function(id) {
				scope.tierId = id;
				$uibModal.open({
					templateUrl : 'AddTierStepData.html',
					controller : AddTierStepDataController,
					resolve : {}
				});
			};
			
			/* ADD Tier Step Controller */
			var AddTierStepDataController = function($scope, $uibModalInstance) {
				$scope.submit3 = function(){
					$scope.formData3.locale ="en";
					$scope.formData3.tierId = scope.tierId;
					resourceFactory.usageRateQuantityTierStep.save({tierId: scope.tierId},$scope.formData3,function(data){
						$uibModalInstance.close('delete');
						route.reload();
		        		
		           },function(errData){
		           });
				};
				
				$scope.reject3 = function(){
					$uibModalInstance.close('delete');
					route.reload();
  	  			};
				
			};
			

            scope.dayDataCollapseFn = function () {
                scope.dayDataCollapse = [];
                for (var i = 0; i < scope.usageRateQuantityTierStepDatas.length; i += 1) {
                    scope.dayDataCollapse.push(false);
                }
            };
			
			/* Get Tier Steps*/
			scope.tierSteps = function (index,tierId) {
				
				if (typeof scope.dayDataCollapse === 'undefined') {
		            scope.dayDataCollapseFn();
		        }
				

		        if (scope.tableRowExpanded === false && scope.tableRowIndexExpandedCurr === "" && scope.tierIdExpanded === "") {
		            scope.tableRowIndexExpandedPrev = "";
		            scope.tableRowExpanded = true;
		            scope.tableRowIndexExpandedCurr = index;
		            scope.tierIdExpanded = tierId;
		            scope.dayDataCollapse[index] = true;
		        } else if (scope.tableRowExpanded === true) {
		            if (scope.tableRowIndexExpandedCurr === index && scope.tierIdExpanded === tierId) {
		                scope.tableRowExpanded = false;
		                scope.tableRowIndexExpandedCurr = "";
		                scope.tierIdExpanded = "";
		                scope.dayDataCollapse[index] = false;
		            } else {
		                scope.tableRowIndexExpandedPrev = scope.tableRowIndexExpandedCurr;
		                scope.tableRowIndexExpandedCurr = index;
		                scope.tierIdExpanded = tierId;
		                scope.dayDataCollapse[scope.tableRowIndexExpandedPrev] = false;
		                scope.dayDataCollapse[scope.tableRowIndexExpandedCurr] = true;
		            }
		        }
				
		        resourceFactory.usageRateQuantityTierStep.get({tierId: tierId},function(data){
					scope.usageRateQuantityTierStepDatas = data;
				});
            };
            
			/*Add Rate Plan Price template html*/
            scope.addRatePlanPrice = function(tierId,stepId,ratePlanId,timeModelId) {
            	console.log(tierId,stepId,ratePlanId,timeModelId);
            	scope.tierId = tierId;
            	scope.stepId = stepId;
            	scope.ratePlanId = ratePlanId;
            	scope.timeModelId = timeModelId;
				$uibModal.open({
					templateUrl : 'AddRatePlanPriceData.html',
					controller : AddRatePlanPriceDataController,
					resolve : {}
				});
			};
			
			/*Add Rate Plan Price Controller*/
			var AddRatePlanPriceDataController = function($scope, $uibModalInstance) {
				
				$scope.currencyDatas=[];
				$scope.glRealatedDatas=[];
				$scope.RumDatas=[];
				$scope.UomDatas=[];
				$scope.TimeperiodDatas=[];
				$scope.ratebalance = [];
				$scope.formData2= {}; 
				
				resourceFactory.usageRatePlanTemplateResource.get(function(data) {
					$scope.PlanpriceData = data.PlanpriceDatas;
					$scope.timemdelData = data.timemdelDatas;
					$scope.currencyDatas=data.currencyDatas;
					$scope.glRealatedDatas=data.glRealatedDatas;
					$scope.RumDatas=data.RumDatas;
					$scope.UomDatas=data.UomDatas;
					$scope.TimeperiodDatas=data.TimeperiodDatas;
				});
				 

				/*$scope.addCreateRateQtyTierNewData = function() {
					if ($scope.currencyId && $scope.glId && $scope.uomId && $scope.rumId
							&& $scope.timeperiodId && $scope.unit && $scope.rate) {
						
						$scope.ratebalance.push({
							currencyId : $scope.currencyId,
							glId : $scope.glId,
							uomId : $scope.uomId,
							rumId : $scope.rumId,
							timeperiodId :$scope.timeperiodId,
							unit : $scope.unit,
							rate : $scope.rate
						});

						
	  		            delete $scope.currencyId;
	  		            delete $scope.glId ;
	  		            delete $scope.uomId;
	  		            delete $scope.rumId;
	  		            delete $scope.timeperiodId;
	  		            delete $scope.unit;
	  		            delete $scope.rate;

					}
				};*/
				
				$scope.getBothCurrency = function(code, name) {
					return code + "--" + name;
				}
				
				/*$scope.removeRateBalance = function(index) {
					console.log("Index");
					console.log(index);
					$scope.ratebalance.splice(index, 1);
				};*/
				
				$scope.reject4 = function(){
					$uibModalInstance.close('delete');
					route.reload();
  	  			};
				
				$scope.submit4 = function(){
					$scope.formData4.locale ="en";
					/*$scope.usageRateplanId = usagerateplan.resourceId;
					$scope.formData2.usageRateplanId = $scope.usageRateplanId;
					$scope.usageRateQuantityTierId = usageRateQuantityTier.resourceId;*/
					$scope.formData4.tierId = scope.tierId;
					$scope.formData4.stepId = scope.stepId;
					$scope.formData4.ratePlanId = scope.ratePlanId;
					$scope.formData4.timeModelId = scope.timeModelId;
					
					/*if ($scope.ratebalance.length > 0) {
						for ( var i in $scope.ratebalance) {
							$scope.formData2.ratebalance.push({
								currencyId : $scope.ratebalance[i].currencyId,
								glId : $scope.ratebalance[i].glId,
								uomId : $scope.ratebalance[i].uomId,
								rumId : $scope.ratebalance[i].rumId,
								timeperiodId : $scope.ratebalance[i].timeperiodId,
								unit : $scope.ratebalance[i].unit,
								rate : $scope.ratebalance[i].rate,
								tierId : $scope.usageRateQuantityTierId,

							});
						};
					}*/
					console.log("formData4");
					console.log($scope.formData4);
					resourceFactory.usageRateBalanceResource.save($scope.formData4, function(
							data) {
						$uibModalInstance.close('delete');
						  route.reload();

					},function(errData){
			          });
				};
				
				
				$scope.reject = function(){
  	  				$uibModalInstance.dismiss('cancel');
  	  				};
				
			};
			
			scope.dayDataCollapseFn1 = function () {
                scope.dayDataCollapse1 = [];
                for (var i = 0; i < scope.usageRateBalanceDatas.length; i += 1) {
                    scope.dayDataCollapse1.push(false);
                }
            };
			
			/* Get Step Rates*/
			scope.stepRateBalance = function (index,stepId) {
				
				if (typeof scope.dayDataCollapse1 === 'undefined') {
		            scope.dayDataCollapseFn1();
		        }
				

		        if (scope.tableRowExpanded1 === false && scope.tableRowIndexExpandedCurr1 === "" && scope.stepIdExpanded1 === "") {
		            scope.tableRowIndexExpandedPrev1 = "";
		            scope.tableRowExpanded1 = true;
		            scope.tableRowIndexExpandedCurr1 = index;
		            scope.stepIdExpanded1 = stepId;
		            scope.dayDataCollapse1[index] = true;
		        } else if (scope.tableRowExpanded1 === true) {
		            if (scope.tableRowIndexExpandedCurr1 === index && scope.stepIdExpanded1 === stepId) {
		                scope.tableRowExpanded1 = false;
		                scope.tableRowIndexExpandedCurr1 = "";
		                scope.stepIdExpanded1 = "";
		                scope.dayDataCollapse1[index] = false;
		            } else {
		                scope.tableRowIndexExpandedPrev1 = scope.tableRowIndexExpandedCurr1;
		                scope.tableRowIndexExpandedCurr1 = index;
		                scope.stepIdExpanded1 = stepId;
		                scope.dayDataCollapse1[scope.tableRowIndexExpandedPrev1] = false;
		                scope.dayDataCollapse1[scope.tableRowIndexExpandedCurr1] = true;
		            }
		        }
		        resourceFactory.usageRateBalanceResource.get({stepId: stepId}, function(data) {
					scope.usageRateBalanceDatas = data;
				},function(errData){
		          });
            };

			
			/*scope.stepRateBalance = function(stepId){
				resourceFactory.usageRateBalanceResource.get({stepId: stepId}, function(data) {
					console.log(data);
					console.log("data");
					scope.usageRateBalanceDatas = data;
				},function(errData){
		          });
			}*/
            
			/*resourceFactory.usageRateBalanceTemplateResource
					.get(function(data) {
						scope.currencyDatas = data.currencyDatas;
						scope.RumDatas = data.RumDatas;
						scope.TimeperiodDatas = data.TimeperiodDatas;
						scope.TierDatas = data.TierDatas;
						scope.UomDatas = data.UomDatas;
						scope.glRealatedDatas = data.glRealatedDatas;
						scope.UsageDatas=data.UsageDatas;
					});*/

			/*scope.addCreateRateQtyTierData = function() {
				if (scope.tierId && scope.uomId && scope.rumId
						&& scope.timeperiodId && scope.unit && scope.rate) {

					scope.ratebalance.push({
						tierId : scope.tierId,
						locale : scope.optlang.code,
						uomId : scope.uomId,
						rumId : scope.rumId,
						timeperiodId : scope.timeperiodId,
						unit : scope.unit,
						rate : scope.rate
					});

					scope.tierId = undefined;
					scope.uomId = undefined;
					scope.rumId = undefined;
					scope.timeperiodId = undefined;
					scope.unit = undefined;
					scope.rate = undefined;

				}
			};*/

			/*scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

			scope.reset123 = function() {
				location.path('/rating');
			};

			scope.removeRateBalance = function(index) {
				scope.ratebalance.splice(index, 1);
			};

			scope.getBothCurrency = function(code, name) {
				return code + "--" + name;
			}
			
			 scope.getBothrate = function(planPriceId,rumName,timemodelName){
					return planPriceId+"--"+rumName+"--"+timemodelName;
		    };*/

			/*scope.submit = function() {

				scope.formData.locale = "en";
				scope.formData.ratebalance = new Array();
				if (scope.ratebalance.length > 0) {
					for ( var i in scope.ratebalance) {
						scope.formData.ratebalance.push({
							tierId : scope.ratebalance[i].tierId,
							uomId : scope.ratebalance[i].uomId,
							rumId : scope.ratebalance[i].rumId,
							timeperiodId : scope.ratebalance[i].timeperiodId,
							unit : scope.ratebalance[i].unit,
							rate : scope.ratebalance[i].rate,

						});
					}
					;
				}

				resourceFactory.usageRateBalance.save(scope.formData, function(
						data) {
					location.path('/rating');

				});
			};*/

		}
	});
	mifosX.ng.application.controller(
			'CreateRateBalanceController',
			[ '$scope', 'ResourceFactory', '$location', '$uibModal', '$route',
					'PaginatorService','$routeParams',
					mifosX.controllers.CreateRateBalanceController ]).run(
			function($log) {
				$log.info("CreateRateBalanceController initialized");
			});
}(mifosX.controllers || {}));