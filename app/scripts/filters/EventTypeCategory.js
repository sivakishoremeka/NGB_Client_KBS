(function(module) {
  mifosX.filters = _.extend(module, {
	  EventTypeCategory: function () {
                    return function(history,val,resourceId) {
                    		
                    	var historyData = history;
                    	var jsonStringData = historyData.replace("{","");
                    	jsonStringData = jsonStringData.replace("}","");
                    	jsonStringData = jsonStringData.replace(/"/g,"");
                    	var jsonArray = JSON.parse(historyData);
                       /*	if(jsonArray.plans!=undefined){
                    		jsonArray = jsonArray.plans[0];
                        }*/
                       	if(jsonArray.plans!=undefined)
                       	{
                    	for(var i=0;i<jsonArray.plans.length;i++){
                    		if(i==0){
                    			jsonArray.planCode = jsonArray.plans[0].planCode;
                    			jsonArray.planDescription = jsonArray.plans[0].planDescription;
                    		}else{
                    			jsonArray.planCode  = jsonArray.planCode+","+jsonArray.plans[i].planCode;
                        		jsonArray.planDescription = jsonArray.planDescription +","+ jsonArray.plans[i].planDescription;
                        	}
                    		}
                    	}
                       	if(jsonArray.plans!=undefined)
                       	{
                    	for(var i=0;i<jsonArray.plans.length;i++){
                    		if(i==0){
                    			jsonArray.planCode = jsonArray.plans[0].id;
                    			jsonArray.planDescription = jsonArray.plans[0].planDescription;
                    		}else{
                    			jsonArray.planCode  = jsonArray.planCode+","+jsonArray.plans[i].id;
                        		jsonArray.planDescription = jsonArray.planDescription +","+ jsonArray.plans[i].planDescription;
                        	}
                    		}
                    	}
                       	var serialNumber = "";
                    	if(jsonArray.serialNumber){
                    		serialNumber = jsonArray.serialNumber[0].serialNumber;
                    	}
                    	if(jsonArray.clientServiceData!=undefined){
                    		jsonArray = jsonArray.clientServiceData[0];
                    	}
                    	
                    	var  eventTypeCategoryMsg = {
                    	
                        //client related data
                        "CREATE CLIENT" : "Client Created Successfully with Name:"+jsonArray.firstname+jsonArray.lastname,
                        "UPDATE CLIENT" : "Update Successfully:"+jsonArray.officeTransfer,
                        "UPDATE ADDRESS" : "Client Address Updated successfully with "+jsonStringData,
                        "DELETE CLIENT" : "Client Closed successfully with ReasonId "+jsonArray.closureReasonId,
                        
                        //add plan data
                        "CREATE MULTIPLEORDERS"  : "PlanCode : "+"("+jsonArray.planCode+")"+"   "+"PlanDescription : "+"("+jsonArray.planDescription+")",
                        
                       //order related data 
                        "CREATE ORDER" : "PlanCode :"+jsonArray.planCode+" Contract Period :"+jsonArray.contractPeriod,
                        "CHANGEPLAN ORDER" : "PlanCode : "+jsonArray.planCode+" , "+" ChangedPlan : "+jsonArray.changePlanDetail+" , "+"  Contract Period : "+jsonArray.contractPeriod,
                        "DELETE ORDER" : "Order Deleted successfully",
                        "EXTENSION ORDER" : "Order Extended to "+jsonArray.extensionPeriod+" Due To "+jsonArray.extensionReason,
                        "RECONNECT ORDER" : "Order Re-Connected successfully with OrderId : "+resourceId,
                        "REACTIVE ORDER" : "Order Re-Activated successfully with OrderId : "+resourceId,
                        "SUSPEND ORDER" : "Order Suspended with reason "+jsonArray.suspensionReason+" and Description "+jsonArray.suspensionDescription,
                        "RETRACKOSDMESSAGE ORDER" : "Order Re-Track OSD Message Added with commandName : "+jsonArray.commandName,
                        "APPLYPROMO ORDER" : "Apply Promo Added for Order with Promo Id : "+jsonArray.promoId,
                        "TERMINATE ORDER" : "Order Terminated successfully with OrderId : "+resourceId,
                        "DISCONNECT ORDER" : "Order Disconnected Successfully with OrderId : "+jsonArray.orderNo,
                        "DISCONNECT MULTIPLEORDERS" :  "PlanCode : "+"("+jsonArray.planCode+")"+"    "+"PlanDescription : "+"("+jsonArray.planDescription+")",
                        
                      
                       
                        
                        //payments related Data
                        "CREATE PAYMENT" : "Payment Done Successfully with Amount : "+jsonArray.amountPaid+ " , "+ "Reciept No : " +jsonArray.receiptNo,
                        "CANCEL PAYMENT" : "Payment Cancelled successfully with remarks "+jsonArray.cancelRemark,
                        
                        //itemsale related data
                        "CREATE ONETIMESALE" : "Item Sale Created Successfully with Charge Code "+jsonArray.chargeCode+" ,UnitPrice "+jsonArray.unitPrice+"" +
                        						" ,Total Price "+jsonArray.totalPrice+" ,Quantity "+jsonArray.quantity+" and SaleType "+jsonArray.saleType+"",
                        						
                        						
                         "CREATE NEWSALE" : "NEWSALE Created Successfully With Price : "+jsonArray.totalPrice+" , " +
                         		"Quantity : "+jsonArray.quantity+ "," + "  SaleType : "+jsonArray.saleType+" With Serial Number "+serialNumber,
                         		
                        "DEALLOCATE INVENTORY" : "Deallocated item",
                        "DELETE ONETIMESALE"   : "Item sale deleted Successfully",
                        "RENEWAL ORDER"   : "Order Renewaled Sucessfully with : "+jsonArray.orderNo,
                        
                        "CREATE EVENTORDER" : "Event Order Done Successfully Event Id"+jsonArray.eventId+", Format "+jsonArray.formatType,
                        
                        
                        //more info related data
                        "CREATE PARENTCLIENT" : "Parent Added to Client successfully",
                        "CREATE CLIENTCARDDETAILS" : "Client Credit Card Details Added successfully",
                        
                        //notes related data
                        "CREATE CLIENTNOTE" : "Client Notes Created Successfully",
                        
                        
                        //statement related data
                        "DELETE BILLMASTER" : "Bill Statement Deleted successfully",
                        
                        //client identifier related data
                        "CREATE CLIENTIDENTIFIER" : "Client Identifier Added successfully",
                        "DELETE CLIENTIDENTIFIER" : "Client Identifier Deleted successfully",
                        
                        
                        //ticket related data
                        "CREATE TICKET" : "Ticket Created Successfully",
                        "CLOSE TICKET" : "Ticket Closed Successfully",
                        
                        //client contact information related data
                        "CREATE Client_Contact_Info" : "Client Contact Information Added successfully",
                        "UPDATE Client_Contact_Info" : "Client Contact Information Updated successfully",
                        "DELETE Client_Contact_Info" : "Client Contact Information Deleted successfully",
                        
                        
                        //credit distribution related data
                        "CREATE CREDITDISTRIBUTION" : "Credit Distribution ",
                        
                        
                        //adjustment related data
                        "CREATE ADJUSTMENT" : "AmountPaid:"+jsonArray.amount_paid+" AdjustmentType:"+jsonArray.adjustment_type+" AdjustmentCode:"+jsonArray.adjustment_code+" Remarks:"+jsonArray.Remarks,
                        
                        
                        "CREATE OWNEDHARDWARE" : "Owned Hardware Created",
                        "CREATE ALLOCATION" : "Allocation Added successfully",
                        
                        
                        
                       //self care related data 
                        "SELFREGISTRATION ACTIVATE" : "Selfcare Registration Activated",
                        "CREATE SELFCARE" : "Selfcare Account Created successfully with UserName:"+jsonArray.userName,
                        
                        // Redemption related data
                        "CREATE REDEMPTION":"Redemption done successfully PinNumber:"+jsonArray.pinNumber,
                        
                        // ServiceTransfer related data
                        "CREATE SERVICETRANSFER":"Service transfered from "+jsonArray.oldPropertyCode +" to "+jsonArray.newPropertyCode+" with Shift Charge Amount "+jsonArray.shiftChargeAmount,
                        
                        //clientservice related data
                         "CREATE CLIENTSERVICE":"Client Service Created Successfully For ServiceId : "+jsonArray.serviceId+"",
                        
                         //clientsimpleactivation data
                         "CREATE CLIENTSIMPLEACTIVATION" : "Client Simple Activation Is Successful For ServiceId : "+jsonArray.serviceId+"",
                        	
                         //provisioning details data
                         "CONFIRM PROVISIONINGDETAILS" :"Provisioning Details Confirmed",
                         
                        //client serviceactivation data
                         "CREATE CLIENTSERVICEACTIVATION" :"Client Service Activated Successfully",
                         
                         //clientservice terminate data
                         "TERMINATE CLIENTSERVICE" :"Client Service Terminated Successfully",
                         
                         //swaphardware device data
                         "SWAP HARDWAREDEVICE" :"Device Swapped Successfully From :"+jsonArray.oldSerialNo +" To:"+jsonArray.newSerialNo+"",
                         
                         //clientservice suspend data
                         "SUSPEND CLIENTSERVICE" :"Client Service Suspended Successfully ",
                        	 
                         //clientservice reactivate data
                         "REACTIVE CLIENTSERVICE" :"Client Service ReActivated Successfully ",
                        	 
                          //organization  data
                         "CREATE OFFICE" : "Create Office successfully with officeId:"+resourceId,
                         "UPDATE OFFICE" : "Update Office successfully with officeId:"+resourceId,
                         "DELETE PARTNERAGREEMENT": "Delete partnerAgreement successfully",
                         "CREATE PARTNERAGREEMENT": "Create partnerAgreement successfully",
                         "CREATE OFFICEADJUSTMENT": "Create officeadjustment successfully",
                         "CREATE OFFICEPAYMENT": "Create officepayment successfully",
                         "CREATE OFFICE" :"Create office successfully ",
                         "UPDATE OFFICE" :"Update office successfully "
                     };
                  
                      
                      return eventTypeCategoryMsg[val];
                  };
                }
  });
  mifosX.ng.application.filter('EventTypeCategory', [mifosX.filters.EventTypeCategory]).run(function($log) {
    $log.info("EventTypeCategory filter initialized");
  });
}(mifosX.filters || {}));
