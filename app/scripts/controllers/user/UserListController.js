(function(module) {
  mifosX.controllers = _.extend(module, {
    UserListController: function(scope,route,resourceFactory,location,$uibModal,PermissionService,paginatorService) {
    	scope.users = [];
        scope.formData = {};
        scope.pageItems = [];
        scope.PermissionService=PermissionService;
        
        	/*resourceFactory.userListResource.getAllUsers(function(data) {
        		scope.users = data;
        	});*/
        	
        	scope.onFilter = function(){
            	scope.formData.search = scope.filterText;
            	scope.users = paginatorService.paginate(scope.usersFetchFunction, 14);            	
            };
            
            scope.usersFetchFunction = function(offset, limit, callback) {
            	resourceFactory.userListResource.getAllUsers({offset: offset, limit: limit, sqlSearch: scope.formData.search}, function(data) {
    				  	scope.totalpropeties = data.totalFilteredRecords;
    		        	scope.allDatas = data.pageItems;
    		        	if(scope.totalpropeties%15 == 0)	
    		        		scope.totalPages = scope.totalpropeties/15;
    		        	else
    		        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
    		        	callback(data);
    		        });
    		  };
    		  
    	      scope.users = paginatorService.paginate(scope.usersFetchFunction, 14);
        	
        	 scope.open = function (userId) {
        		 scope.userId=userId;
                 $uibModal.open({
                     templateUrl: 'password.html',
                     controller: ModalInstanceCtrl
                 });
             };
             scope.deleteuser = function (userId){
            	 scope.userId=userId;
                 $uibModal.open({
                     templateUrl: 'deleteuser.html',
                     controller: UserDeleteCtrl
                 });
             };
             
             var ModalInstanceCtrl = function ($scope, $uibModalInstance) {
                 $scope.save = function (staffId) {
                     resourceFactory.userListResource.update({'userId': scope.userId},this.formData,function(data){
                         route.reload();
                     });
                     $uibModalInstance.close('activate');
                 };
                 $scope.cancel = function () {
                     $uibModalInstance.dismiss('cancel');
                 };
             };

             var UserDeleteCtrl = function ($scope, $uibModalInstance) {
                 $scope.delete = function () {
                     resourceFactory.userListResource.delete({userId:scope.userId} , {} , function(data) {
                         location.path('/users');
                         // added dummy request param because Content-Type header gets removed
                         // if the request does not contain any data (a request body)
                     });
                     $uibModalInstance.close('delete');
                 };
                 $scope.cancel = function () {
                     $uibModalInstance.dismiss('cancel');
                 };
             };
    
        scope.routeTo = function(id){
        	location.path('/viewuser/'+ id);
          };
        
    }
  
  });
  mifosX.ng.application.controller('UserListController', ['$scope', '$route','ResourceFactory','$location','$uibModal','PermissionService','PaginatorService', mifosX.controllers.UserListController]).run(function($log) {
    $log.info("UserListController initialized");
  });
}(mifosX.controllers || {}));
