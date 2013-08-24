require.config({
    baseUrl: "/javascripts/",
    paths: {
        jquery: "lib/jquery-2.0.2",
        knockout: "lib/knockout-2.2.1.debug"
    }
});

require(['knockout', 'jquery', 'recipeUtils/cookTime', 'recipeUtils/recipe', 'lib/knockoutExtensions'], 
    function(ko, $, time, Recipe, koExt) {
    
    function mainViewModel() {
        var self = this;
        
        self.recipe = ko.observable(new Recipe(getRecipeObject()));
        
        self.newIngr = ko.observable('');
        self.newMethodStep = ko.observable('');
        
        self.addNewIngr = function () {
            self.recipe().ingredients.push(self.newIngr());
            self.newIngr('');
        };
        
        self.addNewMethodStep = function () {
            self.recipe().method.push(self.newMethodStep());
            self.newMethodStep('');
        };
        
        self.createAlert = function () {
            alert("Yay!");
        };
        
        /* self.ajaxReload = function () {
            $.ajax({
                type: 'GET',
                url: '/all',
                contentType:"application/json; charset=utf-8",
                success: function (recipes, arg2, arg3) {
                    //alert('Success!');
                    //self.recipes(recipes);
                    //var newRecipe = new Recipe(recipes[0]);
                    $.each(recipes,function(index, rec) {
                        self.recipes.push(new Recipe(rec));
                        console.log(JSON.stringify(rec));
                    });
                    console.log("Success!");
                }
            }); 
        }; */
    };
    var mainVM = new mainViewModel();
    ko.applyBindings(mainVM);
    //$(document).ready(mainVM.ajaxReload());
});