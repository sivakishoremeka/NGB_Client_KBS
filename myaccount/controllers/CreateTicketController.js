  CreateTicketController = function(scope, RequestSender, location, dateFilter,rootScope,http,API_VERSION,$upload) {
            
            
            
             scope.start = {date:new Date()};
             scope.minDate= scope.start.date;
             scope.formData={};
             scope.first = {};
             scope.dateTime = new Date().toString().replace("GMT+0530 (IST)","").trim();
             
             //the start.date saves the date in NBG db
             scope.start.date = new Date();
             scope.minDate= scope.start.date;
             
             $('#timepicker1').timepicker({
                    showInputs:false,
                    showMeridian:false
              });
            
             scope.formData={};       
             if(rootScope.selfcare_sessionData){
                 scope.clientId = rootScope.selfcare_sessionData.clientId;
             }
            
               RequestSender.ticketResourceTemplate.get(function(data){
                   
                   scope.date = data.ticketDate;
                   scope.priorityTypes=data.priorityType;
                   for(var i=0;i<scope.priorityTypes.length;i++){
                       
                       if(scope.priorityTypes[i].value=='MEDIUM'){
                           scope.formData.priority=scope.priorityTypes[i].value;
                       }
                   }
                   scope.problemsDatas=data.problemsDatas;
                   for(var i=0;i<scope.problemsDatas.length;i++){
                       
                       if(scope.problemsDatas[i].mCodeValue=='SelfCare Problems'){
                           scope.formData.problemCode=scope.problemsDatas[i].id;
                           scope.getSubCategory(scope.problemsDatas[i].id)
                       }
                   }
                   scope.usersDatas=data.usersData;
                   scope.sourceData=data.sourceData;
                   for(var i=0;i<scope.sourceData.length;i++){
                       
                       if(scope.sourceData[i].mCodeValue=='Phone'){
                           scope.formData.sourceOfTicket=scope.sourceData[i].mCodeValue;
                       }
                   }
                   scope.ticketmapping=data.TicketTeamMappingData;
                   for(var i=0;i<scope.ticketmapping.length;i++){
                       
                       if(scope.ticketmapping[i].teamCode=='selfcare'){
                           scope.formData.teamCode=scope.ticketmapping[i].id;
                           scope.getTeamuser(scope.formData.teamCode);
                       }
                   }
                   console.log(scope.formData);
               });
              
             scope.onFileSelect = function($files) {
                    scope.file = $files[0];
                  };
                        
                  scope.getTeamuser=function(query) {
                    scope.teamUsers=[];
                    return http.get(rootScope.hostUrl+API_VERSION+'/tickets/teamusers',{
                        params:{
                            teamusers:query
                        }
                    }).then(function(result){
                        scope.NGBTeamUsers=result.data.teamUsers;
                        for(var i in scope.NGBTeamUsers) {
                            if(scope.NGBTeamUsers[i].username=="admin"){
                                scope.formData.teamUserId=scope.NGBTeamUsers[i].id;
                                scope.formData.assignedTo = scope.NGBTeamUsers[i].userId;
                            }
                        }
                    });
                };
   
                scope.getSubCategory=function(query) {
                    return http.get(rootScope.hostUrl+API_VERSION+'/tickets/subcategory',{
                        params:{
                            category:query
                        }
                    }).then(function(result){
                        for(var i in result.data.subCategory){
                            if(result.data.subCategory[i].subCategory=="selfcare1"){
                                scope.formData.subCategory = result.data.subCategory[i].subCategory;
                            }
                         }

                        return scope.subCategory;
                    });
                };

            scope.submit = function() {
/*                scope.first.time=$('#timepicker1').val();
                if(scope.first.date==null||scope.first.time==''){
                    delete scope.formData.dueTime;
                }else{
                    scope.formData.dueTime = dateFilter(scope.first.date,'yyyy-MM-dd')+" "+$('#timepicker1').val()+':00';
                }
                
                scope.formData.ticketDate = dateFilter(scope.start.date,'dd MMMM yyyy');
                scope.formData.dateFormat = 'dd MMMM yyyy';
                scope.formData.ticketTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
                scope.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId;
                
                        scope.filedata = {};
                        scope.filedata.assignedTo=scope.formData.assignedTo;
                        scope.filedata.comments=scope.formData.comments;
                        scope.filedata.status=scope.formData.status;
                        scope.filedata.priority = scope.formData.priority;
                        scope.filedata.problemCode = scope.formData.problemCode;
                        scope.filedata.description=scope.formData.description;
                        scope.filedata.dateFormat = scope.formData.dateFormat;
                        scope.filedata.dueTime = scope.formData.dueTime;
                        scope.filedata.locale = rootScope.localeLangCode;
                        scope.filedata.priority = scope.formData.priority;
                        scope.filedata.sourceOfTicket = scope.formData.sourceOfTicket;
                        scope.filedata.ticketDate = dateFilter(scope.start.date,'dd MMMM yyyy');
                        scope.filedata.ticketTime = scope.formData.ticketTime;
                        scope.filedata.ticketURL = scope.formData.ticketURL;
                        
                      $upload.upload({
                          url: rootScope.hostUrl+ API_VERSION +'/tickets/'+scope.clientId,
                          data: scope.filedata,
                          file: scope.file
                        }).then(function(data) {
                            if (!scope.$$phase) {
                                scope.$apply();
                              }
                            location.path('/tickets');
                        });
*/                      
                      
                      
                     scope.formData.locale = "en";
                       scope.first.time=$('#timepicker1').val();
                       var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
                       if(scope.first.date==null||scope.first.time==''){
                           delete scope.formData.dueTime;
                       }else{
                         scope.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
                       }
                      
                      var ticketGeneratedURL = locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId;
                     var ticketGeneratedTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
                      var ticketGenerateDate = dateFilter(scope.start.date,'dd MMMM yyyy');

                      scope.formData.dateFormat = 'dd MMMM yyyy';
                      scope.formData.ticketDate = ticketGenerateDate;
                     scope.formData.ticketURL = ticketGeneratedURL;
                     scope.formData.ticketTime = ticketGeneratedTime;
                     
                     RequestSender.ticketResource.save({'clientId':scope.clientId},scope.formData,function(data){
                         if (scope.file) {
                             Upload.upload({
                               url: $rootScope.hostUrl+ API_VERSION +'/tickets/'+scope.clientId,
                               data: {},
                               file: scope.file
                             }).then(function(data) {
                                   file: scope.file
                                     if (!scope.$$phase) {
                                         scope.$apply();
                                       }
                                     location.path('/tickets');
                                 });
                           } else{
                               location.path('/tickets');
                              }
                     },function(errors) {
                         if(errors.data.errors!=null){
                             scope.errorDetails = [{code : errors.data.errors[0].userMessageGlobalisationCode}];
                           }else{
                               scope.errorDetails = [{code : errors.data.userMessageGlobalisationCode}];
                           }
                       });

                    };
                    
    };

selfcareApp.controller('CreateTicketController', ['$scope',
                                                  'RequestSender',
                                                  '$location',
                                                  'dateFilter',
                                                  '$rootScope',
                                                  '$http',
                                                  'API_VERSION',
                                                  '$upload',
                                                  CreateTicketController]);