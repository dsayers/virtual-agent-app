// Load the Cloudant library.
var Cloudant = require('cloudant');
// Initialize Cloudant with settings from .env
var username = process.env.CLOUDANT_USERNAME;
var password = process.env.CLOUDANT_PASSWORD;
var dbName = process.env.CLOUDANT_DB_NAME;
var cloudant = Cloudant({
  account: username,
  password: password
});

//Get a specific record from cloudant database
exports.getRecord = function(id, cb) {
    var db = cloudant.db.use(dbName);
    db.list(function(err, body) {
      if(!err) {
        db.get(id, function(err, data) {
          if(!err) {
            cb(data);
          }
          else{
            return console.log('[test.getRecord]', err.message);
          }
        });
      }
      else{
        return console.log('[test.getRecord]', err.message);
      }
    });
};

//Post a record to the database
exports.postRecord = function(id, record, cb) {
  cloudant.db.destroy('', function(err) {
    cloudant.db.create(dbName, function() {
      var currDB = cloudant.db.use(dbName);
      currDB.insert(record, id, function(err, body, header) {
        if(err) {
          return console.log('[test.postRecord] ', err.message);
        }
        else{
          cb(record);
        }
      });
    });
  });
};

//Update the record in the database
exports.updateRecord = function(id, record, cb) {
    var db = cloudant.db.use(dbName);
    db.list(function(err, body) {
      if(!err) {
        db.get(id, function(err, data) {
          if(!err) {
            record['_id'] = data._id;
            record['_rev'] = data._rev;
            db.insert(record, id, function(err, body, header) {
              if(err) {
                return console.log('[test.updateRecord] ', err.message);
              }
              else{
                cb(record);
              }
            });
          }
          else{
            return console.log('[test.updateRecord]', err.message);
          }
        });
      }
    });
};
