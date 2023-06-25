const express = require ('express');
const app = express();
const mysql = require('mysql2')
require('dotenv').config();

const {insert, read, update, remove} = require('./operations');

app.use(express.json());

//conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
})

connection.connect((err)=>{
if(err) throw err;
console.log('Conected to database');
});

app.get('/', (req, res) => {//esta parte del código es solo para comprobar que el servidor está funcionando y corre desde el navegador
    res.send('Hello world');
});

//Ejecución de la función insert contenida en el modulo operations.js
app.get('/insert', (req, res) => {
    insert(connection, {id: '7', nombres: 'Román', edad: '20'}, result => {
        res.json(result);
    });
});

//Ejecución de la función read contenida en el modulo operations.js
app.get('/read', (req, res) => {
    read(connection, result => {
        res.json(result);
    });
});

//Ejecución de la función update contenida en el modulo operations.js
app.get('/update', (req, res) => {
    update(connection, {edad: '25', id: '7'}, result => {
        res.json(result);
    });
});

//Ejecución de la función removeQuery contenida en el modulo operations.js
app.get('/remove', (req, res) => {
    remove(connection, {id: '7'}, result => {
        res.json(result);
    });
});


app.listen(3000, ()=> {
    console.log('Server running on port 3000...')
});