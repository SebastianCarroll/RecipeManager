require.config({
    baseUrl: "/javascripts/",
    paths: {
        jquery: "lib/jquery-2.0.2",
        knockout: "lib/knockout-2.2.1.debug"
    }
});

require(['knockout', 'jquery', 'recipeUtils/cookTime', 'recipeUtils/recipe'], 
    function(ko, $, time, Recipe) {
    
    function mainViewModel() {
        var self = this;
        
        self.recipes = ko.observableArray([]);
        self.current = ko.observable();
        
        function getCurrent(id) {
            var retRec;
            $.each(self.recipes(), function(i, recipe) {
                if(recipe._id === id) {
                    retRec = recipe;
                    return false;
                }
            });
            return retRec;
        }
        
        
        self.createAlert = function () {
            alert("Yay!");
        };

        self.ajaxReload = function () {
            $.ajax({
                type: 'GET',
                url: '/all',
                contentType:"application/json; charset=utf-8",
                success: function (recipes, arg2, arg3) {
                    //alert('Success!');
                    //self.recipes(recipes);
                    //var newRecipe = new Recipe(recipes[0]);
                    self.recipes.removeAll();
                    $.each(recipes,function(index, rec) {
                        self.recipes.push(new Recipe(rec));
                        console.log(JSON.stringify(rec));
                    });
                    console.log("Success!");
                }
            }); 
        };
    };
    var mainVM = new mainViewModel();
    ko.applyBindings(mainVM);
    $(document).ready(mainVM.ajaxReload());
});