const express = require("express");
const cors = require("cors");
const next = require("next");

console.log("server.js: process.env.NEXT_PUBLIC_API_URL="+ process.env.NEXT_PUBLIC_API_URL)

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors({ origin: '*'}));

    server.get("/groups/:id", (req, res) => {
      const actualPage = "/groups";
      const queryParams = { id: req.params.id };
      console.dir("req.params.id = " + JSON.stringify(req.params.id));
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      // Added by WvH, see https://stackoverflow.com/questions/65058598/nextjs-cors-issue
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
      }

      return handle(req, res);
    });

    server.listen(process.env.PORT || 3000, (err) => {
      if (err) throw err;
      var port = process.env.PORT || 3000;
      console.log("> Ready on http://localhost:" + port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
