// Importamos express
const express = require("express")

// Generando la App Web
const app = express()

app.use(express.json())

require("./database")
app.use(require("./routes/index.routes.js"))

// Puerto del Servicio Web
app.listen(3000)
console.log("Server on port", 3000)

