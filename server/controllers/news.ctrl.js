/** */
const fs = require('fs');
const cloudinary = require('cloudinary');
const mysql=require('mysql');

module.exports = {
    addNews: (req, res, next) => {
    // function to encode file data to base64 encoded string
        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            return  bitmap.toString('hex');;
        }
       
        let { title ,description,createdBy,videoUrl,description2,newstype,image,id } = req.body
        console.log(id!=0);
        if (id!=0){
            if (image) {
                let imagesrc=base64_encode(image);
                let query = "UPDATE `news` set `title`=?,`description`=?,`createdBy`=?,`videoUrl`=?,`description2`=?,`newstype`=?,`image`=? where id=?;"; // query database to get all the players
                var LOAD_FILE = { toSqlString: function() { return `0x${imagesrc}`; } };
                var sql = mysql.format(query, [title,description,createdBy,videoUrl,description2,newstype,LOAD_FILE,id]);
            }
            else{
                 let query = "UPDATE `news` set `title`=?,`description`=?,`createdBy`=?,`videoUrl`=?,`description2`=?,`newstype`=? where id=?;"; // query database to get all the players
                 var sql = mysql.format(query, [title,description,createdBy,videoUrl,description2,newstype,id]);
            }
        }
        else{
            let imagesrc=base64_encode(image);
            let query = "INSERT INTO `news` (`title`,`description`,`createdBy`,`videoUrl`,`description2`,`newstype`,`image`) VALUES (?,?,?,?,?,?,?);"; // query database to get all the players
            var LOAD_FILE = { toSqlString: function() { return `0x${imagesrc}`; } };
            var sql = mysql.format(query, [title,description,createdBy,videoUrl,description2,newstype,LOAD_FILE]);
                   
        }
        connection.query(sql, (err, result) => {
            console.log(sql);
            console.log('...req start...');
            console.log(req);
            console.log('...req end...');
            console.log('...res start...');
            console.log(res);
            console.log('...res end...');
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    }
                    res.send(result);
                });
    },
    
    getAll: (req, res) => {
        let query = "SELECT * FROM `news` ORDER BY id DESC LIMIT 20"; // query database to get all the news

         connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.send(result);
        });
    },
    
    getNews: (req, res,next) => {
        
        let query = "SELECT * FROM `news` where id="+req.params.id; // query database to get all the news

        connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.send(result);
        });
    },

    deleteNews: (req, res,next) => {
        
        let query = "DELETE FROM `news` where id="+req.params.id; // query database to get all the news

        connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.send(result);
        });
    }
}