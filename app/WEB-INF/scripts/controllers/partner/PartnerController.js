(function(module) {
	mifosX.controllers = _.extend(module, {
		PartnerController : function(scope, resourceFactory, location,
				paginatorService,routeParams,dateFilter,webStorage,$rootScope,route) {
			
			
            scope.isTreeView = false;
            var idToNodeMap = {};
            scope.sourceDatas = [];
		    scope.patnerDatas = [];
		    scope.config = {};
		    scope.allDatas=[];
		    scope.date = {};
		    scope.start={};
		    scope.end={};
		    scope.start.date = new Date();
		    var clientIdArr=[];
		    scope.formData={}
		    
            
	        scope.partnersTab = function(){
	      	   webStorage.add("callingTab", {someString: "Partners" });
	       };
	        
            scope.routeToPartner = function(id,officeId) {
				location.path('/viewpartner/' + id + '/' +officeId);
			};

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
            
            //partners
            scope.getPartners = function() {
				 scope.isTreeView = false;
				 resourceFactory.partnerResource.query(function(data) {
					 scope.partners =data;
				 });
			};
			
			
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
		   
		   
		  /* // financialtransactions 
		   
		   scope.officeFinanceTrans=[];
		   
		   scope.getfinancialtransactions = function() {
			   resourceFactory.FineTransactionResource.query(function(data) {
					 scope.financialtransactions =data;
				 });
			   
			   resourceFactory.officeFinancialTransactionResource.get({officeId:routeParams.id},function(data){
			      	  scope.officeFinanceTrans = data;
			        });
			};*/
		   
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
	        		 location.path('/partner' );
	        		 route.reload();
        		 });
		   };
	 }
	
	    
	});
	mifosX.ng.application.controller(
			'PartnerController',
			[ '$scope', 'ResourceFactory', '$location', 'PaginatorService','$routeParams',
			  'dateFilter','webStorage', '$rootScope','$route',
					mifosX.controllers.PartnerController ]).run(function($log) {
		$log.info("PartnerController initialized");
	});
}(mifosX.controllers || {}));