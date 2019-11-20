const express = require("express");
const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Connected on PORT: ${PORT}`));
