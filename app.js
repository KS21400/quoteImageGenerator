var http = require("http");
var express = require("express");
const textToImage = require("text-to-image");
var path = require("path");

var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("listening...");
});

app.use(bodyParser.json());

app.use(cors());

app.post("/", async (req, res) => {
  //   "Your Quote";

  let value = req.body.value !== "" ? req.body.value : "Your Quote";

  let dataUri = await textToImage.generate(value, {
    debug: true,
    maxWidth: 1000,
    customHeight: 500,
    fontSize: 18,
    fontFamily: "Arial",
    lineHeight: 30,
    textAlign: "center",
    verticalAlign: "center",
    bgColor: "black",
    fontPath: "Lato-BoldItalic.ttf",
    fontFamily: "Lato, sans-serif",
    lineHeight: 80,
    textColor: req.body.color,
    fontWeight: 700,
    fontSize: 56,
  });
  res.header("Access-Control-Allow-Origin", "*");

  res.status(200).send({
    message: "success",
    code: 200,
    data: dataUri,
  });
});
app.use("/", express.static(path.join(__dirname, "build")));
