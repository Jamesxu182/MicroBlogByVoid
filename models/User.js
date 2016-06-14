var mongodb = require('./db');

function User(user) {
    this.name = user.name,
    this.password = user.password
}

module.exports = User;

User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password
    };

    mongodb.open(function(err, db) {
        if(err) {
            callback(err);
        }

        /* users is table name */
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(errs);
            }

            collection.ensureIndex('name', {unique: true});
            collection.insert(user, {safe: true}, function(err, users) {
                mongodb.close();
                callback(err, new User(users[0]));
            });
        });
    });
}

User.get = function get(username, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }

        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }

            collection.ensureIndex('name', {unique: true});
            collection.findOne({name: username}, function(err, doc) {
                mongodb.close();

                if(doc) {
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
}
