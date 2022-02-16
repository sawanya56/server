const express = require('express')
const app = express()
//const router = express.Router()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tree'
})

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.send('Hellow!')
})

app.post('/person', function (req, res) {
    console.log(req.body)
    connection.query("INSERT INTO `persons`(`LastName`, `FirstName`, `Age`)" + `VALUE ('${req.body.LastName}','${req.body.FirstName}','${req.body.Age}')`, function (error, results) {
        if (error) throw error;
        res.send(`insert person ${results}`)
    })
})

app.listen(3000)
console.log(`Example app listening on port : 3000`)
