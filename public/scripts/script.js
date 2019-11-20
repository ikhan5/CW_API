window.onload = function() {
  let name = document.querySelector(".lookup_input");
  let lookupForm = document.querySelector(".lookup_form");

  let foundUser = document.querySelector(".found");
  let seatingHeader = document.querySelector(".seating_header");
  let seatingFloor = document.querySelector(".seating_floor");
  let seatingLetter = document.querySelector(".seating_letter");

  let errorMessage = document.querySelector(".error");
  let seatingError = document.querySelector(".seating_error");

  lookupForm.addEventListener("submit", event => {
    event.preventDefault();

    let fullName = name.value.split(" ");

    fetch("./api/seating/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        first_name: fullName[0],
        last_name: fullName[1]
      })
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.seatInfo[0] === "undefined") {
          errorMessage.style.display = "block";
          foundUser.style.display = "none";
          seatingError.innerHTML = `Sorry, cannot find ${fullName[0] +
            " " +
            fullName[1]} in the system`;
        } else {
          errorMessage.style.display = "none";
          foundUser.style.display = "block";
          const { first_name, floor, seat } = data.seatInfo[0];
          seatingHeader.innerHTML = `${first_name} is seated on`;
          seatingFloor.innerHTML = `Floor ${floor}`;
          seatingLetter.innerHTML = `Seat ${seat}`;
        }
      });
  });
};
