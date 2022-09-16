SignInFormController = function(scope,localStorageService,RequestSender,authenticationService,rootScope,location,SessionManager,
        $http, $window) {
         
          //set the default values
          scope.loginCredentials = {};

        //set the default values
          scope.loginCredentials = {};
       
          scope.isOTP=false;
          scope.isSignUp = false;
          scope.resendOTP=false;
          $http.get('config/UIconfig.json').success(function(data) {
              scope.login = data.login
          });
         
          scope.LoginProcess = function(name, email, authToken){

              if(scope.loginCredentials.username==null){
                  scope.loginCredentials.name = name;
                  scope.loginCredentials.username = email;
                 
                  scope.loginCredentials.authToken = authToken;
              }
                           

              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              if(scope.generatedKey!= undefined){
            	  for (var i = 0; i < 27; i++)
                      text += possible.charAt(Math.floor(Math.random() * possible.length));
                  scope.loginCredentials.returnUrl = "/active"+"/"+scope.loginCredentials.username+"/"+ text;
                  scope.loginCredentials.generatedKey = text;
           
              }else{
                  scope.loginCredentials.returnUrl = "/active"+"/"+scope.loginCredentials.username+"/"+ scope.generatedKey;
                  scope.loginCredentials.generatedKey = scope.generatedKey;
              }
              
             
              localStorageService.add("ClientData",scope.loginCredentials);
             
              scope.loginAction();
          }
         
          
          //login functionality
          scope.loginAction = function() {
                     
              rootScope.signupErrorMsgs = [];rootScope.loginErrorMsgs = [];rootScope.infoMsgs = [];
              console.log(scope.loginCredentials.otp+"_"+scope.loginCredentials.username)
              if((scope.loginCredentials.username && scope.loginCredentials.password)||scope.loginCredentials.authToken || (scope.loginCredentials.otp && scope.loginCredentials.username)){
                 
                  authenticationService.authenticateWithUsernamePassword(function(data){
                      scope.isProcessing = true;
                      RequestSender.loginUser.save(scope.loginCredentials,function(successData){
                       
                          if((successData.authToken&&successData.username)||(successData.otp&&successData.username)){
                               localStorageService.add("ClientData",[scope.loginCredentials]);
                               location.path(scope.loginCredentials.returnUrl);
                           }
            
                          rootScope.selfcare_sessionData ={clientId: successData.clientId, authenticationKey: data.base64EncodedAuthenticationKey};
                         localStorageService.add("selfcare_sessionData", rootScope.selfcare_sessionData);
                          rootScope.currentSession= {user :successData.clientData.displayName||"selfcare"};
                          scope.loginCredentials = {};rootScope.signUpCredentials = {};
                          rootScope.signupErrorMsgs  =[];rootScope.loginErrorMsgs  =[];rootScope.infoMsgs  =[];
                          scope.isProcessing  = false;
                          //adding web tv url
                          rootScope.webtvURL = selfcareModels.webtvURL+"?id="+successData.clientId;
                          localStorageService.add("selfcareAppUrl",selfcareModels.selfcareAppUrl);
                          localStorageService.add("loginHistoryId", successData.loginHistoryId);
                          localStorageService.add("clientServices",successData.clientServices);
                          console.log(JSON.stringify(successData.clientServices));
                          location.path('/profile');
                      },function(errorData){
                          scope.isProcessing = false;
                          if(errorData.data.userMessageGlobalisationCode == "error.msg.not.authenticated"){
                                  rootScope.loginErrorMsgs.push({'name' : 'error.login.failed'});
                                }else{
                                  rootScope.loginErrorMsgs.push({'name' : errorData.data.errors[0].userMessageGlobalisationCode});
                                }
                      });//end of request
                  });//end of authentication request
              }else {
                  rootScope.loginErrorMsgs.push({'name' : 'title.fill.alldetails'});
              }
           
          };//login fun end
         
          scope.usernameChange = function(email) {
console.log(email);
}
         
          scope.OTPAction = function() {
         
          authenticationService.authenticateWithUsernamePassword(function(data){
          RequestSender.OTPResource.save(scope.loginCredentials,function(data){
              /*console.log(JSON.stringify(data));*/
              scope.OTP=data.changes.otp;
              scope.generatedKey = data.changes.generatedKey;
              console.log(scope.OTP);
                }); 
          });
         
          };
       
          
      scope.inputvalue =function(oneTimePassword) {
      console.log(oneTimePassword);
    if(oneTimePassword.length==4){
    if(oneTimePassword==scope.OTP){
    scope.loginCredentials.otp = oneTimePassword;
    console.log(scope.loginCredentials.otp)
    }
    }
      }
      /*scope.submit =function(){
    if(scope.input==scope.OTP){
    console.log("otp");
      }
      }*/
         
          $('#pwd').keypress(function(e) {
              if(e.which == 13) {
                  scope.loginAction();
              }
            });
         
         
          rootScope.$on("LoginMethod", function(){
              console.log(scope.loginCredentials.name+"_"+scope.loginCredentials.username);
              scope.loginAction();
          });
         
          scope.signUp = function(){
          console.log("Hello");
          scope.isSignUp = true;
          }
         
          scope.OTPFunction = function(){
          scope.isOTP= true;
          scope.resendOTP=true;
          }
         
          scope.showOtp = function(){
          scope.showOTPButton = true;
          }
          scope.loginPage=function(){
          scope.isSignUp=false;
          }
         
    };
  selfcareApp.controller('SignInFormController', [ '$scope',
                                                   'localStorageService',
                                                   'RequestSender',
                                                   'AuthenticationService',
                                                   '$rootScope',
                                                   '$location',
                                                   'SessionManager',
                                                   '$http',
                                                   '$window',
                                                   SignInFormController]);