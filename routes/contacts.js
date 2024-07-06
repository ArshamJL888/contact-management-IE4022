const express = require("express");
const contactsController = require("../controllers/contacts");

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(contactsController.getAll)
  .post(contactsController.register);

contactsRouter
  .route("/:id")
  .get(contactsController.getById)
  // .put(contactsController.edit)
  .delete(contactsController.remove);
  
contactsRouter
.route("/find")
.post(contactsController.find)

module.exports = contactsRouter;
