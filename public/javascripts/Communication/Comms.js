/*
 * This module defines the Comms object.
 * Contains all the information for connecting with the server
 */
define([], 
function() {
    
    /**
     * @param
     * @return
     */
    var saveViaAjax = function saveViaAjax(url, data) {
        
        // Save via ajax
        $.ajax({
            type: 'POST',
            url: url,
            contentType:"application/json; charset=utf-8",
            data: data,
            success: function (recipes, arg2, arg3) {
                alert('Success!');
            },
            failure: function (recipes, arg2, arg3) {
                alert('Failure!');
            }
        }); 
    }
    
    return {
    	saveViaAjax: saveViaAjax
    }
});