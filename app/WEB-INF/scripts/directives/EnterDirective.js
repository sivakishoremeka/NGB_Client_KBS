(function(module) {
    mifosX.directives = _.extend(module, {
    	EnterDirective: function($parse) {
    		 return function (scope, element, attrs) {
    		        element.bind("keydown keypress", function (event) {
    		            if(event.which === 13) {
    		                scope.$apply(function (){
    		                    scope.$eval(attrs.ngEnter);
    		                });

    		                event.preventDefault();
    		            }
    		        });
    		    };
    	}
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("ngEnter", ['$parse', mifosX.directives.EnterDirective]).run(function($log) {
    $log.info("EnterDirective initialized");
});