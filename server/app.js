/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router();
//const session = require('express-session');
// let io = require('socket.io').listen(express);

/** configure cloudinary */
cloudinary.config({
    cloud_name: 'chidumennamdi',
    api_key: '',
    api_secret: ''
})
// user: 'chamindra',
//     password: 'ch@mk1m',

/*/** connect to Mysql datastore */
// mysqlapp-2-bs9v5
// const connection=mysql.createConnection({
//     host: '127.0.0.1',
//     port: '6001',
//     user: 'chami',
//     password: 'chamkum',
//     database: 'newsdb',
//     insecureAuth:true
// });
// const connection=mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'chk197',
//     database: 'newsdb'
// });
const connection = mysql.createConnection(process.env.JAWSDB_URL);
try {
    connection.connect((err) => {
           if (err) console.log(err);
        // connection.query('Select * from news',(err,rows)=>{
        //     if (err) console.log(err);

        // if (rows) rows.forEach((row)=>console.log(row.title));
            
        // });     

            console.log('Connected');
    });   
} catch (error) {
    
}

global.connection = connection;

// let port = 5000 || process.env.PORT
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

/** set up routes {API Endpoints} */
routes(router)
console.log(router);
/** set up middlewares */

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/api', router);


/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});



app.on('exit', 
    function(){
        connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
        }); 
});
