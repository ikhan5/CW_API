const express = require("express");
const app = express();
const path = require('path');

//allows the use of folders i.e css, scripts etc.
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ extended: false }));

app.get("/", (request, response) => {
  response.json({
    msg: "Connected to seating plan application"
  });
});

app.get("/public", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use("/api/seating", require("./routes/seating"));

//for heroku hosting
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Connected on PORT: ${PORT}`));
