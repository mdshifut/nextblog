const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      auth: {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD
      }
    });
  } else {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    });
  }

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => console.log("We are connected with our data  base"));

  server.use(cors());
  server.use(morgan("dev"));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  // API
  // User Route
  server.use("/api/user", require("./routes/userRoutes"));

  // Post Route
  server.use("/api/post", require("./routes/postRoutes"));

  // Comment Route
  server.use("/api/comment", require("./routes/commentRoutes"));

  // Reply Route
  server.use("/api/reply", require("./routes/replyRoutes"));

  // Reply Route
  server.use("/api/category", require("./routes/categoryRoute"));
  // Root route

  // serve pages

  server.get("/registrationconfirmation/:id", (req, res) => {
    const actualPage = "/registrationconfirmation";
    const queryParams = { id: req.params.id };
    return app.render(req, res, actualPage, queryParams);
  });

  server.get("/activeaccount/:token/:user", (req, res) => {
    const { token, user } = req.params;
    const actualPage = "/activeaccount";
    const queryParams = { token, user };
    return app.render(req, res, actualPage, queryParams);
  });
  server.get("/createnewpassword/:token", (req, res) => {
    console.clear();
    console.log("we are working");

    const { token } = req.params;
    const actualPage = "/createnewpassword";
    const queryParams = { token };
    return app.render(req, res, actualPage, queryParams);
  });

  server.get("*", (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready On ${PORT}`);
  });
});
