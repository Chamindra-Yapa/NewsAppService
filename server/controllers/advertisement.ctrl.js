/** */

const fs = require('fs')
const cloudinary = require('cloudinary')
const mysql = require('mysql');
const axios=require('axios');

const url ="http://127.0.0.1:5000/api/"

function getImageData (_id) {
    console.log(`${url}news/${_id}`);
     return axios.get(`${url}news/${_id}`).then((res)=>{
        return res.data;
    }).catch(err=>console.log(err));
}

module.exports = {
    addAds: (req, res, next) => {
         // function to encode file data to base64 encoded string
          console.log('...req start...');
            console.log(req);
            console.log('...req end...');
            console.log('...res start...');
            console.log(res);
            console.log('...res end...');
         
       let {description,createdBy,url,image,id} = req.body;
       let sql;
        if (id!=0){ 
            if (image) {
                getImageData(image).then(data => {
                if (data) {

                     let query = "UPDATE `advertisement` set `description`=?,`createdBy`=?,`url`=?,`image`=? where id=?;"; // query database to get all the players
                    let LOAD_FILE = { toSqlString: function() { return `0x${data}`; } };
                    sql = mysql.format(query, [description,createdBy,url,LOAD_FILE,id]);
                      connection.query(sql, (err, result) => {
                            console.log(sql);
                                if (err) {
                                        console.log(err);
                                        res.redirect('/');
                                    }
                                    res.send(result);
                                });
                
                }   
                
                });
                  
            }
            else {
                 let query = "UPDATE `advertisement` set `description`=?,`createdBy`=?,`url`=? where id=?;"; // query database to get all the players
                 sql = mysql.format(query, [description,createdBy,url,id]);
                   connection.query(sql, (err, result) => {
            console.log(sql);
                if (err) {
                        console.log(err);
                        res.redirect('/');
                    }
                    res.send(result);
                });
            }
        }
        else {
            if (image) {
                getImageData(image).then(data => {
                if (data) {
                    const query = "INSERT INTO `advertisement` (`description`,`createdBy`,`url`,`image`) VALUES (?,?,?,?);"; // query database to get all the players
                    const LOAD_FILE = { toSqlString: function() { return `0x${data}`; } };
                    sql = mysql.format(query, [description,createdBy,url,LOAD_FILE]);
                      connection.query(sql, (err, result) => {
                    console.log(sql);
                        if (err) {
                                console.log(err);
                                res.redirect('/');
                            }
                            res.send(result);
                        });
                        }   
                        
                });
                   
         }
         else {
                  const query = "INSERT INTO `advertisement` (`description`,`createdBy`,`url`) VALUES (?,?,?);"; // query database to get all the players
                 sql = mysql.format(query, [description,createdBy,url]);
                   connection.query(sql, (err, result) => {
            console.log(sql);
                if (err) {
                        console.log(err);
                        res.redirect('/');
                    }
                    res.send(result);
                });
            }
        }
      
        },

       
    getAll: (req, res) => {
        let query = "SELECT * FROM `advertisement` ORDER BY id DESC"; // query database to get all the players
         
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
             
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