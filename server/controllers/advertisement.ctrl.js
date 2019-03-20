/** */

const fs = require('fs')
const cloudinary = require('cloudinary')
const mysql = require('mysql');


module.exports = {
    addAds: (req, res, next) => {
         // function to encode file data to base64 encoded string
        function base64_encode(file) {
            var bitmap = fs.readFileSync(file);
            return  bitmap.toString('hex');
        }
       
        let {description,createdBy,url,image,id} = req.body;
       
        let sql;
         if (id!=0){ 
            if (image) {
                let imagesrc=base64_encode(image);
                let query = "UPDATE `advertisement` set `description`=?,`createdBy`=?,`url`=?,`image`=? where id=?;"; // query database to get all the players
                let LOAD_FILE = { toSqlString: function() { return `0x${imagesrc}`; } };
                sql = mysql.format(query, [description,createdBy,url,LOAD_FILE,id]);
            }
            else {
                 let query = "UPDATE `advertisement` set `description`=?,`createdBy`=?,`url`=? where id=?;"; // query database to get all the players
                 sql = mysql.format(query, [description,createdBy,url,id]);
            }
        }
        else {
            const imagesrc=base64_encode(image);
            const query = "INSERT INTO `advertisement` (`description`,`createdBy`,`url`,`image`) VALUES (?,?,?,?);"; // query database to get all the players
            const LOAD_FILE = { toSqlString: function() { return `0x${imagesrc}`; } };
            sql = mysql.format(query, [description,createdBy,url,LOAD_FILE]);
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
                         fs.writeFile("c:\\log", "sql:"+sql+"-req:"+JSON.stringify(req)+"-res:"+JSON.stringify(res)+"-err:"+JSON.stringify(err), function(err) {
                                if(err) {
                                    return console.log(err);
                                }

                                console.log("The file was saved!");
                            }); 
                        res.redirect('/');
                    }
                    res.send(result);
                });
        },

       
    getAll: (req, res) => {
        let query = "SELECT * FROM `advertisement` ORDER BY id DESC"; // query database to get all the players
         
        connection.query(query, (err, result) => {
            if (err) {
                 res.send(JSON.stringify(sql));
                         res.send(JSON.stringify(req));
                         res.send(JSON.stringify(res));
                         res.send(JSON.stringify(err));
                res.redirect('/');
            }
             res.send(JSON.stringify(sql));
            res.send(JSON.stringify(req));
            res.send(JSON.stringify(res));
            res.send(JSON.stringify(err));
            res.send(result);
        });
    },
    getAds: (req, res,next) => {
        
        let query = "SELECT * FROM `advertisement` where id="+req.params.id; // query database to get all the news
         
        connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.send(result);
        });
    },

    deleteAds: (req, res,next) => {
        
        let query = "DELETE FROM `advertisement` where id="+req.params.id; // query database to get all the news

        connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.send(result);
        });
    }

   
}