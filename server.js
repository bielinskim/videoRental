const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
var async = require("async");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
dbUrl = "mongodb://localhost:27017/videoRental";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var routes = {

    "/movies": "movies",
    "/actors": "actors",
    "/categories": "categories",
    "/rents": "rents",
    "/clients": "clients",

    "/movie/:id": "movies",
    "/actor/:id": "actors",
    "/category/:id": "categories",
    "/rent/:id": "rents",
    "/client/:id": "clients"

};

function handleError(res) {
    res.status(500);
    res.json({error:true});
}

function isValidId(id) {
    return mongo.ObjectID.isValid(id);
}

function createObjectId(id) {
    return new mongo.ObjectID(id);
}

function dbConnect(req, res, callback) {

    MongoClient.connect(dbUrl, function(err, db) {

        if (err) return handleError(res);

        callback(req, res, db);

    });

}

function createItem(req, res) {

    var colname = routes[req.route.path];

    if(colname === "rents") {
        req.body.date = new Date();
    }

    dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');

        db.collection("movies").insert(req.body, function (err, doc) {

            if (err) return handleError(res);
            res.json(doc.ops[0]);

        });

    });

}

function getItem(req, res) {

    var id = req.params.id
    isValid = isValidId(id),
    colname = routes[req.route.path];


    if (!isValid) return handleError(res);

    dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');

        db.collection(colname).find({ _id: createObjectId(id) }).toArray(function (err, docs) {

            if (err) return handleError(res);

            res.json(docs[0]);

        });

    });

}

function updateItem(req, res) {

    var id = req.params.id
    isValid = isValidId(id),
    colname = routes[req.route.path];


    if (!isValid) return handleError(res);

    dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');

        delete req.body._id;

        db.collection(colname).findAndModify({ _id: createObjectId(id) }, {}, { $set: req.body }, { new: true }, function (err, doc) {

            if (err) return handleError(res);


            res.json(doc);

        });

    });

}

function deleteItem(req, res) {

    var id = req.params.id
    isValid = isValidId(id),
    colname = routes[req.route.path];

    if (!isValid) return handleError(res);

    dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');

        db.collection(colname).findAndRemove({ _id: createObjectId(id) }, function (err, doc) {

            if (err) return handleError(res);


            res.json({ deleted: true });

        });

    });

}

app.all('*', function(req, res, next) {

    res.format({
        
        json: function() {
            next();
        },
        html: function() {
            res.redirect('/');
        }

    });

});

app.get('/', (req, res) => res.sendfile('index.html'));

app.get("/movies", function (req, res) {

    var limit = parseInt(req.query.limit),
        skip = parseInt(req.query.skip),
        order = parseInt(req.query.order),
        name = req.query.name,
        regex = new RegExp(name, "ig");

        dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');
        db.collection('movies').find({title: regex}, { limit: limit, skip: skip, sort: {title: order || 1}}).toArray(function (err, docs) {

            if (err) return handleError(res);

            res.json(docs);

        });
    });
});

app.get("/actors", function (req, res) {

    var limit = parseInt(req.query.limit),
        skip = parseInt(req.query.skip),
        order = parseInt(req.query.order),
        name = req.query.name,
        regex = new RegExp(name, "ig");

        dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');
        db.collection('actors').find({ name: regex }, { limit: limit, skip: skip, sort: {name: order || 1} }).toArray(function (err, docs) {

            if (err) return handleError(res);

            res.json(docs);

        });
    });
});

app.get("/clients", function (req, res) {

    var limit = parseInt(req.query.limit),
        skip = parseInt(req.query.skip),
        order = parseInt(req.query.order),
        name = req.query.name,
        regex = new RegExp(name, "ig");

        dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');
        db.collection('clients').find({$or: [{first_name: regex}, {last_name: regex}]}, { limit: limit, skip: skip, sort: {first_name: order || 1} }).toArray(function (err, docs) {

            if (err) return handleError(res);

            docs.forEach(function(doc) {
                doc.name = doc.first_name + " " + doc.last_name;

                delete doc.first_name;
                delete doc.last_name;
            })

            res.json(docs);

        });
    });
});

app.get("/categories", function (req, res) {

    var name = req.query.name,
        order = parseInt(req.query.order),
        regex = new RegExp(name, "ig");

        dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');
        db.collection('categories').find({ name: regex }, {sort: {name: order || 1}}).toArray(function (err, docs) {

            if (err) return handleError(res);

            res.json(docs);

        });
    });
});

app.get("/rents", function (req, res) {

    var limit = parseInt(req.query.limit),
        order = parseInt(req.query.order),
        skip = parseInt(req.query.skip),
        name = req.query.name,
        regex = new RegExp(name, "ig");

        dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');
        db.collection('rents').find({}, { limit: limit, skip: skip, sort: {date: order || 1} }).toArray(function (err, docs) {

            if (err) return handleError(res);

            async.each(docs, function (doc, eachCallback) {


                async.parallel([function (callback) {
                    db.collection("movies").findOne({ _id: new mongo.ObjectID(doc.movie_id) }, {fields: { title: 1}}, function (err, movie) {

                        if (err) return handleError(res);
                        delete doc.movie_id;
                        doc.movie_title = movie.title;

                        callback();

                    });
                },
                function (callback) {

                    db.collection("clients").findOne({ _id: new mongo.ObjectID(doc.client_id) }, {fields: { first_name: 1, last_name: 1}}, function (err, client) {

                        if (err) return handleError(res);
                        delete doc.client_id;
                        if(client && client.first_name && client.last_name) {
                            doc.client_name = client.first_name + " " + client.last_name;
                        }
                        else {
                            doc.client_name = "null" + " " + "null";
                        }

                        callback();

                    });

                }], function (err) {
                    if (err) {
                        eachCallback(err);

                        return;
                    }
                    eachCallback();

                });


            }, function (err) {

                if (err) return handleError(res);

                var filteredDocs = docs.filter(function(doc) {
                    return doc.movie_title.match(regex);
                });

                res.json(filteredDocs);

            });

        });
    });
});

app.get("/movie/:id", function (req, res) {

    var id = req.params.id
    isValid = isValidId(id);


    if (!isValid) return handleError(res);

    dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');

        db.collection("movies").find({ _id: createObjectId(id) }).toArray(function (err, docs) {

            if (err) return handleError(res);

            var movie = docs[0];

            db.collection("rents").count({movie_id: id}, function(err, count) {

                if (err) return handleError(res);

                movie.rent_number = count;

                movie.available = count < movie.quantity;

                res.json(movie);

            });

        });

    });

});

app.get("/actor/:id", getItem);
app.get("/category/:id", getItem);
app.get("/client/:id", getItem);

app.get("/rent/:id", function (req, res) {

    var id = req.params.id
    isValid = isValidId(id);


    if (!isValid) return handleError(res);

    dbConnect(req, res, function(req, res, database) {

        const db = database.db('videoRental');

        db.collection("rents").findOne({ _id: createObjectId(id) }, function (err, doc) {

            if (err) return handleError(res);


            async.parallel([function (callback) {
                db.collection("movies").findOne({ _id: new mongo.ObjectID(doc.movie_id) }, {fields: { title: 1}}, function (err, movie) {

                    if (err) return handleError(res);
                    doc.movie_title = movie.title;

                    callback();

                });
            },
            function (callback) {

                db.collection("clients").findOne({ _id: new mongo.ObjectID(doc.client_id) }, {fields: { first_name: 1, last_name: 1}}, function (err, client) {

                    if (err) return handleError(res);
                    doc.client_name = client.first_name + " " + client.last_name;

                    callback();

                });

            }], function (err) {
                if (err) return handleError(res);
                res.json(doc);

            });


        });

    });

});

app.put("/movie/:id", updateItem);
app.put("/actor/:id", updateItem);
app.put("/category/:id", updateItem);
app.put("/client/:id", updateItem);
app.put("/rent/:id", updateItem);

app.post("/movies", createItem);
app.post("/actors", createItem);
app.post("/categories", createItem);
app.post("/clients", createItem);
app.post("/rents", createItem);

app.delete("/movie/:id", deleteItem);
app.delete("/actor/:id", deleteItem);
app.delete("/category/:id", deleteItem);
app.delete("/client/:id", deleteItem);
app.delete("/rent/:id", deleteItem);

app.get("/info/:colname", function(req, res) {

    var availableNames = ["movies", "actors", "categories", "rents", "clients"],
        colname = req.params.colname,
        name = req.query.name,
        regex = new RegExp(name, "ig")
        fields = [
            {first_name: regex},
            {last_name: regex},
            {title: regex},
            {name: regex}
        ];

        if(availableNames.indexOf(colname) === -1) {
            return handleError(res);
        }

        dbConnect(req, res, function(req, res, database) {

            const db = database.db('videoRental');


            if(colname == "rents") {

                db.collection("rents").find({}).toArray(function(err, docs) {

                    var count = 0;

                    async.each(docs, function(doc, callback) {

                        var rent = doc;

                        db.collection("movies").findOne({ _id: new mongo.ObjectID(rent.movie_id) }, {fields: { title: 1}}, function (err, doc) {

                            if (err) {
                                callback(err);

                                return;
                            }
                            if(doc.title.match(regex)) {
                                count++;
                            }
    
                            callback();

                            return;
    
                        });
                    },
                    function(err) {
                        
                        if (err) return handleError(res);

                        res.status(200);
                        res.set("Content-Type", "text/plain");
                        res.send(String(count));
                    });

                });

            } else {

                db.collection(colname).count({$or: fields}, function(err, count) {

                    if (err) return handleError(res);
    
                    res.status(200);
                    res.set("Content-Type", "text/plain");
                    res.send(String(count));
    
                });

            }

            

    });

});


app.listen(port, () => console.log('Serwer aktywny!!'));