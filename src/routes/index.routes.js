
/*
const {Router} = require('express')

const router = Router()

//const ModelUser = require("../models/usersModel.js");
const ModelRole = require("../models/rolesModel.js");
const ModelSessionToken = require("../models/sessionTokensModel.js");
const ModelProduct = require("../models/productsModel.js");
const ModelOrder = require("../models/ordersModel.js");
const ModelShoppingCart = require("../models/shoppingCartsModel.js");
const ModelReview = require("../models/reviewModel.js");
const ModelReviewComment = require("../models/reviewCommentsModel.js");
const ModelFavoriteProduct = require("../models/favoriteProductsModel.js");
const ModelReaction = require("../models/reactionsModel.js");

router.get("/", (req, res) => {
    res.send("Lunette App")
})

module.exports = router 
*/
// Operaciones CRUD para User
// Create

/*
router.post("/users", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelUser.create(body);
  res.send(respuesta);
});
// Read
router.get("/users/ls", async (req, res) => {
  const respuesta = await ModelUser.find({});
  res.send(respuesta);
});
// Update
router.put("/users/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
// Delete
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelUser.deleteOne({ _id: id });
  res.send(respuesta);
});


// Operaciones CRUD para Role
router.post("/roles", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelRole.create(body);
  res.send(respuesta);
});
router.get("/roles/ls", async (req, res) => {
  const respuesta = await ModelRole.find({});
  res.send(respuesta);
});
router.put("/roles/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelRole.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/roles/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelRole.deleteOne({ _id: id });
  res.send(respuesta);
});


// Operaciones CRUD para Session Token
router.post("/session_tokens", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelSessionToken.create(body);
  res.send(respuesta);
});
router.get("/session_tokens/ls", async (req, res) => {
  const respuesta = await ModelSessionToken.find({});
  res.send(respuesta);
});
router.put("/session_tokens/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelSessionToken.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/session_tokens/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelSessionToken.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Product
/*
router.post("/products", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelProduct.create(body);
  res.send(respuesta);
});
router.get("/products/ls", async (req, res) => {
  const respuesta = await ModelProduct.find({});
  res.send(respuesta);
});
router.put("/products/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelProduct.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelProduct.deleteOne({ _id: id });
  res.send(respuesta);
});*/


// Operaciones CRUD para Category
/*
router.post("/categories", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelCategory.create(body);
  res.send(respuesta);
});
router.get("/categories/ls", async (req, res) => {
  const respuesta = await ModelCategory.find({});
  res.send(respuesta);
});
router.put("/categories/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelCategory.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/categories/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelCategory.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Order
/*
router.post("/orders", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelOrder.create(body);
  res.send(respuesta);
});
router.get("/orders/ls", async (req, res) => {
  const respuesta = await ModelOrder.find({});
  res.send(respuesta);
});
router.put("/orders/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelOrder.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/orders/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelOrder.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Shopping Cart
/*
router.post("/shopping_carts", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelShoppingCart.create(body);
  res.send(respuesta);
});
router.get("/shopping_carts/ls", async (req, res) => {
  const respuesta = await ModelShoppingCart.find({});
  res.send(respuesta);
});
router.put("/shopping_carts/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelShoppingCart.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/shopping_carts/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelShoppingCart.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Review
/*
router.post("/reviews", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelReview.create(body);
  res.send(respuesta);
});
router.get("/reviews/ls", async (req, res) => {
  const respuesta = await ModelReview.find({});
  res.send(respuesta);
});
router.put("/reviews/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelReview.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelReview.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Review Comment
/*
router.post("/review_comments", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelReviewComment.create(body);
  res.send(respuesta);
});
router.get("/review_comments/ls", async (req, res) => {
  const respuesta = await ModelReviewComment.find({});
  res.send(respuesta);
});
router.put("/review_comments/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelReviewComment.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/review_comments/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelReviewComment.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Favorite Product
/*
router.post("/favorite_products", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelFavoriteProduct.create(body);
  res.send(respuesta);
});
router.get("/favorite_products/ls", async (req, res) => {
  const respuesta = await ModelFavoriteProduct.find({});
  res.send(respuesta);
});
router.put("/favorite_products/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelFavoriteProduct.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/favorite_products/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelFavoriteProduct.deleteOne({ _id: id });
  res.send(respuesta);
});
*/

// Operaciones CRUD para Reaction
/*
router.post("/reactions", async (req, res) => {
  const body = req.body;
  const respuesta = await ModelReaction.create(body);
  res.send(respuesta);
});
router.get("/reactions/ls", async (req, res) => {
  const respuesta = await ModelReaction.find({});
  res.send(respuesta);
});
router.put("/reactions/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelReaction.findOneAndUpdate({ _id: id }, body);
  res.send(respuesta);
});
router.delete("/reactions/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelReaction.deleteOne({ _id: id });
  res.send(respuesta);
});
*/