let mysql  = require('mysql');
let config = require('../node-mysql/config.js');

module.exports = {

    createTable(name, atributes){
        let connection = mysql.createConnection(config);
        let sql = `create table if not exists ${name}(
            id int primary key auto_increment,`
            console.log(atributes)
        for(var i = 0; i < atributes.length; i++) {
            let isNull = atributes[i].isNull ? '' : 'not null';
            let value = !!atributes[i].value ? `default ${value}` : '';
            sql += `${atributes[i].name} ${atributes[i].type.value} ${isNull} ${value},`
        }
        
        sql = sql.substring(0, sql.length-1);
        sql += ')';
        console.log(sql);
        connection.query(sql, function(err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    
        connection.end(function(err) {
            if (err) {
                return console.log(err.message);
            }
        }); 
    },

    insertInto(tableName, atributes) { 
        return new Promise(
            (resolve, reject) => {
            let connection = mysql.createConnection(config);
            
            sql = `insert into ${tableName} (`
            for(var i = 0; i < atributes.length; i++) {
                sql += `${atributes[i].name},`
            }
            sql = sql.substring(0, sql.length-1);
            sql += ') VALUES (';
            for(var i = 0; i < atributes.length; i++) {            
                sql += `'${atributes[i].value}',`
            }
            sql = sql.substring(0, sql.length-1);
            sql += ')';
            connection.query(sql, function(err, results, fields) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(results);
                }
            });
        
            connection.end(function(err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        }) 
    },

    findAll(tableName) {
        return new Promise(
            (resolve, reject) => {
                let connection = mysql.createConnection(config);
                sql = `select * from ${tableName}`;
                return connection.query(sql, function(err, results, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results); 
                    }
                    connection.end(function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                    }); 
                });
            })
    },

    findById(tableName, id) {
        return new Promise(
            (resolve, reject) => {
                let connection = mysql.createConnection(config);
                sql = `select * from ${tableName} where id = ${id}`;
                return connection.query(sql, function(err, results, fields) {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(results); 
                    }
                    connection.end(function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                    }); 
                });
            })
    },

    update(tableName, atribute, id) {
        return new Promise(
            (resolve, reject) => {
            let connection = mysql.createConnection(config);
            sql = `update ${tableName} set ${atribute.name} = ${atribute.value} where id = ${id}`
            connection.query(sql, function(err, results, fields) {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(results)
                }
            });
            connection.end(function(err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        })
    },

    delete(tableName, id) {
        return new Promise(
            (resolve, reject) => {
            let connection = mysql.createConnection(config);
            sql = `delete from ${tableName} where id = ${id}`
            connection.query(sql, function(err, results, fields) {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(results)
                }
            });
            connection.end(function(err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        })
    }

    
}

