(function (module) {
    mifosX.controllers = _.extend(module, {

        ViewOfficeController: function (scope, routeParams, route, location, resourceFactory,paginatorService,webStorage,$uibModal,dateFilter,$rootScope,TENANT,API_VERSION) {

            scope.charges = [];
            scope.office = [];
            scope.officeFinanceTrans = [];
            scope.agreements = [];
            scope.formData = {};
            scope.clientsData = [];
            scope.pageItems = [];
            scope.config = {};
            var clientIdArr=[];
            
            scope.dateTime = new Date().toDateString();
	        scope.start.date = new Date();
	        

		    scope.todayDate = new Date();
			var numberOfDaysToAdd = 3;
			scope.fromDate = new Date();
			scope.toDate = scope.todayDate.setDate(scope.todayDate.getDate() + numberOfDaysToAdd);
            
            var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "financial") {
					scope.FinancialTab = true;
					webStorage.remove('callingTab');
				}
			}
			
			 scope.partnersTab = function(){
		       	   webStorage.add("callingTab", {someString: "Partners" });
		     };
            
            scope.globalConfigs =  webStorage.get("global_configuration")
	        for(var i in scope.globalConfigs){
	        	if(scope.globalConfigs[i].name == "is-CRM-Enable"){
	        		scope.isCrm = scope.globalConfigs[i].enabled;break;
	        	}
	        };
            
            resourceFactory.officeResource.get({officeId: routeParams.id}, function (data) {
                scope.office = data;

				webStorage.add("partnerName", scope.office.name);
				webStorage.add("poId", scope.office.poId);
				webStorage.add("settlementPoId", scope.office.settlementPoId);
				webStorage.add("clientId", scope.office.clientId);
				webStorage.add("clientServiceId", scope.office.clientServiceId);
				webStorage.add("clientPoId", scope.office.clientPoId);
                 
            });
            
          //for agreement data
            scope.getAgreementDetails = function (){
            	
				resourceFactory.agreementResource.get({partnerId : routeParams.id}, function(data) {
					scope.agreements = data;
				});   
            }
            
          //for office finance Transactions
			scope.getfinancialtransactions = function() {
	
				resourceFactory.officeFinancialTransactionResource.get({officeId :routeParams.id}, function(data) {
					scope.officeFinanceTrans = data;
					
					
				});
				
				scope.getAllTickets = function() {
					resourceFactory.officeTicketResource.getAll({officeId : routeParams.id}, function(data) {
						scope.tickets = data;
						scope.clientId = routeParams.id;
					});
				};
				
			/*	scope.partnersTab = function() {
					
					webStorage.add("callingTab", {someString : "Partners"});
				};*/
			};

            /*resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_office'}, function (data) {
                scope.officedatatables = data;
            });*/
          //for office / partner Disbursement details 
			
			/*scope.getClients = function(){
				   scope.clients=[]; 
				   scope.clientsFetchFunction = function(offset, limit, callback) {
				    	var params = {};
				    	params.offset = offset;
				    	params.limit = limit;
				    	  	resourceFactory.lco.get({offset: offset, limit: limit} , function(data){
			    	        	scope.totalClients = data.totalFilteredRecords;
			    	        	scope.allDatas = data.pageItems;
			    	        	console.log(scope.allDatas[2].startDate);
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
				      				
			   };*/
			
			scope.getClients = function() {
			    resourceFactory.ClientLCOResource.get({officeId : routeParams.id}, function(data) {
				scope.clientsData =data.clientDatas;
				scope.clientId = routeParams.id;
			   });
		    };
		    
		    scope.getUpcomingRenewals = function(fromDate,toDate) {
		    	scope.FromDate = angular.copy(dateFilter(fromDate,'yyyy-MM-dd'));
				scope.ToDate = angular.copy(dateFilter(toDate,'yyyy-MM-dd'));
			    resourceFactory.renewalListResource.get({officeId : routeParams.id, fromDate : scope.FromDate, toDate :scope.ToDate}, function(data) {
				scope.clientsData =data.clientDatas;
				scope.clientId = routeParams.id;
			   });
		    };
		    
		    scope.getSelectDateRenewals=function(fromDate,toDate){
				scope.fromDate = angular.copy(dateFilter(fromDate,'yyyy-MM-dd'));
				scope.toDate = angular.copy(dateFilter(toDate,'yyyy-MM-dd'));
				scope.getUpcomingRenewals(scope.fromDate,scope.toDate);
				
			};

			   scope.selectAll = function(selectAll) {
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
		        		 route.reload();
		        		 location.path('/viewoffice/' + routeParams.id );
		        		 
	      		 });
			   };
			
			scope.getPartnerDisbursements = function(){
				
				 scope.patnerDisbursementData = [];
			      scope.searchData = {};
			      scope.sourceDatas = [];
			      scope.patnerDatas = [];
			        
			      scope.disbursementsFetchFunction = function(offset, limit, callback) {
			    	      	var params = {};
			    	      	params.offset = offset;
			    	      	params.limit = limit;
			    	      	scope.partnerType =	webStorage.get("partnerName");
			    	      	if(scope.partnerType && scope.partnerType != 'ALL'){
			    	      		params.partnerType = scope.partnerType;
			    	      	}
			    	    /*  	if(scope.searchData.sourceType && scope.searchData.sourceType != 'ALL'){
			    	      		params.sourceType = scope.searchData.sourceType;
			    	      	}*/
			    			resourceFactory.patnerDisbursementResource.get(params , callback);
			    	};
			      scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);
			      
			
		   };
		   
		   scope.removeSourceCategories = function(planCode){	
	        	  if(scope.planCode>=1){
	        	scope.agreements.splice(planCode,1);}
	        };
	        
	        scope.routeToticket = function(ticketid) {
				officeId = routeParams.id;
				location.path('/viewOfficeTicket/' + officeId + '/' + ticketid);
			};
	        
			
			scope.downloadFile = function(officeId) {

				/*
				 * http({ method:'PUT', url: $rootScope.hostUrl+
				 * API_VERSION
				 * +'/billmaster/'+statementId+'/print?tenantIdentifier=default',
				 * data: {} })
				 */

				window.open($rootScope.hostUrl + API_VERSION
						+ '/offices/' + officeId
						+ '/print?tenantIdentifier=' + TENANT);
			};
			 scope.downloadFiles = function (DocumentId){ 
            	 //window.open($rootScope.hostUrl+ API_VERSION +'/officeTicket/routeParams.id/documents/'+DocumentId+'/attachment?tenantIdentifier='+TENANT);
            	 window.open($rootScope.hostUrl+ API_VERSION +'/officeTicket/'+routeParams.id+'/documents/attachment/'+DocumentId+'?tenantIdentifier='+TENANT);
             };
           
			
			
			
			
	        /**
	       	 * Delete Agreement
	       	 * */
	         scope.deleteAgreement = function (id,planPoId,dealPoId,poId,settlementPoId,packageId,clientPoId,clientServicePoId,orderId){
	        	 console.log(id);
	         	scope.agreementId=id;
	          	 $uibModal.open({
	  	                templateUrl: 'deletePopupForAgreement.html',
	  	                controller: deleteAgreementController,
	  	                resolve:{

		                	  planPoId : function() {
									return planPoId;
								},
		        	  		  dealPoId:function() {
									return dealPoId;
								},
							  poId:function() {
									return poId;
								},
								settlementPoId:function() {
									return settlementPoId;
								},
								packageId:function() {
									return packageId;
								},
								clientPoId:function() {
									return clientPoId;
								},
								clientServicePoId:function() {
									return clientServicePoId;
								},
								orderId:function() {
									return orderId;
								}
	  	                	
	  	                }
	  	        });
	         };
	         var deleteAgreementController = function($scope,$uibModalInstance,planPoId,dealPoId,poId,settlementPoId,packageId,clientPoId,clientServicePoId,orderId) {
		      		$scope.formData = {};
		      		
		      		$scope.approve = function () {
		      			$scope.formData = {};
		      			$scope.formData.orderId = orderId;
		      			$scope.formData.planPoId = planPoId;
		      			$scope.formData.dealPoId = dealPoId;
		      			$scope.formData.poId = poId;
		      			$scope.formData.settlementPoId = settlementPoId;
		      			$scope.formData.orderNo = packageId;
		      			$scope.formData.disconnectReason = "payment due";
		      			$scope.formData.clientPoId = clientPoId;
		      			$scope.formData.clientServicePoId = clientServicePoId;
		      			$scope.formData.fromNGB = true;
		      			$scope.formData.dateFormat = 'dd MMMM yyyy';
		      			var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		      			$scope.formData.disconnectionDate = reqDate;
		      			$scope.formData.locale = scope.optlang.code;
		      			
		      			console.log($scope.formData);
		      			
		      			/*resourceFactory.saveOrderResource.update({'clientId': orderId},$scope.formData,function(data){
	        			  	
		        			  resourceFactory.getSingleOrderResource.get({orderId:orderId} , function(data) {
		        		            scope.orderPriceDatas= data.orderPriceData;
		        		            scope.orderHistorydata=data.orderHistory;
		        		            scope.orderData=data.orderData;
		        		            route.reload();
		        		        });
		        	            $uibModalInstance.close('delete');
		        	        },function(orderErrorData){
		        	        	 $scope.flagOrderDisconnect=false;
		        	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
		        	        });*/
		      			
		              	resourceFactory.agreementDeleteResource.remove({agreementId: orderId},$scope.formData,function(data) {
		              		console.log($scope.formData);
		                    route.reload();
			              	$uibModalInstance.dismiss('delete');
		              	});
		              	//$uibModalInstance.dismiss('delete');
		      		};
		            $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		            };
		        }
	         scope.getAllTickets = function() {
					resourceFactory.officeTicketResource.getAll({officeId : routeParams.id}, function(data) {
						scope.tickets = data;
						scope.clientId = routeParams.id;
					});
				};
				scope.routeToEditTicket=function(officeId,ticketId){
					console.log(officeId+"_"+ticketId);
					location.path('/editOfficeTicket/' + officeId + '/' + ticketId);
				}
				scope.callCloseTicket= function(officeId, ticketId){
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
		    
		    scope.cancelPayment = function(id,receiptNo,officePoid) {
				$uibModal.open({
					templateUrl : 'cancelpayment.html',
					controller : CancelPayment,
					resolve : {
						getPaymentId : function() {
							return id;
						},
						receiptNo : function() {
							return receiptNo;
							console.log(receiptNo);
						},
						officePoid : function() {
							return officePoid;
							console.log(officePoid);
					    }
					}
				});
			};
			var CancelPayment = function($scope,$uibModalInstance, getPaymentId,receiptNo,officePoid) {
				$scope.accept = function(cancelRemark) {
					$scope.flagcancelpayment = true;
					var paymentId = getPaymentId;
				    scope.formData.cancelRemark = cancelRemark;
					scope.formData.receiptNo =receiptNo;
					scope.formData.officePoid = officePoid;
					console.log(receiptNo);
					resourceFactory.cancelOfficePaymentResource.update({'paymentId' : paymentId},scope.formData,function(data) {
						$uibModalInstance.close('delete');
					/*	scope.getAllFineTransactions();*/
					},function(errData) {
						$scope.flagcancelpayment = false;
					});
				};
				$scope.reject = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};

				
            scope.dataTableChange = function (officedatatable) {
                resourceFactory.DataTablesResource.getTableDetails({datatablename: officedatatable.registeredTableName,
                    entityId: routeParams.id, genericResultSet: 'true'}, function (data) {
                    scope.datatabledetails = data;
                    scope.datatabledetails.isData = data.data.length > 0 ? true : false;
                    scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;
                    scope.showDataTableAddButton = !scope.datatabledetails.isData || scope.datatabledetails.isMultirow;
                    scope.showDataTableEditButton = scope.datatabledetails.isData && !scope.datatabledetails.isMultirow;
                    scope.singleRow = [];
                    for (var i in data.columnHeaders) {
                        if (scope.datatabledetails.columnHeaders[i].columnCode) {
                            for (var j in scope.datatabledetails.columnHeaders[i].columnValues) {
                                for (var k in data.data) {
                                    if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
                                        data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
                                    }
                                }
                            }
                        }
                    }
                    if (scope.datatabledetails.isData) {
                        for (var i in data.columnHeaders) {
                            if (!scope.datatabledetails.isMultirow) {
                                var row = {};
                                row.key = data.columnHeaders[i].columnName;
                                row.value = data.data[0].row[i];
                                scope.singleRow.push(row);
                            }
                        }
                    }
                });
            };
            
            scope.deleteAll = function (apptableName, entityId) {
                resourceFactory.DataTablesResource.delete({datatablename: apptableName, entityId: entityId, genericResultSet: 'true'}, {}, function (data) {
                    route.reload();
                });
            };paginatorService

            scope.viewDataTable = function (registeredTableName, data){
                if (scope.datatabledetails.isMultirow) {
                    location.path("/viewdatatableentry/"+registeredTableName+"/"+scope.office.id+"/"+data.row[0]);
                }else{
                    location.path("/viewsingledatatableentry/"+registeredTableName+"/"+scope.office.id);
                }
            };
        }

    });

    mifosX.ng.application.controller('ViewOfficeController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory','PaginatorService','webStorage','$uibModal','dateFilter','$rootScope','TENANT','API_VERSION',  mifosX.controllers.ViewOfficeController]).run(function ($log) {
   
        $log.info("ViewOfficeController initialized");
    });
}(mifosX.controllers || {}));