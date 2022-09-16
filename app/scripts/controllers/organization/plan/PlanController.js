(function(module) {
  mifosX.controllers = _.extend(module, {
      PlanController: function(scope, resourceFactory,location,$uibModal,route,webStorage,dateFilter, paginatorService) {
        scope.plans = [];
        scope.planData=[];
        scope.config = {};
        scope.globalConfigs = [];
        scope.PlanTypeEnum = [];
        scope.SearchTypeEnum = [];
        scope.planTypeData=[];
        scope.isCrm = false;
        scope.formData={};
        scope.formData.plans=[];
        var syncPlanArr=[];
        scope.orderError;
        scope.errorDetails=[];
        scope.globalConfigs =  webStorage.get("global_configuration")
        for(var i in scope.globalConfigs){
            if(scope.globalConfigs[i].name == "is-CRM-Enable"){
                scope.isCrm = scope.globalConfigs[i].enabled;break;
            }
        };
        
        var limitPlanLength = basicplanLength = 15;
        var remaining ;
        var x ;
        
        scope.onFilter = function(filterText){
        	scope.formData.search = filterText;
        	scope.limitplans = paginatorService.paginate(scope.plansFetchFunction, 14);
        	
        };
        
        scope.plansFetchFunction = function(offset, limit, callback) {
			  resourceFactory.planResource.get({offset: offset, limit: limit, sqlSearch: scope.formData.search}, function(data) {
				  	scope.totalpropeties = data.totalFilteredRecords;
		        	scope.allDatas = data.pageItems;
		        	if(scope.totalpropeties%15 == 0)	
		        		scope.totalPages = scope.totalpropeties/15;
		        	else
		        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
		        	callback(data);
		        });
		  };
		  
		  if(scope.isCrm == false){
	           // scope.getPlans();
			  scope.limitplans = paginatorService.paginate(scope.plansFetchFunction, 14);
	        }
        
        /*scope.isPlanTab=false;
        scope.getPlans = function(){
        	scope.isPlanTab=true;
            scope.plans = [];
            scope.limitplans = [];
            resourceFactory.planResource.query(function(data) {
                scope.plans= data;
                webStorage.add("plan", scope.plans);
                remaining = scope.plans.length%basicplanLength;
                x = scope.plans.length/basicplanLength;
                x =Math.floor(x);
                pushPlans();
            });
            
        }*/
       
        /*scope.previous = function(){
        	limitPlanLength = limitPlanLength - basicplanLength;
        	if(limitPlanLength>=basicplanLength){
        	pushPlans();
        	}
        };*/
        
        /*var disableCheck = function(){
        	if(limitPlanLength<basicplanLength){
        		scope.hasPrevious = false;
        	}else if(limitPlanLength>basicplanLength){
        		scope.hasNext =true;
        		scope.hasPrevious = true;
        	}else if(limitPlanLength == basicplanLength){
        		scope.hasPrevious = false;
        		scope.hasNext = true;
        	}
        }*/
        
        /*var pushPlans = function(){
        	disableCheck();
        	if(limitPlanLength<scope.plans.length){
        		scope.limitplans =[];
            	for (var i=limitPlanLength- basicplanLength; i<limitPlanLength; i++) {
            		scope.limitplans.push(scope.plans[i]);
                }
        	}else if(scope.plans.length>=basicplanLength*(x)){
        		scope.limitplans =[];
        		limitPlanLength = limitPlanLength - basicplanLength;
        		if(remaining ==0){
        			remaining = basicplanLength;
        		}
        		for(var i=0;i<remaining;i++){
        			scope.limitplans.push(scope.plans[limitPlanLength+i]);
        		}
        		limitPlanLength = limitPlanLength + basicplanLength;
        		scope.hasNext =false;
        	}
        }*/
        /*scope.next = function(){
            limitPlanLength = limitPlanLength + basicplanLength;
        	pushPlans();
        };*/
       
        
        
        
        /*if(scope.isCrm == false){
            scope.getPlans();
        }*/
       
        scope.createPrice=function(plan){
      	  //webStorage.add("plan",plan);
      	  location.path('/createprice/'+plan.id);
        }
        
       
        /*scope.SearchSubmit = function(){
          scope.searchData={};
            scope.searchData.planTypeEnum=scope.formData.PlanTypeEnum;
            scope.searchData.SearchTypeEnum=scope.formData.SearchTypeEnum;
            scope.searchData.planTypeData=scope.formData.planTypeData;
          if(scope.formData.SearchTypeEnum!=null){
            if(scope.formData.SearchTypeEnum=="EQUALS"){
                scope.formData.updatedValue=scope.formData.value;
            }
            else if(scope.formData.SearchTypeEnum=="STARTS_WITH"){
                scope.formData.updatedValue=scope.formData.value+"%";
                console.log(scope.formData.updatedValue);
            }
            else if(scope.formData.SearchTypeEnum=="ENDS_WITH"){
                scope.formData.updatedValue="%"+scope.formData.value;
                console.log(scope.formData.updatedValue);
            }
            else if(scope.formData.SearchTypeEnum=="CONTAINS"){
                scope.formData.updatedValue="%"+scope.formData.value+"%";
                console.log(scope.formData.updatedValue);
            }
            
        }
        
        resourceFactory.crmplanresource.query({key:scope.formData.key,value:scope.formData.updatedValue,planType:scope.searchData.planTypeEnum,
                 searchType:scope.searchData.SearchTypeEnum,planTypeData:scope.searchData.planTypeData},function(data) {
                  scope.plans= data;
                  scope.formData.plans=data;
                  scope.PlanTypeEnum = data.PlanTypeEnum;
                 scope.SearchTypeEnum = data.SearchTypeEnum;
                 scope.planTypeData=data.planTypeData;
             });
        }*/
        /*scope.getcrmPlans=function(){
        	scope.isPlanTab=false;
            scope.plans = [];
        resourceFactory.crmplantemplateresource.get({} , function(data) {
            scope.PlanTypeEnum = data.PlanTypeEnum;
            scope.SearchTypeEnum = data.SearchTypeEnum;
            scope.planTypeData=data.planTypeData;
            
            
        });
        }*/
        scope.routeTo = function(id){
            location.path('/viewplan/'+ id);
          };
          
       /*scope.selectAll = function(selectAll) {
            scope.active = selectAll;
            if(selectAll == true) {
                for(var i in scope.plans) {
                    syncPlanArr.push(scope.plans[i]);
                }
            } else {
              for(var i in scope.allDatas) {
                  syncPlanArray = _.without(syncPlanArr,scope.plans[i]);
               }
            }
            console.log(syncPlanArr);
       }*/
    
       /*scope.syncPlanArr = [];
       scope.planSelected = function(plan, active) {
            if(active == true) {
                syncPlanArr.push(plan);
            } else {
                syncPlanArr= _.without(syncPlanArr,plan);
            }
            console.log(syncPlanArr);
          };*/
          
       
       
          /*scope.SyncSubmit = function(){
              scope.syncPlanArr.dateFormat = "dd MMMM yyyy";
              for(var i in syncPlanArr){
                  syncPlanArr[i].startDate=dateFilter(new Date( syncPlanArr[i].startDate), syncPlanArr[i].dateFormat);
                  console.log( syncPlanArr[i].startDate);
                  syncPlanArr[i].endDate=dateFilter(new Date(syncPlanArr[i].endDate), syncPlanArr[i].dateFormat);
              }
              scope.formData.plans=syncPlanArr;
              scope.formData.locale=scope.optlang.code;
              
             resourceFactory.crmsyncplanresource.save(scope.formData,function(data) {
                 location.path('/plans' );
                 route.reload();
             },function(errors) {
                 if(errors.data.errors!=null){
                    scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                  }else{
                      scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                  }
                });
          };*/
          
          
          scope.deleteplan=function(value){
              scope.planId=value;
              $uibModal.open({
                  templateUrl: 'deleteplan.html',
                  controller: Approve,
                  resolve:{}
              });
          };
          
          scope.editPlanQualifier=function(value){
              scope.planId=value;
              $uibModal.open({
                  templateUrl: 'editplanqualifier.html',
                  controller: ApproveQualifier,
                  resolve:{}
              });
          };
          
          
         function Approve($scope, $uibModalInstance) {
              
              $scope.approve = function () {
                  
                  scope.approveData = {};
                  resourceFactory.planResource.remove({planId:scope.planId},{},function(){
                      route.reload();
                  });
                  $uibModalInstance.close('delete');
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          }
         
         function ApproveQualifier($scope, $uibModalInstance) {
             $scope.selectedServices = [];
             $scope.partners = [];
             $scope.allowed = [];
             $scope.restricted = [];
             $scope.formData = {};
             resourceFactory.planQualifierResource.get({planId:scope.planId},function(data) {
                 //$scope.planqualifiers= data;
                 $scope.availabePartnersDatas = data.availabePartnersDatas;
                 $scope.partnersDatas = data.partnersDatas;
             });
             $scope.approve = function () {
                    var temp = [];
                 for ( var i in $scope.partnersDatas) {                    
                        temp[i] = $scope.partnersDatas[i].id;                    
                    }                    
                 $scope.formData.partners = temp;        
                 resourceFactory.planQualifierResource.update({planId:scope.planId},$scope.formData,function(){
                     route.reload();
                 });
                 $uibModalInstance.close('delete');
             };
             $scope.cancel = function () {
                 $uibModalInstance.dismiss('cancel');
             };
             
             $scope.restrict = function() {                
                 for ( var i in this.allowed) {                
                     for ( var j in $scope.availabePartnersDatas) {                    
                         if ($scope.availabePartnersDatas[j].id == this.allowed[i]) {                
                             var temp = {};                                
                             temp.id = this.allowed[i];                
                             temp.partnerName = $scope.availabePartnersDatas[j].partnerName;
                             $scope.partnersDatas.push(temp);
                             $scope.availabePartnersDatas.splice(j, 1);                        
                         }                    
                     }            
                 }                        
             };
             
             $scope.allow = function() {                    
                for ( var i in this.restricted) {                        
                    for ( var j in $scope.partnersDatas) {                            
                        if ($scope.partnersDatas[j].id == this.restricted[i]) {                                
                            var temp = {};                                
                            temp.id = this.restricted[i];
                            temp.partnerName = $scope.partnersDatas[j].partnerName;
                            $scope.availabePartnersDatas.push(temp);
                            $scope.partnersDatas.splice(j, 1);                        
                        }                        
                    }                        
                }                    
            };
         }                    
    }
  });
  mifosX.ng.application.controller('PlanController', [
     '$scope',
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route',
     'webStorage',
     'dateFilter',
     'PaginatorService',
     mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));