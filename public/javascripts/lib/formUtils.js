/*
 * This module defines the ingredient object
 */
define([], 
function() {
    //Function from http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
    var createFormAndSubmit = function createFormAndSubmit(path, method, parameters) {
        var form = $('<form></form>'),
            method = method || 'post';

        form.attr("method", method);
        form.attr("action", path);

        $.each(parameters, function(key, value) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });

        // The form needs to be a part of the document in
        // order for us to be able to submit it.
        $(document.body).append(form);
        form.submit();
    }
    
    return {
        createFormAndSubmit: createFormAndSubmit
    }
});