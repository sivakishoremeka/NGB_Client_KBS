
(function (module) {
    mifosX.controllers = _.extend(module, {
    	CreateOrderWorkflowController: function (scope, resourceFactory, location,localStorageService,routeParams,webStorage,paginatorService,route) {
    	   
    	     scope.formData = {};
    		 scope.clientdocuments = [];
    		 scope.clientId = routeParams.clientId;
    		 var clientData = webStorage.get('clientData');

    		 
    		 resourceFactory.orderWorkflowTemplateResource.get({clientServiceId:routeParams.clientServiceId},function(data) {
    			 scope.statusDatas = data.statusDatas;
    			 scope.teamDatas = data.ticketmappingDatas;
    			 scope.isStatus = data.status;
    			 scope.status = data.status;
    			 scope.nextStatus();
    			 console.log(scope.isStatus);
    		  });
		        
    		resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId : routeParams.clientId}, function(data) {
    			scope.clientdocuments = data;
    			   webStorage.add("clientserviceId", routeParams.clientServiceId);
			});
				
    		 scope.editBill= function(){
    	        	var clientId = routeParams.clientId;
    	        	location.path("/addclientnewdocument/"+routeParams.clientId);        	
    	     };
    	        
    	       scope.cancelOrder = function(){
    	        	var clientId = routeParams.clientId;

    	        	location.path("/viewclient/id/"+clientId);        	
    	        };   
    	        
    	        scope.changeStatus=function(status){
    	        	scope.isStatus = status;
    	        
    	        }
    	        
    	       scope.nextStatus=function(){
    	    	  if(scope.status == 'DRAFT'){
    	    		  scope.status = 'Order Accepted';
    	    		  scope.assigne = 'Operations';
    	    	  }else if(scope.status == 'Order Accepted'){
    	    		  scope.status = 'Survey Completed';
    	    		  scope.assigne = 'Surveyor';
    	    	  }else if(scope.status == 'Survey Completed'){
    	    		  scope.status = 'Installation Completed';
    	    		  scope.assigne = 'Installation';
    	    	  }
    	    	  /*for(var i=0;i<scope.statusDatas.length;i++){
    	    		if(scope.statusDatas[i].mCodeValue==scope.status){
    	    			scope.formData.status=scope.statusDatas[i].mCodeValue;
    	    			console.log(scope.formData.status);
    	    		}
    	          }*/
    	    	  for(var i=0;i<scope.teamDatas.length;i++){
	  	    		if(scope.teamDatas[i].teamDescription==scope.assigne){
	  	    			scope.formData.assignedTo=scope.teamDatas[i].id;
	  	    			scope.formData.teamEmail = scope.teamDatas[i].teamEmail;
	  	    			console.log(scope.formData.assignedTo);
	  	    			console.log(scope.formData.teamEmail);
	  	    		}
    	    	  }
    	    	  scope.formData.status = scope.status;

       	       //console.log(scope.formData.status);
    	       }
    	       
    	       /*scope.nextStatus=function(){
     	    	  if(scope.status == 'DRAFT'){
     	    		  scope.status = 'Operation Review';
     	    		  scope.team = 
     	    	  }else if(scope.status == 'Operation Review'){
     	    		  scope.status = 'Order Accepted';
     	    	  }else if(scope.status == 'Order Accepted'){
     	    		  scope.status = 'Surveying';
     	    	  }else if(scope.status == 'Surveying'){
     	    		  scope.status = 'Survey Completed';
     	    	  }else if(scope.status == 'Survey Completed'){
     	    		  scope.status = 'Installation Assigned';
     	    	  }else if(scope.status == 'Installation Assigned'){
     	    		  scope.status = 'Installation Completed';
     	    	  }else if(scope.status == 'Installation Completed'){
     	    		  scope.status = 'Provisioned';
     	    	  }
     	    	  for(var i=0;i<scope.statusDatas.length;i++){
     	    		if(scope.statusDatas[i].mCodeValue==scope.status){
     	    			scope.formData.status=scope.statusDatas[i].mCodeValue;
     	    			console.log(scope.formData.status);
     	    		}
     	          }
     	       }*/
             
    	       scope.downloadFile = function (value){
   	           	if(value == "MediaAssets"){
   	           		window.open("Xls/"+value+".xlsx");
   	            }else
   	             {	 
   	               window.open("csv/"+value+".csv");
   	             }
             };
    	      
    	     
    	     scope.submit = function(){
    	    	 scope.formData.clientId = routeParams.clientId;
    	    	 scope.formData.clientServiceId = routeParams.clientServiceId;
    	    	 resourceFactory.orderWorkflowResource.save(scope.formData, function(data) {
    	    		 location.path("/viewclient/id/"+scope.formData.clientId)
    	    	 });
    	     };

    		 scope.reject = function(){

    	    	 scope.formData.clientId = routeParams.clientId;
    	    	 scope.formData.clientServiceId = routeParams.clientServiceId;
    	    	 scope.formData.status = "Reject";
    			 /*for(var i=0;i<scope.statusDatas.length;i++){
     	    		if(scope.statusDatas[i].mCodeValue=='Reject'){
     	    			scope.formData.status=scope.statusDatas[i].mCodeValue;
     	    			console.log(scope.formData.status);
     	    		}
     	          }*/
    			 resourceFactory.orderWorkflowResource.save(scope.formData, function(data) {
    	    	 });
    		 }      
    		    		
        }

    });
    mifosX.ng.application.controller('CreateOrderWorkflowController', ['$scope', 'ResourceFactory', '$location','localStorageService','$routeParams','webStorage','PaginatorService','$route', mifosX.controllers.CreateOrderWorkflowController]).run(function ($log) {
        $log.info("CreateOrderWorkflowController initialized");
    });
}(mifosX.controllers || {}));