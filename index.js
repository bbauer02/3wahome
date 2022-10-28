var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(4000);


/*
app.get("/", function (request, response) {

    response.render("homePage", {
        data: data
    });
});*/

app.get("/appartements", function (request, response) {

    response.render("testPage");
});
app.get("/", (request, response) => {
    fetchData(object => {
        response.render("HomePage", { object: object });
    })

});
function getAppart() {
    const http = require('http');

    http.get('http://localhost:3000/bien', (resp) => {
        let data = '';

        // Un morceau de réponse est reçu
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // La réponse complète à été reçue. On affiche le résultat.
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function fetchData(callback) {
    fetch("http://localhost:3000/bien") //Could change this to a find request to the data base directly like Teacher.find()...
        .then(res => res.json())
        .then(res => {
            return callback(res);
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
}