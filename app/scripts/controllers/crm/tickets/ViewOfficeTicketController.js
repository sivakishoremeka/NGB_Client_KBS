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
        
        
        scope.closeOfficeTicket= function(){
        	var ticketId = routeParams.id;
        	var officeId = routeParams.officeId;
			  $uibModal.open({
                templateUrl: 'CloseTicket.html',
                controller: CloseTicketController,
                resolve:{
              	  officeId : function() {
							return officeId;
						},
						ticketId:function() {
							return ticketId;
						},
					}
            });
        }
		
		var CloseTicketController = function ($scope, $uibModalInstance,officeId, ticketId) {		
          $scope.statusDatas=[];
          $scope.formData={};
          var ticketId = routeParams.id;
      	  var officeId = routeParams.officeId;
          var locationOrigin = window.location.origin;
      	var locationPathname = window.location.pathname;
          resourceFactory.ticketResourceTemplate.getForCloseTicket({templateFor: 'closeticket'}, function(data) {       	 	
      	$scope.statusDatas = data;
      	$scope.officeId=officeId;
			$scope.ticketId=ticketId;               
      });
      
      $scope.reset123 = function(){
	       	$uibModalInstance.dismiss('delete');
	    };
	        
      $scope.closeTicket = function() { 
      	this.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+$scope.officeId+"/";
          resourceFactory.closeOfficeTicketResource.update({'ticketId': $scope.ticketId},this.formData,function(data){
          	/*location.path('/viewpartner/'+scope.officeId+'/'+scope.officeId);*/
          	route.reload();
          	$uibModalInstance.dismiss('delete');
          });
         
      };
  
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
