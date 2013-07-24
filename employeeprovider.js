var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

EmployeeProvider = function(host, port) {
  this.db= new Db('node-mongo-recipe', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


EmployeeProvider.prototype.getCollection= function(callback) {
  this.db.collection('recipes', function(error, recipe_collection) {
    if( error ) callback(error);
    else callback(null, recipe_collection);
  });
};

//find all recipes
EmployeeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, recipe_collection) {
      if( error ) callback(error)
      else {
        recipe_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new recipe
EmployeeProvider.prototype.save = function(recipes, callback) {
    this.getCollection(function(error, recipe_collection) {
      if( error ) callback(error)
      else {
        if( typeof(recipes.length)=="undefined")
          recipes = [recipes];

        for( var i =0;i< recipes.length;i++ ) {
          recipe = recipes[i];
          recipe.created_at = new Date();
        }

        recipe_collection.insert(recipes, function() {
          callback(null, recipes);
        });
      }
    });
};

//find an recipe by ID
EmployeeProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, recipe_collection) {
      if( error ) callback(error)
      else {
        recipe_collection.findOne({_id: recipe_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
			if( error ) callback(error)
			else callback(null, result)
        });
      }
    });
};

// update an recipe
EmployeeProvider.prototype.update = function(recipeId, recipes, callback) {
    this.getCollection(function(error, recipe_collection) {
      if( error ) callback(error);
      else {
        recipe_collection.update(
			{_id: recipe_collection.db.bson_serializer.ObjectID.createFromHexString(recipeId)},
			recipes,
			function(error, recipes) {
				if(error) callback(error);
				else callback(null, recipes)       
			});
      }
    });
};

//delete recipe
EmployeeProvider.prototype.delete = function(recipeId, callback) {
	this.getCollection(function(error, recipe_collection) {
		if(error) callback(error);
		else {
			recipe_collection.remove(
				{_id: recipe_collection.db.bson_serializer.ObjectID.createFromHexString(recipeId)},
				function(error, recipe){
					if(error) callback(error);
					else callback(null, recipe)
				});
		}
	});
};

exports.EmployeeProvider = EmployeeProvider;