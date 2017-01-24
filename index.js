var express = require('express');
var app = express();

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


