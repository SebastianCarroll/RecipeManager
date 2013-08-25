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
                id = self._id(),
                url = id ? '/recipe/:id/edit?_id=' + self._id() : '/recipe/new';
            console.log('Saving to server');
            // Save via ajax
            $.ajax({
                type: 'POST',
                url: url,
                contentType:"application/json; charset=utf-8",
                data: jsSelf,
                success: function (recipes, arg2, arg3) {
                    alert('Success!');
                },
                failure: function (recipes, arg2, arg3) {
                    alert('Failure!');
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
        };
        
        self.editView = function () {
            var path = '/recipe/:id/edit',
                method = 'get',
                parameters = { _id : self._id()};
                
            formU.createFormAndSubmit(path, method, parameters); 
        };
        
        self.deleteRecipe = function () {
            var path = '/recipe/:id/delete',
                method = 'post',
                parameters = { _id : self._id()};
                
            formU.createFormAndSubmit(path, method, parameters); 
        };
        
        self.update = function(recipe) {
            $.each(recipe, function(key, val){
                // Checking via string name like this is bound to break
                // Make more robust
                if(self[key]) {
                    if(key === "time"){
                        self[key](val ? new CookTime(val) : self[key]());
                    } else if(key === "ingredients"){
                        // Change this so that ingredients becomes an 
                        // observableArray of observables
                        self[key](val ? makeAllElementsObservables(val) : self[key]());
                    } else if (key === "method") {
                        self[key](val ? makeAllElementsObservables(val) : self[key]());
                    }
                    else {
                        self[key](val ? val : self[key]());
                    }
                }
            });
        };
        
        function makeAllElementsObservables(array) {
            return ko.utils.arrayMap(array, function(item) {
                return ko.observable(item);
            });
            
            function makeObs(value,i){
                return ko.observable(value);
            }
        }
        
        //constructor? This seems odd
        self.update(init);
    };
});