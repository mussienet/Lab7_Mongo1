var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
const crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    var encr='';
    var db = mongo.db("mongodb://localhost:27017/mwaDB",{native_parser:true});
    db.bind('homework7');
    db.homework7.find().toArray(function(err,items){
    console.log(items[0].message);
    const decipher = crypto.createDecipher('aes256', 'asaadsaad');
    //const decipher = crypto.createDecipher('aes192', 'a password');
    
    var encrypted = items[0].message;
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);

    res.render('index', { title: decrypted });
    db.close();
    
  });
  
});

module.exports = router;
