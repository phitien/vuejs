const express = require("express");
const app = express();
const port = process.env.PORT || 8081;

app.use(express.static(__dirname));
app.use("/", express.static(__dirname + "/dist"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => console.log(`Server is running on port ${port}!`));
