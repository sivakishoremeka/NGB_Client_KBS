(function (module) {
    mifosX.controllers = _.extend(module, {
    	ClientNewDocumentController: function (scope, location, http, routeParams, API_VERSION, Upload, $rootScope,webStorage) {
            scope.clientId = routeParams.clientId;
            scope.onFileSelect = function (files) {
                scope.formData.file = files[0];
            };
            scope.globalConfigs =  webStorage.get("clientserviceId")

            scope.submit = function () {
                Upload.upload({
                    url: $rootScope.hostUrl + API_VERSION + '/clients/' + scope.clientId + '/documents',
                    data: { name : scope.formData.name, description : scope.formData.description, file: scope.formData.file},
                }).then(function (data) {
                        // to fix IE not refreshing the model
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                        location.path('/createorderworkflow/'+scope.clientId+'/'+ scope.globalConfigs);
                    });
            };
        }
    });
    mifosX.ng.application.controller('ClientNewDocumentController', ['$scope', '$location', '$http', '$routeParams', 'API_VERSION', 'Upload', '$rootScope', 'webStorage', mifosX.controllers.ClientNewDocumentController]).run(function ($log) {
        $log.info("ClientNewDocumentController initialized");
    });
}(mifosX.controllers || {}));