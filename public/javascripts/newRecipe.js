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
/*          var CookTime = function CookTime() {
            var self = this;
            self.prep = ko.observable(0);
            self.cook = ko.observable(0);
            self.total = ko.computed(function () {
                return parseInt(self.prep()) + parseInt(self.cook());
            });
        } */
        function NewRecipeViewModel() {
            var self = this;
            
            self.title = ko.observable('');
            self.ingredients = ko.observableArray([]);
            self.method = ko.observableArray(['step 1', 'do step one again', 'step 3']);
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
            
/*             self.toJSON = function() {
                var copy = ko.toJS(self);
                var ignoredFields = ['newMethodStep', 'newIngr'];
                
                $.each(ignoredFields, function(i,f){
                    if(copy[f]) delete copy[f];
                });
                return JSON.stringify(copy);
            }; */
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
    /*
        var NewRecipeViewModel = function NewRecipeViewModel() {
            var self = this;
            
            self.ingredients = ko.observableArray([]);
            self.method = ko.observableArray(['step 1', 'do step one again', 'step 3']);
            
            self.time = new CookTime();
            //self.time = new time.CookTime();
            
            // Change to a proper nested CookTime object whenwork out how
            self.prep = ko.observable(10);
            self.cook = ko.observable(23);
            self.total = ko.computed(function () {
                return parseInt(self.prep()) + parseInt(self.cook());
            });
            
            self.newIngr = ko.observable('');
            
            self.createAlert = function () {
                alert("Yay!");
            };
            
            self.addNewIngr = function () {
                self.ingredients.push(self.newIngr());
            };
            
            self.addOnEnter = function(event) {
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    self.addNewIngr();
                    return false;
                }
                return true;
            };
            
            self.ajaxSave = function () {
                console.log("Saving via ajax");
                $.ajax({
                    type: 'POST',
                    url: '/recipe/new',
                    data: {
                        title: 'title', 
                        ingredients: 'ingreds', 
                        comments: 'comms'
                    },
                    success: function () {
                        alert('Success!');
                    }
                });
            };
        };
        
        ko.applyBindings(new NewRecipeViewModel()); */
});