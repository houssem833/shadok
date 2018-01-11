/**
 * Created by Houssem on 07/01/2018.
 */
const bcrypt = require('bcryptjs');
const cnx = require("../model/mysql-connection");

class model {
    static  save(user,callback){
        if(user.id == undefined){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    user.password = hash;
                    cnx.addUser(user,callback);
                });
            });
        }
        else{
            if(user.password != undefined){
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        user.password = hash;
                        cnx.updateUser(user,callback);
                    });
                });
            }
            else
                cnx.updateUser(user,callback);
        }

    }

    static getUserByUsername(username,callback){
        cnx.getUserByUsername(username,callback);
    }
    static comparePassword(candidatePassword,hash,callback){
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err) throw err;
            callback(null, isMatch);
        });
    }
    static getUserById(id,callback){
        cnx.getUserById(id,callback);
    }
}
module.exports = model;