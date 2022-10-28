/**
 * 
 * Configuration du serveur Node.
 * L'application sera disponible sur http://localhost:4000
 * 
 */
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(4000);

/**
 * 
 * Route : Accueil
 * 
 */
app.get("/", function (request, response) {

    response.render("HomePage");
});
/**
 * 
 * Route : Liste des appartements
 * 
 */
app.get("/appartements", (request, response) => {
    fetchData(object => {
        response.render("AppartPage", { object: object });
    })

});
/**
 * 
 * Attrape la liste des appartements envoyés par l'API
 * @param {Object} callback 
 * 
 */
function fetchData(func) {
    fetch("http://localhost:3000/bien") //Could change this to a find request to the data base directly like Teacher.find()...
        .then(res => res.json())
        .then(res => {
            return func(res);
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
}