(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewTicketController: function(scope,webStorage, routeParams , route, location, resourceFactory, http,PermissionService,$rootScope,API_VERSION,TENANT) {
        scope.ticket = [];
        scope.teamusers = [];
        scope.status ;
        
        scope.PermissionService = PermissionService;
        
   /*     resourceFactory.clientResource.get({clientId: routeParams.clientId} , function(data) {
            var clientData = data;
            scope.hwSerialNumber=clientData.hwSerialNumber;
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            scope.categoryType=clientData.categoryType;
            scope.email=clientData.email;
            scope.phone=clientData.phone;
           });*/
        /*resourceFactory.ticketResource.get({id: routeParams.id,clientId: routeParams.clientId} , function(data) {      	
            scope.ticket = data; 
            scope.clientId= routeParams.clientId;
        });*/
       /* resourceFactory.ticketHistoryResource.get({id: routeParams.id} , function(data) {  
            scope.historyData = data.masterData;
            scope.problemDescription=data.problemDescription;
        });*/
        
        resourceFactory.ticketmasterResource.get({ticketId: routeParams.id} , function(data) {
        	   scope.teamusers = data; 
        	   scope.ticketId= routeParams.ticketId;
        	   for(var i=0;i<data.length;i++){
        		   if(data[i].status=='CLOSED')
        			   {
        			   scope.status='CLOSED';
        			   break;
        			   }
        	   }
   
           });
        
       /* resourceFactory.editTicketResource.get({clientId: routeParams.clientId, id: routeParams.id} , function(data) {	
            scope.formData=data;                            
			scope.statusTypes = data.statusType;
			if(data.statusCode){
				scope.formData.status = data.statusCode;
			}else{
				for(var i = 0; i < scope.statusTypes.length; i++){
                	if(scope.statusTypes[i].mCodeValue == 'Working'){
                		scope.formData.status = scope.statusTypes[i].mCodeValue;
                	}
              }
			}
			 
			scope.problemsDatas = data.problemsDatas;
			scope.priorityTypes = data.priorityType;
			scope.usersData = data.usersData;
			scope.clientId=routeParams.clientId;
			scope.ticketId=routeParams.id;
			scope.teamCode = data.teamCode;
			scope.TicketTeamMappingDatas = data.TicketTeamMappingData;
             
		});*/
        resourceFactory.ticketResourceTemplate.getForCloseTicket({templateFor: 'closeticket'}, function(data) {       	 	
        	scope.statusTypes = data;				
        	scope.clientId=routeParams.clientId;
			scope.ticketId=routeParams.id;               
        });
        
        scope.reset123 = function(){
      	   webStorage.add("callingTab", {someString: "Tickets" });
         };
        scope.setData= function(){
        	
        };
        
        scope.closeTicket= function(){
        	var ticketId = routeParams.id;
        	var clientId = routeParams.clientId;
        	location.path("/closeTicket/"+clientId+"/"+ticketId);    
        };
        scope.editTicket= function(){
        	var ticketId = routeParams.id;
        	var clientId = routeParams.clientId;
        	if(status!='CLOSED')
        	location.path("/editTickets/"+clientId+"/"+ticketId);        	
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
  mifosX.ng.application.controller('ViewTicketController', ['$scope', 'webStorage','$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService','$rootScope','API_VERSION','TENANT', mifosX.controllers.ViewTicketController]).run(function($log) {
    $log.info("ViewTicketController initialized");
  });
}(mifosX.controllers || {}));
