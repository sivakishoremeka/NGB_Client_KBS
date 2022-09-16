(function(module) {
	mifosX.controllers = _.extend(module, {
		SubcategoryController : function(scope, resourceFactory,paginatorService,$uibModal,location,route) {
			scope.subcategories = [];

			
			scope.subcategoryFetchFunction = function(offset, limit, callback) {
				  resourceFactory.subcategoryResource.get({offset: offset, limit: limit}, function(data) {
					  	scope.totalpropeties = data.totalFilteredRecords;
			        	scope.allDatas = data.pageItems;
			        	
			        	if(scope.totalpropeties%15 == 0)	
			        		scope.totalPages = scope.totalpropeties/15;
			        	else
			        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
			        	callback(data);
			        });
			  };
			  scope.subcategories = paginatorService.paginate(scope.subcategoryFetchFunction, 14);

			 
		          
		         
			  /**
		      	 * Delete Personal 
		      	 * */
		       /* scope.deletePersonal = function (id){
		        	scope.personalId=id;
		        	$uibModal.open({
		 	                templateUrl: 'personal.html',
		 	                controller: approve,
		 	                resolve:{}
		 	        });
		         };*/
		         
		     	/*function  approve($scope, $uibModalInstance) {
		     		$scope.approve = function () {
		             	resourceFactory.personalResource.remove({personalId: scope.personalId} , {} , function() {
		                   route.reload();
		             });
		             	$uibModalInstance.dismiss('delete');
		          };
		             $scope.cancel = function () {
		            	 $uibModalInstance.dismiss('cancel');
		           };
		         } */  
			  
		}
	});
	mifosX.ng.application.controller(
			'SubcategoryController',
			[ '$scope', 'ResourceFactory','PaginatorService','$uibModal','$location', '$route',
					mifosX.controllers.SubcategoryController ]).run(
			function($log) {
				$log.info("SubcategoryController initialized");
			});
}(mifosX.controllers || {}));