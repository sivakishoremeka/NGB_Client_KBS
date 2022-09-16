(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateRateBalanceController : function(scope, resourceFactory,
				location, $uibModal, route, paginatorService) {

			scope.formData = {};
			scope.ratebalance = [];
			scope.currencyDatas = [];
			scope.RumDatas = [];
			scope.TimeperiodDatas = [];
			scope.TierDatas = [];
			scope.UomDatas = [];
			scope.glRealatedDatas=[];
			scope.UsageDatas=[];
			

			resourceFactory.usageRateBalanceTemplateResource
					.get(function(data) {
						console.log(JSON.stringify(data));
						scope.currencyDatas = data.currencyDatas;
						scope.RumDatas = data.RumDatas;
						scope.TimeperiodDatas = data.TimeperiodDatas;
						scope.TierDatas = data.TierDatas;
						scope.UomDatas = data.UomDatas;
						scope.glRealatedDatas = data.glRealatedDatas;
						scope.UsageDatas=data.UsageDatas;
					});

			scope.addCreateRateQtyTierData = function() {
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
			};

			scope.cancel = function() {
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
		    };

			scope.submit = function() {

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
			};

		}
	});
	mifosX.ng.application.controller(
			'CreateRateBalanceController',
			[ '$scope', 'ResourceFactory', '$location', '$uibModal', '$route',
					'PaginatorService',
					mifosX.controllers.CreateRateBalanceController ]).run(
			function($log) {
				$log.info("CreateRateBalanceController initialized");
			});
}(mifosX.controllers || {}));