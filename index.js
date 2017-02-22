var express = require('express');
var app = express();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
// mongodb://<dbuser>:<dbpassword>@ds129459.mlab.com:29459/dotowiki
var mongodbUrl = 'mongodb://admin:admin27101988@ds129459.mlab.com:29459/dotowiki';

function returnJSON(res, data) {
  // console.log("Getting data is done!");
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/heroes', function(req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(mongodbUrl, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', mongodbUrl);

      // Do some work here with the database.
      var collection;

      collection = db.collection('heroes');
      collection.find().toArray(function(err, docs) {
        if (err) {
          console.log(err);
          db.close();
          return;
        } else {
          // console.log(docs.length);
        }

        //Close connection
        db.close();
        returnJSON(res, docs);
      });
    }
  });
});

app.get('/items', function(req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(mongodbUrl, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', mongodbUrl);

      // Do some work here with the database.
      var collection;

      collection = db.collection('items');
      collection.find().toArray(function(err, docs) {
        if (err) {
          console.log(err);
          db.close();
          return;
        } else {
          // console.log(docs.length);
        }

        //Close connection
        db.close();
        returnJSON(res, docs);
      });
    }
  });
});

app.get('/last_update', function(req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(mongodbUrl, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', mongodbUrl);

      // Do some work here with the database.
      var collection;

      collection = db.collection('last_update');
      collection.find().toArray(function(err, docs) {
        if (err) {
          console.log(err);
          db.close();
          return;
        } else {
          // console.log(docs.length);
        }

        //Close connection
        db.close();
        returnJSON(res, docs);
      });
    }
  });
});

app.get('/getHeroList', function(req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(mongodbUrl, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', mongodbUrl);

      // Do some work here with the database.
      var collection;

      collection = db.collection('heroes');
      collection.find({}, {_id: 0, short_name: 1, localized_name: 1, icon_url: 1}).toArray(function(err, docs) {
        if (err) {
          console.log(err);
          db.close();
          return;
        } else {
          // console.log(docs.length);
        }

        //Close connection
        db.close();
        returnJSON(res, docs);
      });
    }
  });
});

app.get('/getItemList', function(req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(mongodbUrl, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', mongodbUrl);

      // Do some work here with the database.
      var collection;

      collection = db.collection('items');
      collection.find({}, {
        _id: 0,
        short_name: 1,
        localized_name: 1,
        icon_url: 1,
        cost: 1,
        isRecipe: 1
      }).toArray(function(err, docs) {
        if (err) {
          console.log(err);
          db.close();
          return;
        } else {
          // console.log(docs.length);
        }
 
        //Close connection
        db.close();
        returnJSON(res, docs);
      });
    }
  });
});

app.get('/getHero', function(req, res) {
  if (req.query.short_name) {
    // Use connect method to connect to the Server
    MongoClient.connect(mongodbUrl, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', mongodbUrl);

        // Do some work here with the database.
        var collection;

        collection = db.collection('heroes');
        collection.findOne({ short_name: req.query.short_name }, function(err, item) {
          if (err) {
            console.log(err);
            db.close();
            return;
          } else {
            // console.log(docs.length);
          }

          //Close connection
          db.close();
          returnJSON(res, item);
        });
      }
    });
  }
});

app.get('/getItem', function(req, res) {
  if (req.query.short_name) {
    // Use connect method to connect to the Server
    MongoClient.connect(mongodbUrl, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', mongodbUrl);

        // Do some work here with the database.
        var collection;

        collection = db.collection('items');
        collection.findOne({ short_name: req.query.short_name }, function(err, item) {
          if (err) {
            console.log(err);
            db.close();
            return;
          } else {
            // console.log(docs.length);
          }

          //Close connection
          db.close();
          returnJSON(res, item);
        });
      }
    });
  }
});

app.get('/getAbility', function(req, res) {
  if (req.query.id) {
    // Use connect method to connect to the Server
    MongoClient.connect(mongodbUrl, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', mongodbUrl);

        // Do some work here with the database.
        var collection;

        collection = db.collection('heroes');
        collection.findOne({ abilities: { $elemMatch: { id: req.query.id } } }, function(err, item) {
          if (err) {
            console.log(err);
            db.close();
            return;
          } else {
            // console.log(docs.length);
          }

          //Close connection
          db.close();
          for (var ability of item.abilities) {
            if (ability.id == req.query.id) {
              returnJSON(res, ability);
              return;
            }
          }
        });
      }
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


