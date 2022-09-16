(function(module) {
	mifosX.controllers = _.extend(module, {
		TemplateDefinitionController : function(scope, resourceFactory, location, $uibModal, route,paginatorService) {
		
		scope.columns = [];
		scope.formData = {};
		scope.templateData = {};
		//scope.formData1 = {};  
		scope.identifierTypes = ["EventType","ServiceIdentifier"];
		
		scope.selectDelimited = function(Delimited){
		
		           if(Delimited=="Delimeter"){
		               scope.showDelimeter=true;
		               scope.showFixedLength= false;
		           }else if(Delimited=="FixedLength")
		               {
		               scope.showDelimeter=false;
		               scope.showFixedLength= true;
		
		           }
		       };
		       
		    
		       
		       
		       scope.addTemplateDefinitionData = function(){
			         if(scope.fieldName && scope.fieldType && scope.length && scope.identifierType){
			        	   
			                scope.columns.push({fieldName:scope.fieldName, 
			                	locale:scope.optlang.code,
			                	fieldType:scope.fieldType,
			                	length:scope.length,
			                	identifierType:scope.identifierType
			    });
			                
			                scope.fieldName = undefined;
			                scope.fieldType = undefined;
			                scope.length = undefined;
			                scope.identifierType = undefined;
	             
			         }
			       };
		     
		      
		          scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
				scope.reset123=function(){
		    		location.path('/rating');
		        };
		        scope.removeDiscountPrices = function (index) {
		            scope.columns.splice(index,1);
		        };
		        scope.submit = function() {   
		        scope.formData.locale = "en";
		        	scope.formData.columns =new Array();
	            	 if (scope.columns.length > 0) {	                     
	                     for (var i in scope.columns) {
		                   scope.formData.columns.push({
										fieldName : scope.columns[i].fieldName,
										fieldType : scope.columns[i].fieldType,
										length : scope.columns[i].length,
										identifierType : scope.columns[i].identifierType
							});
	                     };
	                   }
		            resourceFactory.templateResource.save(scope.formData,function(data){
		            	location.path('/rating');	
		          });
		        };
	
		
		}
	});
	mifosX.ng.application.controller('TemplateDefinitionController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	'PaginatorService',
	mifosX.controllers.TemplateDefinitionController ]).run(
		function($log) {
			$log.info("TemplateDefinitionController initialized");
		});
}(mifosX.controllers || {}));