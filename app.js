
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , RecipeProvider = require('./recipeprovider').RecipeProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var recipeProvider = new RecipeProvider('localhost', 27017);

//Routes

app.get('/', function(req, res){
  recipeProvider.findAll(function(error, reps){
      res.render('index', {
            title: 'Recipes',
            recipes:reps
        });
  });
});

app.get('/all', function(req, res) {
    recipeProvider.findAll(function(error, reps){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(reps));
        res.end();
    });
});
      

app.get('/recipe/new', function(req, res) {
    res.render('recipe_new', {
        title: 'New Recipe'
    });
});

//save new recipe
app.post('/recipe/new', function(req, res){
    recipeProvider.save(req.body, 
    function( error, docs) {
        res.redirect('/')
    });
});

//view a recipe
app.get('/recipe/:id/view', function(req, res) {
        recipeProvider.findById(req.param('_id'), 
            function(error, recipe) {
                res.render('recipe_view',
                { 
                    //recipe: recipe
                    recipeJSON: JSON.stringify(recipe)
                });
        });
});

//update an recipe
app.get('/recipe/:id/edit', function(req, res) { 
    var id = req.param('_id');
    recipeProvider.findById(id, 
        function(error, recipe) {
            res.render('recipe_edit',
            { 
                //recipe: recipe,
                recipeJSON: JSON.stringify(recipe)
            });
    });
});

//save updated recipe
app.post('/recipe/:id/edit', function(req, res) {
        recipeProvider.update(req.param('_id'), req.body
        , function(error, docs) {
                res.redirect('/')
        });
});

//delete an recipe
app.post('/recipe/:id/delete', function(req, res) {
        recipeProvider.delete(req.param('_id'), function(error, docs) {
                res.redirect('/')
        });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//app.listen(3000);