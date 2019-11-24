const engine = require("consolidate");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.set("views", `${path.join(__dirname, "/views")}`);
app.use(express.static(path.join(__dirname, "/public")));
app.engine("html", engine.mustache);
app.set("view engine", "html");

app.get("/", (req, res) => {
    res.render("index.html");
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost: ${ port }`);
});
