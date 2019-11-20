const express = require("express");
const router = express.Router();
var seatingPlan = require("../data/seating_plan.json");

//METHOD: POST
//URL: /api/seating/
//DESC: Gets single seating plan based on first and last name
router.post("/", (request, response) => {
  const { first_name, last_name } = request.body;
  let seatInfo = [];
  if (first_name && last_name) {
    seatInfo = seatingPlan.filter(
      seat =>
        seat.first_name.toLowerCase() === first_name.toLowerCase() &&
        seat.last_name.toLowerCase() === last_name.toLowerCase()
    );
  }

  response.json({
    seatInfo
  });
});

module.exports = router;
