(function(module) {
	mifosX.controllers = _.extend(module, {
		EditNewTemplateController: function(scope, resourceFactory, location, route, routeParams) {
			
			scope.columns = [];
			scope.formData = {};
			scope.templateData = {};
			scope.uomId=routeParams.id;
			
			
			
		resourceFactory.templateResource.get({templateId: routeParams.id, template: 'true'} , function(data) {
		scope.addTemplateDefinitionData();
			    scope.columns=data.templateDatas;
		        
		
				scope.formData = {
						templateName:data.templateDatas[0].templateName,
						delimited:data.templateDatas[0].delimited,
						delimiter:data.templateDatas[0].delimiter,
						numberOfFields:data.templateDatas[0].numberOfFields,
						isHeader:data.templateDatas[0].isHeader,
						headerRecordType:data.templateDatas[0].headerecordtype,
						eventRecordType:data.templateDatas[0].eventrecordtype,
					 };
				});

		  scope.addTemplateDefinitionData = function(){
			     if(scope.fieldName && scope.fieldType && scope.length && scope.identifierType){
		         	scope.templateData.fieldName = scope.fieldName;
		         	scope.templateData.fieldType = scope.fieldType;
		         	scope.templateData.length = scope.length;
		         	scope.templateData.identifierType = scope.identifierType;
		         	scope.columns.push(scope.templateData);
		        	 console.log(scope.columns);
		         }
		       };
		       
		       scope.removeDiscountPrices = function (index) {
		            scope.columns.splice(index,1);
		        };
				scope.submit = function() {  
					scope.formData.columns =new Array();
					 if (scope.columns.length > 0) {	                     
	                     for (var i in scope.columns) {
		                   scope.formData.columns.push({
										fieldName : scope.columns[i].fieldName,
										fieldType : scope.columns[i].fieldType,
										length : scope.columns[i].length,
										identifierType : scope.columns[i].identifierType,
							});
	                     };
	                   }
					   this.formData.columns = scope.formData.columns;

		            resourceFactory.templateResource.update({'templateId': routeParams.id}, scope.formData,function(data){
		            	location.path('/viewtemplatedef/' + data.resourceId);
		          });
		        };		
		}
	});
	mifosX.ng.application.controller('EditNewTemplateController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$route', 
	'$routeParams', 
	mifosX.controllers.EditNewTemplateController]).run(function($log) {
	  $log.info("EditNewTemplateController initialized");
	});	
}(mifosX.controllers || {}));