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

app.get('/', (req, res) => res.sendfile('index.html'));

app.get("/movies", function (req, res) {

    var limit = parseInt(req.query.limit),
        skip = parseInt(req.query.skip),
        order = parseInt(req.query.order),
        name = req.query.name,
        regex = new RegExp(name, "ig");

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('movies').find({title: regex}, { limit: limit, skip: skip, sort: {title: order || 1}}).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

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

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('actors').find({ name: regex }, { limit: limit, skip: skip, sort: {name: order || 1} }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

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

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('clients').find({$or: [{first_name: regex}, {last_name: regex}]}, { limit: limit, skip: skip, sort: {first_name: order || 1} }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

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

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('categories').find({ name: regex }, {sort: {name: order || 1}}).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

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

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('rents').find({}, { limit: limit, skip: skip, sort: {date: order || 1} }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            async.each(docs, function (doc, eachCallback) {


                async.parallel([function (callback) {
                    db.collection("movies").findOne({ _id: new mongo.ObjectID(doc.movie_id) }, {fields: { title: 1}}, function (err, movie) {

                        if (err) {
                            res.status(500);
                            res.json({ error: true });

                            return;
                        }
                        delete doc.movie_id;
                        doc.movie_title = movie.title;

                        callback();

                    });
                },
                function (callback) {

                    db.collection("clients").findOne({ _id: new mongo.ObjectID(doc.client_id) }, {fields: { first_name: 1, last_name: 1}}, function (err, client) {

                        if (err) {
                            res.status(500);
                            res.json({ error: true });

                            return;
                        }
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

                if (err) {
                    res.status(500);
                    res.json({ error: true });

                    return;
                }

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
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("movies").find({ _id: new mongo.ObjectID(id) }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            var movie = docs[0];

            db.collection("rents").count({movie_id: id}, function(err, count) {

                if (err) {
                    res.status(500);
                    res.json({ error: true });
    
                    return;
                }

                movie.rent_number = count;

                movie.available = count < movie.quantity;

                res.json(movie);

            });

        });

    });

});

app.get("/actor/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("actors").find({ _id: new mongo.ObjectID(id) }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(docs[0]);

        });

    });

});
app.get("/category/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("categories").find({ _id: new mongo.ObjectID(id) }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(docs[0]);

        });

    });

});

app.get("/client/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("clients").find({ _id: new mongo.ObjectID(id) }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(docs[0]);

        });

    });

});

app.get("/rent/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("rents").findOne({ _id: new mongo.ObjectID(id) }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            async.parallel([function (callback) {
                db.collection("movies").findOne({ _id: new mongo.ObjectID(doc.movie_id) }, {fields: { title: 1}}, function (err, movie) {

                    if (err) {
                        res.status(500);
                        res.json({ error: true });

                        return;
                    }
                    doc.movie_title = movie.title;

                    callback();

                });
            },
            function (callback) {

                db.collection("clients").findOne({ _id: new mongo.ObjectID(doc.client_id) }, {fields: { first_name: 1, last_name: 1}}, function (err, client) {

                    if (err) {
                        res.status(500);
                        res.json({ error: true });

                        return;
                    }
                    doc.client_name = client.first_name + " " + client.last_name;

                    callback();

                });

            }], function (err) {
                if (err) {
                    res.status(500);
                    res.json({ error: true });

                    return;
                }
                res.json(doc);

            });


        });

    });

});

app.put("/movie/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        delete req.body._id;

        db.collection("movies").findAndModify({ _id: new mongo.ObjectID(id) }, {}, { $set: req.body }, { new: true }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json(doc);

        });

    });
});

app.put("/actor/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        delete req.body._id;

        db.collection("actors").findAndModify({ _id: new mongo.ObjectID(id) }, {}, { $set: req.body }, { new: true }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json(doc);


        });

    });
});

app.put("/category/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        delete req.body._id;

        db.collection("categories").findAndModify({ _id: new mongo.ObjectID(id) }, {}, { $set: req.body }, { new: true }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json(doc);


        });

    });
});

app.put("/client/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        delete req.body._id;

        db.collection("clients").findAndModify({ _id: new mongo.ObjectID(id) }, {}, { $set: req.body }, { new: true }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json(doc);


        });

    });
});

app.put("/rent/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        delete req.body._id;

        db.collection("rents").findAndModify({ _id: new mongo.ObjectID(id) }, {}, { $set: req.body }, { new: true }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json(doc);

        });

    });
});

app.post("/movies", function (req, res) {

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');


        db.collection("movies").insert(req.body, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }
            res.json(doc.ops[0]);

        });

    });
});

app.post("/actors", function (req, res) {

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');


        db.collection("actors").insert(req.body, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(doc.ops[0]);


        });

    });
});

app.post("/categories", function (req, res) {

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');


        db.collection("categories").insert(req.body, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(doc.ops[0]);


        });

    });
});

app.post("/clients", function (req, res) {

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');


        db.collection("clients").insert(req.body, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(doc.ops[0]);


        });

    });
});

app.post("/rents", function (req, res) {

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        req.body.date = new Date();

        db.collection("rents").insert(req.body, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(doc.ops[0]);


        });

    });
});

app.delete("/movie/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("movies").findAndRemove({ _id: new mongo.ObjectID(id) }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json({ deleted: true });

        });

    });
});

app.delete("/actor/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("actors").findAndRemove({ _id: new mongo.ObjectID(id) }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json({ deleted: true });

        });

    });
});

app.delete("/category/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("categories").findAndRemove({ _id: new mongo.ObjectID(id) }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json({ deleted: true });

        });

    });
});

app.delete("/client/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("clients").findAndRemove({ _id: new mongo.ObjectID(id) }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json({ deleted: true });

        });

    });
});

app.delete("/rent/:id", function (req, res) {

    var id = req.params.id
    isValid = mongo.ObjectID.isValid(id);


    if (!isValid) {
        res.status(500);
        res.json({ error: true });

        return;
    }

    MongoClient.connect(dbUrl, function (err, database) {

        const db = database.db('videoRental');

        db.collection("rents").findAndRemove({ _id: new mongo.ObjectID(id) }, function (err, doc) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }


            res.json({ deleted: true });

        });

    });
});

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
            res.status(500);
            res.json({ error: true });

            return;
        }

        MongoClient.connect(dbUrl, function (err, database) {

            const db = database.db('videoRental');

            if(err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

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
                        
                        if(err) {
                            res.status(500);
                            res.json({error: true});
                        }

                        res.status(200);
                        res.set("Content-Type", "text/plain");
                        res.send(String(count));
                    });

                });

            } else {

                db.collection(colname).count({$or: fields}, function(err, count) {

                    if(err) {
                        res.status(500);
                        res.json({ error: true });
    
                        return;
                    }
    
                    res.status(200);
                    res.set("Content-Type", "text/plain");
                    res.send(String(count));
    
                });

            }

            

    });

});


app.listen(port, () => console.log('Serwer aktywny!!'));