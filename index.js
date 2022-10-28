var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(4000);

app.get("/", function (request, response) {

    response.render("HomePage");
});

app.get("/appartements", (request, response) => {
    fetchData(object => {
        response.render("AppartPage", { object: object });
    })

});

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