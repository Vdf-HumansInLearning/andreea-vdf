// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const { v4: uuidv4 } = require('uuid');

const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create

app.post("/articles", (req, res) => {
    const articlesList = readJSONFile();
    const bodyInfo = req.body;
    const newArticle = {
            id: uuidv4(),
            ...bodyInfo
        }
        // modify articlesList to add a new element
    const newArticleList = [...articlesList, newArticle];
    writeJSONFile(newArticleList);
    res.json(newArticle);
    // save articlesList to file

});

// Read One

app.get("/articles/:id", (req, res) => {
    const articlesList = readJSONFile();
    const id = req.params.id;

    let article;
    for (let i = 0; i < articlesList.length; i++) {
        if (articlesList[i].id == id) {
            const nextId = i === articlesList.length - 1 ? null : articlesList[i + 1].id;
            const prevId = i === 0 ? null : articlesList[i - 1].id;
            article = {...articlesList[i], prevId, nextId };
        }
    }
    res.json(article);

});


// Read All

app.get("/articles", (req, res) => {
    const articlesList = readJSONFile();
    // res.json(articlesList);
    // Fill in your code here
    let indexStart = req.query.indexStart;
    let indexEnd = req.query.indexEnd;
    if (indexStart === undefined || indexEnd === undefined) {
        // res.json(articlesList);
        let articleListObject = {
            articles: articlesList,
            numberOfArticles: articlesList.length
        }
        res.json(articleListObject);
    } else {
        let newArticleList = articlesList.filter((article, index) => indexStart <= index && indexEnd >= index);
        // res.json(newArticleList);
        let articleListObject = {
            articles: newArticleList,
            numberOfArticles: articlesList.length
        }
        res.json(articleListObject);
    }
});

// Update
app.put("/articles/:id", (req, res) => {
    const articlesList = readJSONFile();
    const updatedArticleId = req.params.id;
    let index = "";
    articlesList.forEach((element, indexElement) => {
        if (element.id == updatedArticleId) {
            index = indexElement;
        }
    });
    const updatedArticle = req.body;
    articlesList[index] = {...updatedArticle, id: articlesList[index].id };
    writeJSONFile(articlesList);
    res.json(articlesList[index])
        // Fill in your code here
});

// Delete
app.delete("/articles/:id", (req, res) => {
    const articlesList = readJSONFile();
    const articleId = req.params.id;
    let articleIndex = '';

    if (!articleId) {
        res.status(404).send("article not found!");
        return;
    }
    articlesList.forEach((item, index) => {
        if (item.id == articleId) {
            articleIndex = index;
        }
    })

    if (articleIndex === '') {
        res.status(404).send("article not found!!!");
        return;
    }
    const newArticlesList = articlesList.filter(item => item.id != articleId);
    writeJSONFile(newArticlesList);
    res.json({})
        // Fill in your code here
});

// Reading function from db.json file
function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["articles"];
}

// Writing function from db.json file
function writeJSONFile(content) {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({ articles: content }),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

// Starting the server
app.listen("3002", () =>
    console.log("Server started at: http://localhost:3002")
);