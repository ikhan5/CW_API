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

          if (!fullName[1]) {
            fullName[1] = "";
          }
          seatingError.innerHTML = `${fullName[0] +
            " " +
            fullName[1]} in the system`;
        } else {
          errorMessage.style.display = "none";
          foundUser.style.display = "block";
          const { first_name, floor, seat } = data.seatInfo[0];

          if (!first_name) {
            first_name = "";
          }

          seatingHeader.innerHTML = `${first_name} is seated on`;
          seatingFloor.innerHTML = `Floor ${floor}`;
          seatingLetter.innerHTML = `Seat ${seat}`;
        }
      });
  });
};

window.onresize = function() {
  var width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  var height = Math.max(
    document.documentElement.clientHeight,
    window.innerWidth || 0
  );

  let html = document.querySelector("html");
  let body = document.querySelector("body");

  html.style.width = width;
  body.style.width = width;
  html.style.height = height;
  body.style.height = height;
};
