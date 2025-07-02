// Importamos express
const express = require("express")
const cors = require('cors');
// Generando la App Web
const app = express()

app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));


app.use(express.json());


const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const shoppingCartRoutes = require("./routes/shoppingcartRoutes.js"); 
const reviewRoutes = require("./routes/reviewRoutes"); 
const favoriteProductRoutes = require("./routes/favoriteProductRoutes");

//------->
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
  res.render('caratula');  // Esto renderiza 'caratula.ejs'
});
//------->
 
 
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/shopping_carts", shoppingCartRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorite_products", favoriteProductRoutes);

require("./database")
//app.use(require("./routes/index.routes.js"))

// Puerto del Servicio Web
app.listen(3000)
console.log("Server on port", 3000)

