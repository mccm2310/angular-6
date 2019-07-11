    
var express = require("express"), cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Server running on port 3000"));

var ciudades = [ "Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de Chile", "Mexico DF", "Nueva York" ];
app.get("/ciudades", (req, res, next) => res.json(ciudades.filter((c)=> c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
  console.log(req.body);
  misDestinos.push(req.body.nuevo);
  res.json(misDestinos);
});

var data = 
{ 
  es : [
    {key:'Home', value: 'Inicio'},
    {key:'Destination', value: 'Destino'},
    {key: 'Hi', value: 'Hola'},
    {key: 'Date', value: 'Fecha'},
    {key: 'Wish list', value: 'Lista de Deseos'},
    {key: 'New destination', value: 'Cargar un destino'}
  ],
  en : [
    {key:'Home', value: 'Home'},
    {key:'Destination', value: 'Destination'},
    {key: 'Hi', value: 'Hi'},
    {key: 'Date', value: 'Date'},
    {key: 'Wish list', value: 'Wish List'},
    {key: 'New destination', value: 'New Destination'}
  ],
  fr : [
    {key:'Home', value: 'La Maison'},
    {key:'Destination', value: 'Destination'},
    {key: 'Hi', value: 'Salut'},
    {key: 'Date', value: 'Date'},
    {key: 'Wish list', value: 'Liste de Voeux'},
    {key: 'New destination', value: 'Nouvelle Destination'}
  ]
}

app.get("/api/translation", (req, res, next) => res.json(
 // [{lang: req.query.lang, key: 'HOLA', value: 'HOLA ' + req.query.lang}]
    [{
      keysObj: data[req.query.lang],
      lang: req.query.lang
    }]
));

