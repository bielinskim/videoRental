const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
dbUrl = "mongodb://localhost:27017/videoRental";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendfile('index.html'));

app.get("/movies", function (req, res) {

    var limit = parseInt(req.query.limit);

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('movies').find({}, { limit: limit }).toArray(function (err, docs) {

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
        name = req.query.name,
        regex = new RegExp(name, "ig");

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('actors').find({ name: regex }, { limit: limit }).toArray(function (err, docs) {

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

    var limit = parseInt(req.query.limit);

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('clients').find({}, { limit: limit }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(docs);


        });
    });
});

app.get("/categories", function (req, res) {

    var name = req.query.name,
        regex = new RegExp(name, "ig");

    MongoClient.connect(dbUrl, function (err, database) {

        if (err) {
            res.status(500);
            res.json({ error: true });

            return;
        }

        const db = database.db('videoRental');
        db.collection('categories').find({ name: regex }).toArray(function (err, docs) {

            if (err) {
                res.status(500);
                res.json({ error: true });

                return;
            }

            res.json(docs);



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


            res.json(docs[0]);


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

app.listen(port, () => console.log('Serwer aktywny!!'));