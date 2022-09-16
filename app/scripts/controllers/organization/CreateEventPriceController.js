(function(module) {
    mifosX.controllers = _.extend(module, {
        CreateEventPriceController : function(scope, routeParams, resourceFactory, location,PermissionService,$rootScope) {
        
            scope.optTypes=[];
            scope.ClientTypes=[];
            scope.format=[];
            scope.discountdata=[];
            scope.formData={};
            scope.hideForGame = true;
            scope.currencydatas = [];
            scope.eventpriceDatas = [];
            scope.eventpriceData = [];
            scope.pricing = [];
            
            resourceFactory.eventPriceTemplateResource.getpriceDetails({eventId: routeParams.id} ,function(data) {
                scope.eventId=data.eventId;
                scope.catId = data.categoryId;
                scope.formData = data;
                if(scope.catId == '999991'){
                    scope.hideForGame = false;
                    scope.formData.formatType='SD';
                }
                scope.OptTypes = data.optTypes;                
                scope.Format = data.format;                
                scope.Discountdatas = data.discountdata;                
                scope.ClientTypes = data.clientTypes;
                scope.currencydatas = data.currencydata.currencyOptions;
                
              if(data.EventPricingData != null){
                	scope.eventpriceDatas = data.EventPricingData;
            	}
               
                for ( var i in scope.eventpriceDatas) {
            		/*Charge type*/
            		for (var j in scope.ClientTypes){
            			console.log(scope.eventpriceDatas[i].clientType + "/"+scope.ClientTypes[j].type);
            			if(scope.eventpriceDatas[i].clientType == scope.ClientTypes[j].type){
            				scope.eventpriceDatas[i].clientType = scope.ClientTypes[j].id;
            				
            			}
            		}/*Charge Code*/
            		for ( var k in scope.currencydatas) {
            			if(scope.eventpriceDatas[i].code == scope.currencydatas[k].code){
            				scope.eventpriceDatas[i].code = scope.currencydatas[k].code;
            			}
            		}
            		
            	}
                
                
            });    
            
            
            
             scope.getBothcurrency = function(code,name){
                  return code+"----"+name;
             };
                
                scope.addPriceData = function(){
                    if(scope.formData.eventId && scope.formData.clientType && scope.formData.formatType && scope.formData.discountId &&
                            scope.formData.optType && scope.formData.currencyId && scope.formData.price){
                        scope.fieldserror = false;
                        console.log(scope.formData);
                        var eventId = scope.formData.eventId;
                        scope.formData = {eventId : eventId,
                        		          clientType :scope.formData.clientType,
                        		          formatType :scope.formData.formatType,
                        		          discountId :scope.formData.discountId,
                        		          optType    :scope.formData.optType,
                        		          currencyId :scope.formData.currencyId,
                        		          price      :scope.formData.price
                                          };
                        scope.eventpriceDatas.push(scope.formData);
                        console.log(JSON.stringify(scope.formData));
                      //scope.eventpriceDatas = scope.eventpriceData;
                            
                    }else{
                     scope.errorDetails = [];
                     scope.fieldserror = true;
                     scope.labelerror = "fieldserror";
                    }    
                }
                
                scope.removePriceData = function (index,eventPriceId) {
                    if(eventPriceId !=undefined){
                    	console.log(eventPriceId);
                        resourceFactory.deleteEventPriceResource.remove({eventPriceId:eventPriceId}, {}, function(data) {  
                             scope.eventpriceDatas.splice(index, 1);
                        });
                    }else{
                        scope.eventpriceDatas.splice(index, 1);
                    }
                }
                
                priceDataSendingOneByOneFun = function(val){
                	console.log("hi");
                	console.log(val);
                	console.log(scope.eventpriceDatas);
                    if(scope.eventpriceDatas[val].id){
                    	console.log("Hai");
                        scope.planPriceId = scope.eventpriceDatas[val].id;
                        resourceFactory.updateEventPriceResource.update({eventPriceId:scope.planPriceId},scope.eventpriceDatas[val],function(data){
                        	console.log("rak");
                            if(val == scope.eventpriceDatas.length-1){
                                location.path('viewEventPrices/'+routeParams.id);
                            }else{
                                val += 1;
                                priceDataSendingOneByOneFun(val);
                             }
                        });
                        
                }else{
                	
                    resourceFactory.eventpriceResource.save({'eventId':routeParams.id},scope.eventpriceDatas[val],function(data){
                    	 console.log(data);
                         if(val == scope.eventpriceDatas.length-1){
                             location.path('viewEvent/'+routeParams.id);
                         }else{
                             val += 1;
                             priceDataSendingOneByOneFun(val);
                          }
                     });
                   }
                 };
                
            scope.submit = function(){
                delete this.formData.optTypes;
                delete this.formData.discountdata;
                delete this.formData.format;
                delete this.formData.clientTypes;
                delete this.formData.categoryId;
                for(var i in scope.eventpriceDatas){
                	scope.eventpriceDatas[i].locale = scope.optlang.code;
                    if(i==(scope.eventpriceDatas.length-1)){
                        priceDataSendingOneByOneFun(0);
                    }
                }
            };
        }
    });
    mifosX.ng.application.controller('CreateEventPriceController', ['$scope', '$routeParams', 'ResourceFactory', '$location','PermissionService','$rootScope', mifosX.controllers.CreateEventPriceController]).run(function($log) {
        $log.info("CreateEventPriceController initialized");
      });
}(mifosX.controllers || {}));