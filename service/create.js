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
    }
    
}