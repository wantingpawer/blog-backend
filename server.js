const express = require("express");
const port = process.env.port || 1337

const mongodb = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/";
var postData = {}

const app = express();
const router = express.Router();

mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var database = db.db("posts");
    database.collection("posts").findOne({}, (err, res) => {
        if (err) throw err;
        postData = res;
        db.close();
    })
})

router.get("/posts", (req, res) => {
    res.json(postData);
    res.send();
});

router.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    const post =  postData.data[id];
    res.json(post);
    res.send();
})

app.use("/api", router);

app.listen(port);