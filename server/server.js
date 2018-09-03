const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

app.listen(port, function() {
  console.log("server is running on port 3000");
});

console.log(publicPath);
