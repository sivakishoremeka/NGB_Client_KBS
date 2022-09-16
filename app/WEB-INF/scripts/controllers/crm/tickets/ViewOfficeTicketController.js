(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewOfficeTicketController: function(scope,webStorage, routeParams , route, location, resourceFactory, http,PermissionService,$rootScope,API_VERSION,TENANT,$uibModal) {
        scope.officeTickets = [];
        scope.officeId = routeParams.officeId;
        scope.ticketId = routeParams.id;
        
        scope.PermissionService = PermissionService;
        
        resourceFactory.editSingleOfficeTicketResource.get({officeId: routeParams.officeId,ticketId: routeParams.id} , function(data) {
        	   scope.officeTickets = data; 
           });
        
        scope.reset123 = function() {
			officeId = routeParams.officeId;
			location.path('/viewoffice/' + officeId );
		};
        
        
        scope.editOfficeTicket= function(){
        	var ticketId = routeParams.id;
        	var officeId = routeParams.officeId;
        	if(status!='CLOSED')
        	location.path("/editOfficeTicket/"+officeId+"/"+ticketId);        	
        };
        
        scope.downloadDocument = function(id) {
        	window.open($rootScope.hostUrl + API_VERSION + '/tickets/' + id + '/print' + '?tenantIdentifier='+TENANT);
        };
        
        scope.deletemessage = function (){
            resourceFactory.messageSaveResource.delete({messageId: routeParams.id} , {} , function(data) {
                  location.path('/tickets/'+routeParams.clientId);
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewOfficeTicketController', ['$scope', 'webStorage','$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService','$rootScope','API_VERSION','TENANT','$uibModal', mifosX.controllers.ViewOfficeTicketController]).run(function($log) {
    $log.info("ViewOfficeTicketController initialized");
  });
}(mifosX.controllers || {}));
