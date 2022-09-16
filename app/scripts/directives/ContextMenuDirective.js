 (function(module) {
    mifosX.directives = _.extend(module, {
        ContextMenuDirective: function () {
           return {
                restrict: 'A',
                scope  : '@&', 
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) {
        	 
        	  var ul1 = $('#context1');
        	  var ul2 = $('#context2');
        	  var ul3 = $('#context3');
        	  var ul4 = $('#context4');
        	  var ul5 = $('#context5');
        	  var ul6 = $('#context6'),
              last = null;
              ul1.css({ 'display' : 'none'});
              ul2.css({ 'display' : 'none'});
              ul3.css({ 'display' : 'none'});
              ul4.css({ 'display' : 'none'});
              ul5.css({ 'display' : 'none'});
              ul6.css({ 'display' : 'none'});
              //console.log($('#'+iAttrs.context));
            $(iElement).mousedown(function(event) {
             if(event.button==2){
            	//console.log(iElement.context.id);
            	 //console.log("iAttrs.id::"+iAttrs.id);
            	
            	for(var i in scope.countryObject){
            		if(iAttrs.id == scope.countryObject[i].id){
            			ul1.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul2.css({ 'display' : 'none'});
                        ul3.css({ 'display' : 'none'});
                        ul4.css({ 'display' : 'none'});
                        ul5.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	     }
            	for(var j in scope.stateObject){
            		if(iAttrs.id == scope.stateObject[j].id){
            			ul2.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
                        
            			ul1.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var k in scope.districtObject){
            		if(iAttrs.id == scope.districtObject[k].id){
            			ul3.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var l in scope.cityObject){
            		if(iAttrs.id == scope.cityObject[l].id){
            			ul4.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	
            	for(var i in scope.timemodelObject){
            		if(iAttrs.id == scope.timemodelObject[i].id){
            			ul1.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul2.css({ 'display' : 'none'});
                        ul3.css({ 'display' : 'none'});
                        ul4.css({ 'display' : 'none'});
                        ul5.css({ 'display' : 'none'});
                        ul6.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	     }
            	for(var j in scope.timeperiodObject){
            		if(iAttrs.id == scope.timeperiodObject[j].id){
            			ul2.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
                        
            			ul1.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			ul6.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var k in scope.startyearObject){
            		if(iAttrs.id == scope.startyearObject[k].id){
            			ul3.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			ul6.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var k in scope.endyearObject){
            		if(iAttrs.id == scope.endyearObject[k].id){
            			ul3.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			ul6.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var l in scope.startmonthObject){
            		if(iAttrs.id == scope.startmonthObject[l].id){
            			ul4.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			ul6.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var l in scope.endmonthObject){
            		if(iAttrs.id == scope.endmonthObject[l].id){
            			ul4.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			ul6.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var m in scope.startdayObject){
            		if(iAttrs.id == scope.startdayObject[m].id){
            			ul5.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul6.css({ 'display' : 'none'});
                        last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var m in scope.enddayObject){
            		if(iAttrs.id == scope.enddayObject[m].id){
        			  ul5.css({
                        position: "fixed",
                        display: "block",
                        left: event.clientX + 'px',
                        top:  event.clientY + 'px'
                      });
        			ul1.css({ 'display' : 'none'});
        			ul2.css({ 'display' : 'none'});
        			ul3.css({ 'display' : 'none'});
        			ul4.css({ 'display' : 'none'});
        			ul6.css({ 'display' : 'none'});
        			
                    last = event.timeStamp;
        			break;
        		  }
      	        }
            	for(var m in scope.starttimeObject){
            		if(iAttrs.id == scope.starttimeObject[m].id){
            			ul6.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			
                        last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var m in scope.endtimeObject){
            		if(iAttrs.id == scope.endtimeObject[m].id){
            			ul6.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
            			ul4.css({ 'display' : 'none'});
            			ul5.css({ 'display' : 'none'});
            			
                        last = event.timeStamp;
            			break;
            		}
          	      }
             }
            });
            
            $(document).click(function(event) {
            	document.oncontextmenu = function() {return false;};
            	var target = $(event.target);
            	if(!target.is(".popover") && !target.parents().is(".popover")) {
            	  if(event.button==2){
                  	return ;
                     /*if(last === event.timeStamp){
                	   console.log("if last");
                	    return; 
                      }*/
                   }
            	  ul1.css({
            		  'display' : 'none'
            	  });
            	  ul2.css({
                    'display' : 'none'
                  });
            	  ul3.css({
                    'display' : 'none'
                  });
            	  ul4.css({
            		  'display' : 'none'
            	  });
            	  ul5.css({
            		  'display' : 'none'
            	  });
            	 ul6.css({
            		  'display' : 'none'
            	  });
            	}
            });
          }
        };
      }
    };
   }
});
}(mifosX.directives || {}));

mifosX.ng.application.directive("context", ['$parse', mifosX.directives.ContextMenuDirective]).run(function($log) {
    $log.info("ContextMenuDirective initialized");
});

