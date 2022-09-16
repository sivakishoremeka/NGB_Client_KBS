(function (module) {
    mifosX.controllers = _.extend(module, {
        ProfileController: function (scope, localStorageService, resourceFactory,dateFilter,paginatorService,routeParams,$uibModal,webStorage) {
            scope.userDetails = localStorageService.getFromLocalStorage('userData');
            scope.user = [];
            
            resourceFactory.userListResource.get({userId: scope.userDetails.userId}, function (data) {
                scope.user = data;
                webStorage.add("id", scope.user.id);     
                console.log(webStorage.add("id", scope.user.id));
            });
            scope.status = 'Not Authenticated';
            if (scope.userDetails.authenticated == true) {
                scope.status = 'Authenticated';
            }
            scope.updatePassword = function () {
                $uibModal.open({
                    templateUrl: 'password.html',
                    controller: UpdatePasswordCtrl,
                    resolve: {
                        userId: function () {
                            return scope.userDetails.userId;
                        }
                    }
                });
            };
            var UpdatePasswordCtrl = function ($scope, $uibModalInstance, userId) {
                $scope.save = function () {
                    resourceFactory.userListResource.update({'userId': userId}, this.formData, function (data) {
                        $uibModalInstance.close('modal');
                        if (data.resourceId == userId) {
                            scope.logout();
                        };
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
        }
    });
    mifosX.ng.application.controller('ProfileController', ['$scope', 'localStorageService','ResourceFactory','dateFilter','PaginatorService','$routeParams','$uibModal','webStorage', mifosX.controllers.ProfileController]).run(function ($log) {
        $log.info("ProfileController initialized");
    });
}(mifosX.controllers || {}));
