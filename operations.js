const mysql = require('mysql2');

//función para insertar registro
function insert(connection,  data, callback){
let insertQuery ="INSERT INTO personas (id, nombres, edad) VALUES (?, ?, ?)";
    let query = mysql.format(insertQuery, [data.id, data.nombres, data.edad]);
connection.query(query, (err, result)=> {
    if(err) throw err;
    callback(result);

    connection.end();
});
};

//Función para leer los registros

function read(connection, callback) {
    connection.query('SELECT * FROM personas', (err, result)=>{
    if(err) throw err;
    callback(result);

    connection.end();
    })
}

//función para actualizar registros
function update(connection,  data, callback){
    let updateQuery ="UPDATE personas SET edad = ? WHERE id=?";
        let query = mysql.format(updateQuery, [data.edad, data.id]);
    connection.query(query, (err, result)=> {
        if(err) throw err;
        callback(result);
    
        connection.end();
    });
    };

//función para eliminar registros
function remove(connection,  data, callback){
    let removeQuery ="DELETE FROM personas WHERE id=?";
    let query = mysql.format(removeQuery, [data.id]);
    connection.query(query, (err, result)=> {
        if(err) throw err;
        callback(result);
    
        connection.end();
    });
    };

module.exports = { insert, read, update, remove };