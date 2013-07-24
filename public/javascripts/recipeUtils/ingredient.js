/*
 * This module defines the ingredient object
 */
/* define([], function() {
    
}); */

define(function (require) {
    return function Ingredient() {
        var self = this;
        self.quantity = ko.observable();
        self.unit = ko.observable();
        self.foodStuff = ko.observable();
    }
});