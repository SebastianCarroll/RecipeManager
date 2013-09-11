require.config({
    baseUrl: "/javascripts/",
    paths: {
        bootstrap: "lib/bootstrap",
        jquery: "lib/jquery-2.0.2",
        knockout: "lib/knockout-2.2.1.debug"
        
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: "$.fn.popover"
        }
    }
});

require(['knockout', 'jquery', 'recipeUtils/cookTime', 'recipeUtils/recipe', 'lib/knockoutExtensions'], 
    function(ko, $, time, Recipe, koExt) {
    
    function mainViewModel() {
        var self = this;
        
        // getRecipeObject is from global code from the server (check jade code)
        if(getRecipeObject) {
            self.recipe = ko.observable(new Recipe(getRecipeObject()));
        } else {
            self.recipe = ko.observable(new Recipe());
        }
        
        self.newIngr = ko.observable('');
        self.newMethodStep = ko.observable('');
        
        self.addNewIngr = function () {
            self.recipe().ingredients.push(self.newIngr());
            self.newIngr('');
        };
        
        self.removeIngr = function(ingr, event) {
            self.recipe().ingredients.remove(ingr);
        };
        
        self.addNewMethodStep = function () {
            // TODO: shouldnt know it is an array here
            // Make interface method
            self.recipe().method.push({obs: self.newMethodStep()});
            self.newMethodStep('');
        };
        
        self.removeMethodStep = function(step, event) {
            self.recipe().method.remove(step);
        };
    };
    
    var mainVM = new mainViewModel();
    ko.applyBindings(mainVM);
    //$(document).ready(mainVM.ajaxReload());
});