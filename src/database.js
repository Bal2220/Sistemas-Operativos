const mongoose = require("mongoose");

// ENV Produccion
mongoose.connect("mongodb://admin:admin123@172.191.215.190:27017/LunetteApp?authSource=admin")
  .then(db => console.log("DB is connected to", db.connection.host))
  .catch(err => console.error(err));

// ENV DEV
//mongoose.connect("mongodb://localhost:27018/LunetteAppDB")
//    .then(db=>console.log("DB is connected to ", db.connection.host))
//    .catch(err => console.error(err));
