selfcareApp.config(function($provide) {
    $provide.provider('RequestSender',function(){
      var baseUrl = "" , apiVer = selfcareModels.OBS_URL;
      this.setBaseUrl = function(url) {baseUrl = url;};
      this.$get = ['$resource','$rootScope', function(resource,$rootScope) {
        var defineResource = function(url, paramDefaults, actions) {
            var tempUrl = baseUrl;
            $rootScope.hostUrl = tempUrl;
          return resource(baseUrl+url, paramDefaults, actions);
        };
        return {
            userResource: defineResource(apiVer + "/users/:userId", {userId : '@id'}, {}),
            
            registrationResource: defineResource(apiVer + "/selfcare/register", {}, {
                update : {method: 'PUT', params: {}}
            }),
            configurationResource:defineResource(apiVer + "/configurations",{}, {}),
            
            addressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {}),
            
            allocateHardwareDetails: defineResource(apiVer + "/itemdetails/:oneTimeSaleId/:quantity", {oneTimeSaleId:'@saleId',quantity:'@quantity'},{}),
            
            authenticationClientResource: defineResource(apiVer + "/activationprocess/selfregistration", {}, {}),
            
            orderTemplateResource: defineResource(apiVer + "/prices", {}, {}),
            
            loginUser: defineResource(apiVer + "/selfcare/login", {username:'@username',password:'@password',authToken:'@authToken'}, {}),
            
            clients: defineResource(apiVer + "/clients/:clientId", {clientId:'@clientId'}, {}),
            
            forgotPwdResource: defineResource(apiVer + "/selfcare/forgotpassword", {}, {
                update : {method : 'PUT',params : {}}
            }),
           OTPResource: defineResource(apiVer + "/selfcare/OTP", {}, {
                 POST : {method : 'POST',params : {}}
            }),
            ticketResourceTemplate: defineResource(apiVer + "/tickets/template",{},  {}),
            
            ticketResource: defineResource(apiVer + "/tickets/ticketing/:clientId",{clientId:'@clientId'},  {}),
            
            clientTicketsResource: defineResource(apiVer + "/tickets/:clientId",{clientId:'@clientId'},  {}),
            
            changePwdResource: defineResource(apiVer + "/selfcare/changepassword",{},  {
                update : {method: 'PUT', params: {}}
            }),
            vodEventsResource: defineResource(apiVer + "/assets",{},  {}),
            
            eventsResource: defineResource(apiVer + "/eventorder",{},  {}),
            
            bookOrderResource: defineResource(apiVer + "/orders/:clientId/:orderId",{clientId : '@clientId',orderId : '@orderId'},  {
                update: { method: 'PUT' }
            }),
            
            getOrderResource: defineResource(apiVer + "/orders/:clientId/orders",{clientId : '@clientId'},  {}),
            
            paymentsResource: defineResource(apiVer + "/financialTransactions/:clientId", {clientId:'@clientId'}, {}),
            
            getSingleOrderResource: defineResource(apiVer + "/orders/:orderId/orderprice", {orderId:'@orderId'}, {
                 update: { method: 'PUT' }
            }),
            
            OrderDisconnectResource: defineResource(apiVer + "/orders/disconnect", {}, {}),
            
            OrderreconnectResource: defineResource(apiVer + "/orders/reconnect/:orderId", {orderId:'@orderId'},{
                   update: { method: 'PUT' }
            }),
            
            changeOrderResource: defineResource(apiVer + "/orders/changePlan/:orderId", {orderId:'@orderId'}, {
                update: { method: 'PUT' }
             }),
             
            clientTemplateResource: defineResource(apiVer + "/clients/template", {}, {}),
            
            clientResource: defineResource(apiVer + "/clients/:clientId/:anotherresource", {clientId:'@clientId',anotherresource:'@anotherresource'}, {
                getAllClientDocuments: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT'}
            }),
            
            orderRenewalResourceTemplate: defineResource(apiVer + "/orders/renewalorder/:orderId", {orderId:'@orderId'},{
                update: { method: 'PUT' }
           }),
           
           orderRenewalResource: defineResource(apiVer + "/orders/renewal/:orderId", {orderId:'@orderId'},{
                  update: { method: 'PUT' }
            }),
            
            statementResource: defineResource(apiVer + "/billmaster/:clientId", {clientId:'@clientId'}, {
            	get: {method: 'GET', params: {}},
                update: { method: 'PUT'}
            }),
            eventOrderPriceTemplateResource: defineResource(apiVer + "/eventorder",{},  {}),
            
            currencyTemplateResource: defineResource(apiVer + "/countrycurrencys/template", {}, {}),
            
            updateKortaToken: defineResource(apiVer + "/selfcare/:clientId", {clientId:'@clientId'},  {
                update : {method: 'PUT', params: {}}
            }),
            
            gettingSerialNumbers: defineResource(apiVer + "/itemdetails/searchserialnum", {},  {}),
            
            paymentGatewayConfigResource: defineResource(apiVer + "/paymentgatewayconfigs",{},  {}),
            
            singleStatementResource: defineResource(apiVer + "/billmaster/:billId/billdetails", {billId:'@billId'}, {}),
            
            
            statementEmailResource: defineResource(apiVer + "/billmaster/email/:statementId", {statementId:'@statementId'}, {
                update: { method: 'PUT'}
            }),
            
            cancelStatementResource: defineResource(apiVer + "/billmaster/:billId", {billId:'@billId'}, {}),
            
            paymentGatewayResource: defineResource(apiVer + "/paymentgateways/onlinepayment", {},  {
                update : {method: 'PUT', params: {}}
            }),
            
            netellerPaymentResource: defineResource(apiVer + "/paymentgateways/neteller", {}, {}),
            
            VoucherResource: defineResource(apiVer + "/vouchers/verify", {},  {}),
            
            redemptionResource: defineResource(apiVer + "/redemption", {}, {}),
            
            logoutResource: defineResource(apiVer + "/logout", {id:'@id'}, {}),
            
            scheduleOrderResource: defineResource(apiVer + "/orders/scheduling/:clientId", {clientId:'@clientId'}, {}),
            
            finalPriceCheckingResource: defineResource(apiVer + "/chargecode/:priceId/:clientId", {priceId:'@priceId',clientId:'@clientId'}, {}),
            
            getRecurringScbcriberIdResource: defineResource(apiVer + "/recurringpayments/:orderId", {orderId:'@orderId'}, {}),
            
            orderDisconnectByScbcriberIdResource: defineResource(apiVer + "/recurringpayments/delSubscription", {}, {
                update : {method: 'PUT', params: {}}
            }),

            clientIdentifiersResource: defineResource(apiVer + "/clients/:clientId/identifiers", {clientId:'@clientId'}, {}),
            
            planServicesResource: defineResource(apiVer + "/plans/:planId", {planId:'@planId'}, {}),
            
            evoPaymentGatewayResource: defineResource(apiVer + "/evo/:method", {method:'@method'}, {}),
            
            clientDataResource: defineResource(apiVer + "/clients/additionalinfo/:clientId", {clientId:'@clientId'}, {
                update : {method: 'PUT', params: {}}
            }),
            
            gettingContractsResource: defineResource(apiVer + "/orders/:planId/template", {planId:'@planId'}, {}),
            
            evoPaymentResource: defineResource(apiVer + "/evo/amount", {}, {}),
            
            orderaddonTemplateResource: defineResource(apiVer + "/orderaddons/template/:planId", {planId :'@planId',chargeCode :'@chargeCode'}, {}),
            
            orderaddonResource: defineResource(apiVer + "/orderaddons/:orderId", {orderId : '@orderId'}, {}),
            
            paymentTemplateResource: defineResource(apiVer + "/payments/template", {}, {}),
            
            paymentResource: defineResource(apiVer + "/payments/:clientId", {clientId : '@clientId'}, {}),
            
            cashFreeResource: defineResource(apiVer + "/cashfree", {}, {}),
            cashFreePaymentTokenResource: defineResource(apiVer + "/cashfree/paymentToken", {}, {}),
            
        };
      }];
    });
});
