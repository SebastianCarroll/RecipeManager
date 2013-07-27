/*
 * This module defines the ingredient object
 */
define(['knockout',
         'recipeUtils/ingredient',
         'recipeUtils/cookTime',
         'lib/formUtils'], 
function(ko, Ingr, CookTime, formU) {
    return function Recipe(init) {
        var self = this;
        
        self._id = ko.observable('');
        self.ingredients = ko.observableArray([]);
        self.description = ko.observable('');
        self.title = ko.observable('');
        self.method = ko.observableArray([]);
        self.comments = ko.observableArray([]);
        self.rating = ko.observable(0);
        self.photos = ko.observable('');
        self.servings = ko.observable('');
        self.time = ko.observable(new CookTime());
        self.nutritInfo = ko.observable('');
        
        self.save = function() {
            console.log('Convert to JSON');
            var jsSelf = ko.toJSON(self),
                url = '/recipe/:id/edit?_id=' + self._id();
            console.log('Saving to server');
            // Save via ajax
            $.ajax({
                type: 'POST',
                url: url,
                contentType:"application/json; charset=utf-8",
                data: jsSelf,
                success: function (recipes, arg2, arg3) {
                    console.log("Success!");
                    alert('Success!');
                }
            }); 
        };
        
        // Intermediate step towards 
        self.toJSON = function() {
            var jsSelf =ko.toJS(self),
                ignoreList = ['_id'],
                removeList = [];
            
            // Find all identifiers in ignore list
            $.each(jsSelf, function(key, val){
                if($.inArray(key,ignoreList) !== -1 ||
                 typeof(key)==='function'){
                    removeList.push(key);
                 }
            });
            
            // Remove identifiers from object
            $.each(removeList, function(i,val){
                delete jsSelf[val];
            });
            
            return jsSelf;
        };
        
        self.fullView = function () {
            var path = '/recipe/:id/view',
                method = 'get',
                parameters = { _id : self._id()};
                
            formU.createFormAndSubmit(path, method, parameters); 
        }
        
        self.update = function(recipe) {
            $.each(recipe, function(key, val){
                if(self[key]) {
                    if(key === "time"){
                        self[key](val ? new CookTime(val) : self[key]());
                    } else {
                        self[key](val ? val : self[key]());
                    }
                }
            });
        };
        
        //constructor? This seems odd
        self.update(init);
    }
});