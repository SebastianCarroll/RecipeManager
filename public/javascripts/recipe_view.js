/**
 * @author Sebastian
 */

require.config({
    baseUrl: "/javascripts/",
    paths: {
        jquery: "lib/jquery-2.0.2",
        knockout: "lib/knockout-2.2.1.debug"
    }
});

require(['knockout', 'jquery', 'recipeUtils/cookTime', 'recipeUtils/recipe'], 
    function(ko, $, time, Recipe) {
    
    function RecipeView_ViewModel() {
        var self = this;
        
        self.recipe = ko.observable(new Recipe(getRecipeObject()));
   	}
        
    var mainVM = new RecipeView_ViewModel();
    ko.applyBindings(mainVM);
});