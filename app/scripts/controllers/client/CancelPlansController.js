(function(module) {
     mifosX.controllers = _.extend(module, {
         CancelPlansController: function(scope, resourceFactory,webStorage, location,dateFilter,$rootScope,routeParams,$uibModal) {
             scope.clientId = routeParams.id;
             scope.formData = {};
             scope.planDatas = [];
            /* scope.availablePlans = [];*/
             scope.selectedPlans = [];
             scope.clientOrders = [];
             /*scope.totalAvailablePlans = [];
             scope.availablePlans.status = "ACTIVE";
             scope.allowed = [];
             scope.restricted = [];*/
             scope.errors = [];
             scope.cancelPlanData={};
             var selectedPlansArr =[];
             /*scope.planDetails = [];
             scope.formData.planDetails = [];*/
             
             
             
            /* resourceFactory.getOrderResource.getAllOrders({clientId : routeParams.id,'clientServiceId':routeParams.clientServiceId},function(data) {
                    scope.availablePlans = data.clientOrders;
                    scope.allowedPlans = data.clientOrders;
                    scope.totalAvailablePlans = data.clientOrders;
                    scope.serviceChangeFun();
                });      
             
             scope.serviceChangeFun = function(){
                 scope.availablePlans = [];
                 for(var i in scope.totalAvailablePlans){
                     if(scope.totalAvailablePlans[i].status == "ACTIVE"){
                         scope.availablePlans.push(scope.totalAvailablePlans[i]);

                     }
                 }
             }
            
             scope.restrict = function(){
                    for(var i in this.allowed)
                    {
                        for(var j in scope.availablePlans){
                            if(scope.availablePlans[j].id == this.allowed[i])
                            {
                                var temp = {};
                                temp.id = this.allowed[i];
                                temp.name = scope.availablePlans[j].planCode;
                                temp.planDescription = scope.availablePlans[j].planDescription;
                                temp.orderNo = scope.availablePlans[j].orderNo;
                                temp.planPoId = scope.availablePlans[j].planPoId;
                                temp.dealPoId = scope.availablePlans[j].dealPoId;
                                scope.selectedPlans.push(temp);
                                scope.availablePlans.splice(j,1);
                            }
                        }
                    }
                };
                
                scope.allow = function(){
                    for(var i in this.restricted)
                    {
                        for(var j in scope.selectedPlans){
                            if(scope.selectedPlans[j].id == this.restricted[i])
                            {
                                var temp = {};
                                temp.id = this.restricted[i];
                                temp.planCode = scope.selectedPlans[j].name;
                                temp.planDescription = scope.selectedPlans[j].planDescription;
                                temp.orderNo = scope.selectedPlans[j].orderNo;
                                temp.planPoId = scope.selectedPlans[j].planPoId;
                                temp.dealPoId = scope.selectedPlans[j].dealPoId;
                                //   temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
                                scope.availablePlans.push(temp);
                                scope.selectedPlans.splice(j,1);
                            }
                        }
                    }
                };*/
                
             resourceFactory.getOrderResource.getAllOrders({clientId : routeParams.id,'clientServiceId':routeParams.clientServiceId},function(data) {
                 scope.clientOrders = data.clientOrders;
                
             });
             
                  /*Order Disconnect*/
                    scope.orderDisconnect = function(){
                           //scope.errorStatus=[];scope.errorDetails=[];
                          $uibModal.open({
                              templateUrl: 'OrderDisconnect.html',
                              controller: OrderDisconnectController,
                              /*resolve:{
                                  orderId : function() {
                                        return orderId;
                                    }
                                }*/
                          });
                      };
                      
                      scope.selectAll = function(selectAll) {
                          scope.active = selectAll;
                          if(selectAll == true) {
                              for(var i in scope.clientOrders) {
                                  var temp = {};
                                  temp.id = clientOrder.id;
                                  temp.planCode = clientOrder.name;
                                  temp.planDescription = clientOrder.planDescription;
                                  temp.orderNo = clientOrder.orderNo;
                                  temp.planPoId = clientOrder.planPoId;
                                  temp.dealPoId = clientOrder.dealPoId;
                                  selectedPlansArr.push(temp);
                              }
                          } else {
                              for(var i in scope.alldatas) {
                                  selectedPlansArr = _.without(selectedPlansArr,scope.clientOrders[i]);
                             }
                          }
                     };
                     scope.selectedPlansArr = [];
                     scope.planSelected = function(clientOrder, active) {
                          if(active == true) {
                              var temp = {};
                              temp.id = clientOrder.id;
                              temp.planCode = clientOrder.name;
                              temp.planDescription = clientOrder.planDescription;
                              temp.orderNo = clientOrder.orderNo;
                              temp.planPoId = clientOrder.planPoId;
                              temp.dealPoId = clientOrder.dealPoId;
                              selectedPlansArr.push(temp);
                          } else {
                              selectedPlansArr= _.without(selectedPlansArr,clientOrder);
                          }
                        };
                       
               /*  scope.approveDisconnection = function(){
                     console.log(selectedPlansArr);
                      scope.formData.clientOrders=selectedPlansArr;
                     resourceFactory.getOrderResource.save(scope.formData,function(data) {
                         location.path('/plans' );
                         route.reload();
                     },function(errors) {
                         if(errors.data.errors!=null){
                            scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                          }else{
                              scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                          }
                        });
                  };  */
                  var OrderDisconnectController = function ($scope, $uibModalInstance) {
                      /*$scope.errorStatus=[];
                      $scope.errorDetails=[];*/
                      $scope.disconnectDetails = [];
                      $scope.plans = [];
                      $scope.start = {};
                      $scope.formData = {};
                      $scope.start.date = new Date();
                      console.log(selectedPlansArr);
                      resourceFactory.OrderDisconnectResource.get(function(data) {
                          $scope.disconnectDetails = data.disconnectDetails;
                      });
                      scope.clientAndclientServicePoIds = function(){
                           var clientData = webStorage.get('clientData');
                           $scope.formData.clientPoId = clientData.poId;
                           scope.clientServiceDetails = clientData.clientServiceDetails;
                           for(var i in scope.clientServiceDetails){
                               if(scope.clientServiceDetails[i].id == routeParams.clientServiceId){
                                   $scope.formData.clientServicePoId =  scope.clientServiceDetails[i].clientServicePoId;
                                   break;
                               }
                           }
                       }
                      $scope.approveDisconnection = function () {
                          $scope.flagOrderDisconnect=true;
                          if($scope.formData == undefined || $scope.formData == null){
                              $scope.formData = {"disconnectReason":""};
                          }
                          
                          var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
                          $scope.formData.dateFormat = 'dd MMMM yyyy';
                          $scope.formData.disconnectionDate = reqDate;
                          $scope.formData.locale = scope.optlang.code;
                          scope.clientAndclientServicePoIds();  
                        
                          console.log(selectedPlansArr);
                          $scope.formData.plans = selectedPlansArr;
                          
                           
                          scope.selectedPlans= angular.copy(selectedPlansArr);
                          console.log(selectedPlansArr);
                          scope.clientAndclientServicePoIds();
                            for(var i in selectedPlansArr){
                                scope.selectedPlans[i].clientServiceId = routeParams.clientServiceId;
                                scope.selectedPlans[i].clientPoId=$scope.formData.clientPoId;
                                scope.selectedPlans[i].clientServicePoId=$scope.formData.clientServicePoId;
                                scope.selectedPlans[i].clientServiceId = routeParams.clientServiceId;
                                scope.selectedPlans[i].disconnectReason=$scope.formData.disconnectReason;
                                scope.selectedPlans[i].description=$scope.formData.description;
                                scope.selectedPlans[i].clientServiceId = routeParams.clientServiceId;
                                scope.selectedPlans[i].locale = "en";
                                var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
                                scope.selectedPlans[i].dateFormat = 'dd MMMM yyyy';
                                scope.selectedPlans[i].disconnectionDate = reqDate;
                                scope.selectedPlans[i].locale = scope.optlang.code;
                                 
                            }
                          
                                scope.cancelPlanData.plans= angular.copy(scope.selectedPlans);
                          
                          
                          resourceFactory.multipleordersCancelResource.update({'clientId':scope.clientId},scope.cancelPlanData,function(data){
                              
                              location.path('/viewclient/id/'+scope.clientId);
                                $uibModalInstance.close('delete');
                            },function(errors){
                                  if(errors.data.errors!=null){
                                      scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                                    }else{
                                        scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                                    }
                                });
                          
                      };
                      $scope.cancelDisconnection = function () {
                          $uibModalInstance.dismiss('cancel');
                      };
                      
                      
                  };
                
                
               /* scope.submit = function() {  
                    scope.formData.planDetails = [];
                    scope.formData.locale = "en";
                    var temp = [];
                     for(var i in scope.selectedPlans){
                         temp[i] = scope.selectedPlans[i].id;
                     }
                     scope.formData.planDetails = temp;
                     resourceFactory.salescatalogeResource.save(this.formData,function(data){
                             location.path('/catalogemapping');
                      });
                 
                };*/
         }
    });
     mifosX.ng.application.controller('CancelPlansController', [
           '$scope',
           'ResourceFactory',
           'webStorage',
           '$location',
           'dateFilter',
           '$rootScope',
           '$routeParams',
           '$uibModal',
      mifosX.controllers.CancelPlansController]).run(function($log) {
    $log.info("CancelPlansController initialized");
    });
}(mifosX.controllers || {}));

