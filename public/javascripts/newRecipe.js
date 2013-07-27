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

require(['bootstrap', 'knockout', 'jquery', 'recipeUtils/cookTime'],
    function (bs, ko, $, CookTime) {
        function NewRecipeViewModel() {
            var self = this;
            
            self.title = ko.observable('');
            self.ingredients = ko.observableArray([]);
            self.method = ko.observableArray([]);
            self.description = ko.observable('');
            self.comments = ko.observable('');
            self.rating = ko.observable(0);
            
            self.time = new CookTime();
            
            self.newMethodStep = ko.observable('');
            self.newIngr = ko.observable('');
            
            self.createAlert = function () {
                alert("Yay!");
            };
            
            self.addNewMethodStep = function () {
                self.method.push(self.newMethodStep());
            }
            self.removeMethodStep = function (method, event) {
                self.method.remove(method);
            }
            
            self.addNewIngr = function () {
                self.ingredients.push(self.newIngr());
            };
            self.removeIngr = function (ingr, event) {
                self.ingredients.remove(ingr);
            }
            
            self.ajaxSave = function () {
                var data = ko.toJSON(self);

                console.log("Saving via ajax");
                $.ajax({
                    type: 'POST',
                    url: '/recipe/new',
                    contentType:"application/json; charset=utf-8",
                    data: data,
                    success: function () {
                        alert('Success!');
                    }
                }); 
            }
            
        };
        
        NewRecipeViewModel.prototype.toJSON = function() {
            var copy = ko.toJS(this);
            var ignoredFields = ['newMethodStep', 'newIngr'];
            
            $.each(ignoredFields, function(i,f){
                if(copy[f] !== undefined) delete copy[f];
            });
            return copy;
        };
        
        ko.applyBindings(new NewRecipeViewModel());
});