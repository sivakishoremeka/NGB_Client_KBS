(function(module){
    mifosX.controllers = _.extend(module, {
        EditMrnController: function(scope,location,PermissionService,routeParams,dateFilter,resourceFactory,$rootScope,http,API_VERSION){
        scope.formData = {};
        scope.chargeDatas = [];
        scope.officeDatas = [];
        scope.itemDatas = [];

        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };

        scope.getBothCharge = function(chargeCode, chargeDescription){
        	return chargeCode+"--"+chargeDescription;
        };
        
        scope.getBothItem = function(itemCode,itemDescription){
        	return itemCode+"--"+itemDescription;
        };

        resourceFactory.itemSaleTemplateResource.get(function(data1) {
            scope.officeDatas = data1.officeDatas;
            scope.itemDatas = data1.itemDatas;
            scope.chargeDatas = data1.chargeDatas;

            resourceFactory.itemSalesResource.get({viewitemId: routeParams.id}, function(data) {
                scope.formData.purchaseDate = dateFilter(new Date(data.requestedDate),'dd MMMM yyyy');
                scope.officeDatas.map(e => {
                    if(e.name === data.fromOffice){
                        scope.formData.fromOffice = e.id;
                    }
                }) 
                scope.officeDatas.map(e => {
                    if(e.name === data.toOffice){
                        scope.formData.toOffice = e.id;
                    }
                })
                scope.itemDatas.map(e => {
                    if(e.itemDescription === data.itemDescription){
                        scope.formData.itemDescription = e.itemDescription;
                        scope.formData.itemId =e.id;
                    }
                })
                scope.formData.chargeCode ="OTC";
                scope.formData.quantity = data.orderdQuantity.toString();
                scope.formData.unitPrice = data.unitPrice.toString();
                scope.formData.chargeAmount = data.chargeAmount.toString(); 
            });
        });

        scope.selectedMRN=function(){
        	location.path('/stocktransfer');
        };
        
        scope.reset123 = function(){
	    	  location.path('/stocktransfer');
	    };

        scope.itemDataQuantity = function() {
            var totalPrice;
            totalPrice = (scope.formData.quantity)*(scope.formData.unitPrice);
            scope.formData.chargeAmount = totalPrice;
        }
        scope.submit = function() {
            var payload = { 
                purchaseFrom: scope.formData.fromOffice,
                purchaseBy: scope.formData.toOffice,
                orderQuantity: scope.formData.quantity,
                itemDescription: scope.formData.itemDescription,
                unitPrice: scope.formData.unitPrice,
                chargeAmount: scope.formData.chargeAmount,
                chargeCode: scope.formData.chargeCode,
                itemId: scope.formData.itemId,
                purchaseDate: scope.formData.purchaseDate,
                locale: scope.formData.locale,
                dateFormat: 'dd MMMM yyyy'
            }
            payload.locale = scope.optlang.code;
            
            for(var i in scope.officeDatas){
                if(scope.officeDatas[i].name == scope.formData.fromOffice){
                    payload.purchaseFrom.toString() = scope.officeDatas[i].id;
                    break;
                }
            }
            for(var i in scope.officeDatas){
                if(scope.officeDatas[i].name == scope.formData.toOffice){
                    payload.purchaseBy.toString() = scope.officeDatas[i].id;
                    break;
                }
            }
            for(var i in scope.itemDatas){
                if(scope.itemDatas[i].itemDescription == scope.formData.itemDescription){
                    payload.itemDescription = scope.itemDatas[i].itemDescription;
                    payload.itemId = scope.itemDatas[i].id;
                    break;
                }
            }

            resourceFactory.editMrnResource.update({itemsaleId: routeParams.id},payload,function(data){
		    	location.path('/stocktransfer');
            });
        }
    }
    });
    mifosX.ng.application.controller('EditMrnController', 
        ['$scope' , '$location', 'PermissionService', '$routeParams','dateFilter','ResourceFactory','$rootScope','$http', 'API_VERSION',mifosX.controllers.EditMrnController]).run(function($log){
        $log.info("EditMrnController initialized");        
    });
}(mifosX.controllers || {}));