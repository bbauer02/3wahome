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
    getApparts(object => {
        response.render("AppartPage", { object: object });
    })

});
/**
 * 
 * Liste tous les appartements envoyés par l'API
 * @param {Object} func
 * 
 */
function getApparts(func) {
    fetch("http://localhost:3000/bien")
        .then(res => res.json()) /* les données json sont converties en objet Javascript */
        .then(res => {
            return func(res); /* Résolution de la Promise envoyée par json() */
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
}