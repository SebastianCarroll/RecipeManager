/*
 * This module defines the time object
 */
define(['knockout', 'jquery'],
    function (ko, $) {
    
    //return function CookTime() {
    return function CookTime(init) {
        var self = this;
        
        self.prep = ko.observable(init && init.prep ? init.prep : 0);
        self.cook = ko.observable(init && init.cook ? init.cook : 0);
        self.total = ko.computed(function () {
            return parseInt(self.prep()) + parseInt(self.cook());
        });
    }
});
