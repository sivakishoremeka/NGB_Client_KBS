	googlekeycontroller = function(scope,RequestSender,authenticationService){
		/*scope.googlekey="896577405037-2lgbh5lg6rk8cjbrpkk0cl704ju860da.apps.googleusercontent.com";*/
		console.log("ram");	
		authenticationService.authenticateWithUsernamePassword(function(data){
			var configurationDatas = [];
		 RequestSender.configurationResource.get({tenant:selfcareModels.tenantId},function(data){
			 console.log(JSON.stringify(data));
			 configurationDatas = data.globalConfiguration;
			 for(var i in configurationDatas){
				 if(configurationDatas[i].name=='googleclientid'){
					 scope.googlekey = configurationDatas[i].value;
				 }
			 }
		 });
		
		});
		
		};
	selfcareApp.controller('googlekeycontroller', ['$scope',
	                                               'RequestSender',
	                                               'AuthenticationService',
		                                           googlekeycontroller]);
	
	
		