const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname + "/cartPage.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/manageWallet", (req, res) => {
  res.sendFile(path.join(__dirname + "/manageWallet.html"));
});




const server = app.listen(process.env.PORT||3000);
const portNumber = server.address().port;
console.log(`port: ${portNumber}`);
