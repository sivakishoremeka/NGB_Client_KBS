(function(module) {
  mifosX.controllers = _.extend(module, {
  CancelProspectsController: function(scope, resourceFactory, location, routeParams) {

  scope.statusRemarkDatas = [];
  scope.prospectsData={};
  scope.statusRemarkJson={};
  resourceFactory.prospectCancelResource.getProspects({prospectId : routeParams.id}, function(data) {
        //alert(routeParams.id);
            scope.statusRemarkDatas = data.statusRemarkData;
            scope.prospectsData.id=routeParams.id;
            scope.formData = {
           
            };  
        });
 
  scope.submit = function() {
      
        scope.statusRemarkJson.statusRemark=scope.formData.statusRemark;
        console.log("status Remark is "+scope.statusRemarkJson.statusRemark);
        resourceFactory.prospectResource.delete({prospectId: routeParams.id,
        statusRemark:scope.statusRemarkJson.statusRemark},function(data){
        location.path('/leads');
          });
        };

       }
  });
      mifosX.ng.application.controller('CancelProspectsController', [
        '$scope',
        'ResourceFactory',
        '$location',
        '$routeParams',
        mifosX.controllers.CancelProspectsController]).run(function($log) {
        $log.info("CancelProspectsController initialized");
  });
}(mifosX.controllers || {}));