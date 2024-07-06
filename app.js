const express = require("express");
const bodyParser = require("body-parser");
const contactsRouter = require("./routes/contacts");

require("./configs/db");

const app = express(); // server
// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/contacts/", contactsRouter);

app.listen(3000, () => {
  console.log(`Server Running On Port 3000`);
});
