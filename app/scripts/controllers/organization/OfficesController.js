(function (module) {
    mifosX.controllers = _.extend(module, {
        OfficesController: function (scope, resourceFactory, location, $uibModal,paginatorService,route, webStorage) {
        	
            scope.offices = [];
            scope.officeDatas = [];
            scope.isTreeView = false;
            var idToNodeMap = {};
            scope.config = {};
            var clientIdArr=[];
            scope.formData={}
            scope.pageItems = [];
           /* scope.sourceDatas = [];
		    scope.patnerDatas = [];*/
            
            var officeData=webStorage.get('officeData');
	        scope.officeType=officeData.officeType;
	        scope.officeId=officeData.officeId;
	        console.log(scope.officeType);
	        if(scope.officeType == "LCO"){
	        	location.path('/viewoffice/' + scope.officeId);
	        }


            scope.routeTo = function (id) {
                location.path('/viewoffice/' + id);
            };
            
            
           /*scope.routeToPartner = function(id,officeId) {
				location.path('/viewpartner/' + id + '/' +officeId);
			};*/

            /*if (!scope.searchCriteria.offices) {
                scope.searchCriteria.offices = null;
                scope.saveSC();
            }
            scope.filterText = scope.searchCriteria.offices || '';

            scope.onFilter = function () {
                scope.searchCriteria.offices = scope.filterText;
                scope.saveSC();
            };*/
            
            scope.onFilter = function(){
            	scope.formData.search = scope.filterText;
            	scope.officeDatas = paginatorService.paginate(scope.officesFetchFunction, 14);
            }

            scope.deepCopy = function (obj) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    var out = [], i = 0, len = obj.length;
                    for (; i < len; i++) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                if (typeof obj === 'object') {
                    var out = {}, i;
                    for (i in obj) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                return obj;
            }
            
            scope.officesFetchFunction = function(offset, limit, callback) {
				  resourceFactory.officesResource.get({offset: offset, limit: limit, sqlSearch: scope.formData.search}, function(data) {
					  	scope.totalpropeties = data.totalFilteredRecords;
			        	scope.allDatas = data.pageItems;
			        	if(scope.totalpropeties%15 == 0)	
			        		scope.totalPages = scope.totalpropeties/15;
			        	else
			        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
			        	callback(data);
			        });
			  };
			  
				  scope.officeDatas = paginatorService.paginate(scope.officesFetchFunction, 14);
			
			 
            //partners
            scope.getTree = function() {
            resourceFactory.officeResource.getAllOffices(function (data) {
                scope.offices = scope.deepCopy(data);
                for (var i in data) {
                    data[i].children = [];
                    idToNodeMap[data[i].id] = data[i];
                }
                function sortByParentId(a, b) {
                    return a.parentId - b.parentId;
                }

                data.sort(sortByParentId);

                var root = [];
                for (var i = 0; i < data.length; i++) {
                    var currentObj = data[i];
                    if (currentObj.children) {
                        currentObj.collapsed = "true";
                    }
                    if (typeof currentObj.parentId === "undefined") {
                        root.push(currentObj);
                    } else {
                        parentNode = idToNodeMap[currentObj.parentId];
                        parentNode.children.push(currentObj);
                    }
                }
                scope.treedata = root;
            });
            };
            
           
            /*scope.selectAll = function(selectAll) {
		        scope.active = selectAll;
		        if(selectAll == true) {
		        	
		        	for(var i in scope.allDatas) {
		        		
		        		clientIdArr.push(scope.allDatas[i]);
		            }
		        } else {
		          for(var i in scope.allDatas) {
		            clientIdArray = _.without(clientIdArr,scope.allDatas[i]);
		           }
		        }
		        console.log(clientIdArr);
		   }
		
		   scope.clientIdArr = [];
		   scope.clientSelected = function(client, active) {
		        if(active == true) {
		        	clientIdArr.push(client);
		        } else {
		        	clientIdArr= _.without(clientIdArr,client);
		        }
		        console.log(clientIdArr);
		      };
            
            scope.RenewalSubmit = function(){
		    	  scope.formData.dateFormat = "dd MMMM yyyy";
		    	  for(var i in clientIdArr){
		    		  clientIdArr[i].startDate=dateFilter(new Date(clientIdArr[i].startDate), scope.formData.dateFormat);
		    		  console.log( clientIdArr[i].startDate);
		    		  clientIdArr[i].endDate=dateFilter(new Date(clientIdArr[i].endDate), scope.formData.dateFormat);
		    	  }
		    	  scope.formData.lco=clientIdArr;
		    	  scope.formData.locale=scope.optlang.code;
		    	 
	        	 resourceFactory.lcorenewal.update(scope.formData, function(data) {
	        		 location.path('/offices' );
	        		 route.reload();
      		 });
		   };*/
            
            
          //partners disbursements
			scope.getPartnerDisbursements = function(){
			    scope.patnerDisbursementData = [];
		        scope.searchData = {};
			    scope.disbursementsFetchFunction = function(offset, limit, callback) {
			    	var params = {};
			    	params.offset = offset;
			    	params.limit = limit;
		    	      	if(scope.searchData.partnerType && scope.searchData.partnerType != 'ALL'){
		    	      		params.partnerType = scope.searchData.partnerType;
		    	      	}
		    	      	if(scope.searchData.sourceType && scope.searchData.sourceType != 'ALL'){
		    	      		params.sourceType = scope.searchData.sourceType;
		    	      	}
		    			resourceFactory.patnerDisbursementResource.get(params , callback);
			    };
			    scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);
			      scope.totalSource = [];
			      scope.totalPartners = [];
			      resourceFactory.patnerDisbursementTemplateResource.get(function(data) {
			    	  scope.totalSource.push({id:0,mCodeValue : "ALL"});
			    	  for(var i in data.sourceData) scope.totalSource.push(data.sourceData[i]);
			    	  scope.sourceDatas = scope.totalSource;
			    	  scope.totalPartners.push({id:0,partnerName : "ALL"});
			    	  for(var i in data.patnerData) scope.totalPartners.push(data.patnerData[i]);
			    	  scope.patnerDatas = scope.totalPartners;
			    	  	
				    });
			      scope.search = function(){
						scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);
			      };
			      
			      scope.clearFilters = function () {
			          scope.searchData.sourceType = null;
			          scope.searchData.partnerType = nullMM;
			          document.getElementById('sourceDatas_chosen').childNodes[0].childNodes[0].innerHTML = "---Source Type---";
			          document.getElementById('patnerDatas_chosen').childNodes[0].childNodes[0].innerHTML = "---Partner Type---";
			      };
			      				
		   };
		   scope.getClients = function(){
			   scope.clients=[]; 
			   scope.clientsFetchFunction = function(offset, limit, callback) {
			    	var params = {};
			    	params.offset = offset;
			    	params.limit = limit;
			    	  	resourceFactory.lco.get({offset: offset, limit: limit} , function(data){
		    	        	scope.totalClients = data.totalFilteredRecords;
		    	        	scope.allDatas = data.pageItems;
		    	        	/*console.log(scope.allDatas[2].startDate);*/
		    	        	if(scope.totalClients%25 == 0)	
		    	        		scope.totalPages = scope.totalClients/25;
		    	        	else
		    	        		scope.totalPages = Math.floor(scope.totalClients/25)+1;
		    	        	
		    	        	if(scope.config.password == 'true'){
		    	        		passwordSetToStar();
		    	        	}
		    	        	callback(data);
		    	        });
			    };
			    scope.clientsData = paginatorService.paginate(scope.clientsFetchFunction, 24);
			      				
		   };
		   scope.creditPopup = function (officeId){
			   console.log(officeId);
           $uibModal.open({
                   templateUrl: 'credit.html',
                   controller: creditCtrl,
                   resolve:{
                	   officeId : function() {
							return officeId;
						}
                   }
               });
           };
		   
           var creditCtrl = function ($scope, $uibModalInstance, officeId) {
           	$scope.errorDetails = [];
           	$scope.errorStatus = [];
           
           	$scope.formData={}
           	$scope.formData.locale = "en";
           	$scope.formData.officeId = scope.officeId;
               $scope.cancel = function () {
                   $uibModalInstance.dismiss('cancel');
               };
               
               
               $scope.credit = function () {
					console.log("succes");
					
					resourceFactory.creditResource.update({'officeId': officeId},$scope.formData, function(data) {
						 
						$uibModalInstance.dismiss('save');
					
					});
				}	
           };
        }
    });
    mifosX.ng.application.controller('OfficesController', ['$scope', 
                                                           'ResourceFactory', 
                                                           '$location',
                                                           '$uibModal',
                                                           'PaginatorService','$route', 'webStorage', mifosX.controllers.OfficesController]).run(function ($log) {
        $log.info("OfficesController initialized");
    });
}(mifosX.controllers || {}));