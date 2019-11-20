const express = require("express");
const router = express.Router();
var seatingPlan = require("../data/seating_plan.json");

//METHOD: POST
//URL: /api/seating/
//DESC: Gets single seating plan based on first and last name
router.post("/", (request, response) => {
  const { first_name, last_name } = request.body;
  let seatInfo = seatingPlan.filter(
    seat => seat.first_name === first_name && seat.last_name === last_name
  );

  response.json({
    seatInfo
  });
});

module.exports = router;
