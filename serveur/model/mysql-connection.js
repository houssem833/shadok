/**
 * Created by Houssem on 08/01/2018.
 */
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'shadok_db'
});
const User = require("./user-model").UserRespMapper;
connection.connect();


module.exports.addUser = function(user,callback) {
    connection.query("INSERT INTO users SET ?",user, (error, result) => {
        if(!error){
            user.id = result.insertId;
            callback(error,user);
        }
        else
            callback(error,false);
    });
};

module.exports.updateUser = function(user,callback) {
    connection.query('UPDATE users SET ? WHERE id = ? ', [user,user.id], (error, results) => {

        if(!error){
            callback(error,true);
        }
        else
            callback(error,false);
    });
};

module.exports.getUserById = function(id,callback) {
    connection.query("SELECT *  FROM users where id = ?", [id], (error, results, fields) => {
        if(!error && results[0] != undefined){
            let user = new User(results[0]);
            callback(error,user);
        }
        else
        callback(error,false);
    });
};
module.exports.getUserByUsername = function(username,callback) {
    connection.query("SELECT *  FROM users where username = ?", [username], (error, results) => {
        if(!error && results[0] != undefined){
            let user = new User(results[0]);
            callback(error,user);
        }
        else
            callback(error,false);
    });
};
