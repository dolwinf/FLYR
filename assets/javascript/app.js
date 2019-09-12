$.ajax({
  url:
    "https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky",
  method: "GET"
}).then(function(response) {
  console.log(response);
});
