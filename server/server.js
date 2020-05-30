config = require('./config'),
    express = require('express'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    apiRouter = express.Router(),
    path = require('path'),
    connection = mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'movies' }),
    movies = require('./models/movie');

//Limitando POST/PUT requests
app.use(express.text({type: "text/plain" }));
app.use((req, res, next)=>
{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    next();
});
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

apiRouter.get('/', function(req, res, next) {
    res.redirect('/api/movies')
})

//Metodo get
apiRouter.get('/movies/',(req,res)=>{
    var title = req.query.title;
    var genre = req.query.genre;
    var id = req.query.id;
    console.log(title);
    console.log(movies);
    if(id!=null){
        movies.find({"id":id},(err,recs)=>{
            if(err){
                console.dir(err);
            }
            const limit = 50;
            res.json(recs.slice(0,limit));
        })
    }else{
        movies.find({"title":{$regex:title,'$options' : 'i'},"genre":{$regex:genre, '$options' : 'i'},},(err,recs)=>{
            if(err){
                console.dir(err);
            }
            const limit = 50;
            res.json(recs.slice(0,limit));
        })
    }
})

//Metodo post
apiRouter.post('/movies/',(req,res)=>{
    console.log(req.body);
    var t = req.query.title,
        l = req.query.link,
        s = req.query.score,
        y = req.query.year,
        g = req.query.genre;
        p = req.query.poster;
    console.log(t,s,y,g);
    var movieData ={
        id: new Date().valueOf(),
        link: l,
        title:t,
        year:y,
        score:s,
        genre:g,
        poster:p
    }
    movies.init();
    new movies(movieData).save( (err,small)=>{
        if(err){
            console.dir(err);
        }
        res.json({ message: 'Guardado a coleccion' });
    })
})

//Metodo put
apiRouter.put('/movies/',(req,res)=>{
    const toUpdate={
        id: req.query.id,
        link: req.query.link,
        poster: req.query.poster,
        title: req.query.title,
        score: req.query.score,
        genre: req.query.genre,
        year: req.query.year,
    }
    movies.updateOne({id:req.query.id},toUpdate,(err,recs)=>{
        console.log(recs);
        if(err){
            console.dir(err);
        }
        res.send(recs);
    })
})

//Metodo delete
apiRouter.delete('/movies/',(req,res)=>{
    var id = req.query.id
    movies.remove({"id": id},(err,recs)=>{
        if(err){
            console.dir(err);
        }
        res.json({records:recs});
    })
})

//Levantando server
app.use('/api',apiRouter);
app.listen(config.port);