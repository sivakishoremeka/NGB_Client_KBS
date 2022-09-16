(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateUsageRatePlanController : function(scope, resourceFactory,
				location, $uibModal, route, paginatorService,routeParams) {

			scope.formData = {};
			scope.formData1 = {};
			scope.ratingTypes = [ "continous", "cumulative" ];
			scope.range = [];
			scope.currencyDatas=[];
			scope.glRealatedDatas=[];
			scope.RumDatas=[];
			scope.UomDatas=[];
			scope.TimeperiodDatas=[];
			scope.formData2 = {};
			scope.ratebalance = [];
			scope.usageRateplanId = 0;
			var usagerateplan={};
			scope.usageRateQuantityTierId = 0;
			var usageRateQuantityTier={};
			scope.timePeriodData=[];
			

			resourceFactory.usageRatePlanTemplateResource.get(function(data) {
				scope.PlanpriceData = data.PlanpriceDatas;
				scope.RumData = data.RumDatas;
				scope.timemdelData = data.timemdelDatas;
				scope.currencyDatas=data.currencyDatas;
				scope.glRealatedDatas=data.glRealatedDatas;
				scope.RumDatas=data.RumDatas;
				scope.UomDatas=data.UomDatas;
				scope.TimeperiodDatas=data.TimeperiodDatas;
			});
			
			scope.getTimePeriods = function(timeModelId){   
			    resourceFactory.timePeriodByTimeModelResource.get({timeModelId:timeModelId},function(data) {
			    	 console.log(data);
			    	scope.timePeriodData=data;
					
				 
			    });
			} 

			scope.reset123 = function() {
				location.path('/rating');
			};

			scope.getBothPlanprice = function(planDesc, productDesc) {
				return planDesc + "--" + productDesc;
			};
			
			/*scope.addCreateRateQtyTierNewData = function() {
				
				if (scope.currencyId && scope.glId && scope.uomId && scope.rumId
						&& scope.timeperiodId && scope.unit && scope.rate) {
					
					scope.ratebalance.push({
						currencyId : scope.currencyId,
						glId : scope.glId,
						locale : scope.optlang.code,
						uomId : scope.uomId,
						rumId : scope.rumId,
						timeperiodId : scope.timeperiodId,
						unit : scope.unit,
						rate : scope.rate
					});

					scope.currencyId = undefined;
					scope.glId = undefined;
					scope.uomId = undefined;
					scope.rumId = undefined;
					scope.timeperiodId = undefined;
					scope.unit = undefined;
					scope.rate = undefined;

				}
			};*/
			
			/*scope.removeRateBalance = function(index) {
				scope.ratebalance.splice(index, 1);
			};*/

			scope.removeRange = function(index) {
				scope.range.splice(index, 1);
			};
			scope.getBothCurrency = function(code, name) {
				return code + "--" + name;
			}
			
			scope.show = function(){
				/*   if(scope.clicked)*/
				   scope.show = false;
				}
			scope.addprice = function() {
				$uibModal.open({
					templateUrl : 'AddpriceData.html',
					controller : AddpriceDataController,
					resolve : {}
				});
			};
			var AddpriceDataController = function($scope, $uibModalInstance) {
				
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
				 

				$scope.addCreateRateQtyTierNewData = function() {
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
				};
				
				$scope.getBothCurrency = function(code, name) {
					return code + "--" + name;
				}
				
				$scope.removeRateBalance = function(index) {
					console.log("Index");
					console.log(index);
					$scope.ratebalance.splice(index, 1);
				};
				
				/*$scope.submit2 = function() {
					
				cosole.log("Submit2");
				console.log($scope.ratebalance)
					$scope.formData2.locale ="en";
					$scope.formData2.ratebalance = new Array();
					$scope.usageRateplanId = usagerateplan.resourceId;
					$scope.formData2.usageRateplanId = $scope.usageRateplanId;

					$scope.usageRateQuantityTierId = usageRateQuantityTier.resourceId;
					
					if ($scope.ratebalance.length > 0) {
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
					}
					resourceFactory.usageRateBalance.save($scope.formData2, function(
							data) {
						location.path('/createusagerateplan');

					});
				};*/
				
				$scope.submit = function(){
					console.log("Hi");
					console.log($scope.ratebalance);
					console.log(usagerateplan.resourceId);
					$scope.formData2.locale ="en";
					$scope.formData2.ratebalance = new Array();
					$scope.usageRateplanId = usagerateplan.resourceId;
					$scope.formData2.usageRateplanId = $scope.usageRateplanId;
					$scope.usageRateQuantityTierId = usageRateQuantityTier.resourceId;
					
					if ($scope.ratebalance.length > 0) {
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
					}
					resourceFactory.usageRateBalanceResource.save($scope.formData2, function(
							data) {
						//location.path('/createusagerateplan');
						$uibModalInstance.close('delete');
						  route.reload();

					},function(errData){
			          });
				};
				
				
				$scope.reject = function(){
  	  				$uibModalInstance.dismiss('cancel');
  	  				};
				
			};
			 
			scope.submit = function() {
				scope.formData.locale = "en";
				resourceFactory.usageRatePlanResource.save(scope.formData,
						function(data) {					
					
					usagerateplan = angular.fromJson(data);
				    return usagerateplan;
							location.path('/createusagerateplan');

						});
			};
			
			/*scope.submit1 = function() {
				scope.formData.locale = "en";
				scope.formData1.range = new Array();
				scope.resourceId = resourc.resourceId;
				console.log(scope.resourceId);
				scope.formData1.usageRateplanId = scope.resourceId;
				if (scope.range.length > 0) {
					for ( var i in scope.range) {
						scope.formData1.range.push({
							startRange : scope.range[i].startRange,
							endRange : scope.range[i].endRange,
							tierName : scope.range[i].tierName,

							
						});
                     };
                   }
				 resourceFactory.usageRateQuantityTier.save(scope.formData1,function(data){
		            	location.path('/createusagerateplan');
		        		
		          });
			  };*/
			
			scope.addCreateRateQtyTierData = function() {
				if (scope.startRange && scope.endRange) {

					scope.range.push({
						startRange : scope.startRange,
						locale : scope.optlang.code,
						endRange : scope.endRange,
						tierName : scope.tierName,
					});

					scope.startRange = undefined;
					scope.endRange = undefined;
					scope.tierName = undefined;
					scope.formData.locale = "en";
					scope.formData1.range = new Array();
					scope.usageRateplanId = usagerateplan.resourceId;
					scope.formData1.usageRateplanId = scope.usageRateplanId;
					if (scope.range.length > 0) {
						for ( var i in scope.range) {
							scope.formData1.range.push({
								startRange : scope.range[i].startRange,
								endRange : scope.range[i].endRange,
								tierName : scope.range[i].tierName,

								
							});
	                     };
	                   }
					 resourceFactory.usageRateQuantityTier.save(scope.formData1,function(data){
							usageRateQuantityTier= angular.fromJson(data);
							return usageRateQuantityTier;
			            	location.path('/createusagerateplan');
			        		
			          });

				}
			};
			  
			  /*scope.submit2 = function() {

					scope.formData.locale = "en";
					scope.formData2.ratebalance = new Array();
					scope.usageRateplanId = usagerateplan.resourceId;
					scope.formData2.usageRateplanId = scope.usageRateplanId;

					scope.usageRateQuantityTierId = usageRateQuantityTier.resourceId;
					
					if (scope.ratebalance.length > 0) {
						for ( var i in scope.ratebalance) {
							scope.formData2.ratebalance.push({
								currencyId : scope.ratebalance[i].currencyId,
								glId : scope.ratebalance[i].glId,
								uomId : scope.ratebalance[i].uomId,
								rumId : scope.ratebalance[i].rumId,
								timeperiodId : scope.ratebalance[i].timeperiodId,
								unit : scope.ratebalance[i].unit,
								rate : scope.ratebalance[i].rate,
								tierId : scope.usageRateQuantityTierId,

							});
						};
					}
					resourceFactory.usageRateBalance.save(scope.formData2, function(
							data) {
						location.path('/rating');

					});
				};*/
			  
			  
			  

		}
	});
	mifosX.ng.application.controller(
			'CreateUsageRatePlanController',
			[ '$scope', 'ResourceFactory', '$location', '$uibModal', '$route',
					'PaginatorService', '$routeParams', 
					mifosX.controllers.CreateUsageRatePlanController ]).run(
			function($log) {
				$log.info("CreateUsageRatePlanController initialized");
			});
}(mifosX.controllers || {}));