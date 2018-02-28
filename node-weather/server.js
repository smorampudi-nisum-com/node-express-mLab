// console.log("you are here");

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var Db = require('mongodb').Db;
var dbUrl = 'mongodb://admin:welcome@ds249418.mlab.com:49418/node-express-quotes';
var db; //= new Db();


MongoClient.connect('mongodb://admin:welcome@ds249418.mlab.com:49418/node-express-quotes',( err, database)=>{
    if (err) return console.log(err)
    db = database.db('node-express-quotes');
    app.listen(3000, function(){
        console.log('listening on 3000');
    })
})
app.use(bodyParser.urlencoded({extended:true}));
// app.listen(3000, function(){
//     console.log('listening on 3000');
// })
// app.get('/', function(req, res){
//     res.send('Hello World')
// })
app.set('view engine','ejs');
//res.render(view, locals);
// ES6 approach to the above commented lines of the code from 23-25
app.get('/', (req, res)=> {
    //res.send('Hello World');
    db.collection('quotes').find().toArray((err, result)=>{
        if(err) return console.log(err)
        res.render('index.ejs', {quotes:result})
    })
    
    // res.sendFile('/Users/smorampudi/Documents/node-weather'+ '/index.html');
    // var cursor = db.collection('quotes').find();
})

app.post('/quotes', (req, res)=> {
   //console.log("hello");
   console.log(req.body);
   db.collection('quotes').save(req.body, (err, result) => {
       if (err) return console.log(err)

       console.log('saved to the database');
       res.redirect('/');
   })

   db.collection('quotes').find().toArray(function(err, results) {
       console.log(results);
   })
// db.collection('quotes').insertOne({
//     name: 'sam',
//     quote: 'hopefully this works'
// },
// function(err, res){
//     if(err){
//         return console.log(err);
//     }
// })
});