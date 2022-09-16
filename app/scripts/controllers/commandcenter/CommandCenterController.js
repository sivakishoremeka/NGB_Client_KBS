(function(module) {
  mifosX.controllers = _.extend(module, {
      CommandCenterController: function(scope, resourceFactory,location,route, uibModal, routeParams,paginatorService, PermissionService) {
          scope.offices = [];
          scope.officeTypes = [];
          scope.provisioning = [];
          scope.groupbyfingerprints=[];

          scope.formData = {};
          scope.commandData=[];
          scope.PermissionService = PermissionService;


          resourceFactory.orderCommandCenterTemplateResource.get({} , function(data) {
              scope.offices = angular.copy(data.officeData);
              scope.offices.push({
                    id:0,
                    name:"All"
                });
              scope.provisioning = data.provisioningSystems;
              scope.officeId = 0;
          });
       // on focusin on input field show the respective note
         	scope.focusFieldFun = function(noteMsg){
         		scope.showNote = noteMsg;
         	}
        	// on focus out on input field hide the respective note
           	scope.onBlurField = function(){
           		console.log("onBlurField");
           		scope.showNote = '';
           	}
         	
          scope.officeChange = function(officeId){
        	  console.log(officeId+"_Hello");
        	  scope.officeId= officeId;
          }
          scope.commandCenter=function(id){
                 resourceFactory.commandCenterResource.get({'commandId' : id},function(data) {
                         scope.commandParameters = angular.copy(data.commandParameters);
                         for(var i in scope.commandParameters){
                             if(scope.commandParameters[i].paramType != "Combo"){
                                 scope.commandParameters[i].commandValue = scope.commandParameters[i].paramDefault;
                             }
                         }
                         scope.commandParameter = angular.copy(data);
                         for(var i in scope.commandParameters){
                             if(scope.commandParameters[i].paramType == "Combo"){
                               scope.paramValuesData = scope.commandParameters[i].paramValues;
                               console.log($scope.paramValuesData);
                             }
                         }
                });
             };
             
             
          scope.provisioningSystemchangefun=function(provisioningSystem){
        	 
        	  scope.formData.provisioningSystem = provisioningSystem.id;
        	  scope.formData.isGroupSupported = provisioningSystem.isGroupSupported
              resourceFactory.provisioningCommandsResource.get({'provisioningSystemId' : scope.formData.provisioningSystem},function(data) {
            	  scope.array = angular.copy(data);
            	  for(var i in scope.array){
            		  if(PermissionService.showMenu('READ_FINGERPRINT')){
            			  scope.commandData.push(scope.array[i]);
            		  }
            		  else{
            			  if(data[i].commandName!="Fingerprint"){
            			  scope.commandData.push(scope.array[i]);
            			  }
            		  }
            	  }
            	  
              });
          };
      
          scope.groupbyfingerprintFetchFunction = function(offset, limit, callback) {
        	  resourceFactory.groupbyfingerprintResource.get({offset: offset, limit: limit} , function(data){;
        	/*var solution = data.command_as_json.JSON.stringfy(requestType);*/
        	/*  var solution = data.command_as_json.requestMessage[1].requestType;*/

        		callback(data);
        	  });
  	    };
  	    
  	    scope.getRequestType=  function(reqJson){
  	    	return JSON.parse(reqJson).requestType
  	    }
    
  	  /*scope.getHistory = function(){
          scope.groupbyfingerprints = paginatorService.paginate(scope.groupbyfingerprintFetchFunction, 14);
		 };*/
		 
         scope.groupbyfingerprints = paginatorService.paginate(scope.groupbyfingerprintFetchFunction, 14);

          
             scope.submit = function() {
            	  scope.formData.officeId = scope.officeId; 
               scope.formData.requestMessage = [];
                 scope.paramDetailsInfo = [];
                 scope.groupInfo = [];
                 for(var i in scope.commandData){
                     if(scope.formData.commandId == scope.commandData[i].id){
                        scope.formData.requestType = scope.commandData[i].commandName;
                        scope.formData.provisioningSystem = scope.commandData[i].provisioningSystem;break;
                     }
                    
                }
                for(var i in scope.commandParameters){
                    if(scope.commandParameters[i].paramType == "Date"){
                        scope.commandParameters[i].commandValue = dateFilter(scope.commandParameters[i].commandValue,'dd/MM/yyyy');
                    }
                    
                    var commandParamName = scope.commandParameters[i].commandParam;
                    scope.paramDetailsInfo
                        .push({
                            [commandParamName]: scope.commandParameters[i].commandValue
                        });
                 }
                scope.groupInfo
                .push({
                    officeId: scope.officeId
                });
                scope.formData.type = 'group';
                scope.formData.requestMessage.push({groupInfo:scope.groupInfo});
                scope.formData.requestMessage.push({paramDetailsInfo:scope.paramDetailsInfo});
                 delete scope.formData.commandId;
                resourceFactory.osdResource.save(scope.formData, function(data) {
                      location.path('/commandcenter');
              });
            };
       
          
      }
  });
  mifosX.ng.application.controller('CommandCenterController', [
     '$scope',
     'ResourceFactory',
     '$location',
     '$route',
     '$uibModal',
     '$routeParams',
     'PaginatorService',
     'PermissionService',
     mifosX.controllers.CommandCenterController]).run(function($log) {
    $log.info("CommandCenterController initialized");
  });
}(mifosX.controllers || {}));