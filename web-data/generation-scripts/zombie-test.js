var fs = require("fs");

// 3rd party modules.
var Browser = require("zombie");

Browser.visit("http://www.taste.com.au/recipes/7268/rogan+josh+lamb+curry?ref=collections,lamb-recipes", function (e, browser) {
    var page = {};
    extractTextFromIngredients(page, browser);
    extractTextFromMethods(page, browser);
    debugger;
    extractMetaData(page, browser);
    var jsonStr = JSON.stringify(page, null, "  ");
    // Write the JSON data to the file system.
    fs.writeFile("schedule.json", jsonStr);
});

function  extractMetaData(page, browser){
    var prepTime = browser.querySelector("div.content-item.detail-info-1 td.prepTime em");
    var cookTime = browser.querySelector("div.content-item.detail-info-1 td.cookTime em");
    var rating = browser.querySelector("div.content-item.detail-info-1 span.star-level.rate-10");
    var header = browser.querySelector("div.module-header .heading h1");
    
    page.prepTime = prepTime._childNodes[0]._nodeValue;
    page.cookTime = cookTime._childNodes[0]._nodeValue;
    page.rating = rating._childNodes[0]._nodeValue;
    page.title = header._childNodes[0]._nodeValue;
}

function extractTextFromIngredients(page, browser){
    var ingredients = browser.querySelectorAll("ul.ingredient-table .element");
    var ingr = [];
    for(var i=0; i<ingredients.length; i++){
        ingr.push(ingredients[i]._childNodes[0]._nodeValue);
    }
    page.ingredients = ingr;
}

function extractTextFromMethods(page, browser){
    var methods = browser.querySelectorAll("div.content-item.tab-content.current.method-tab-content ol li.methods");
    var steps = [];
    for(var i=0; i<methods.length; i++){
        steps.push({
            number: methods[i]._childNodes[1]._childNodes[0]._nodeValue,
            desc: methods[i]._childNodes[3]._childNodes[0]._nodeValue
        });
    }
    page.methods = steps;
}
