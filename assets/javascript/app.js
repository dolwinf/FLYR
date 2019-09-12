$.ajax({
  url:
    "https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky",
  method: "GET"
}).then(function(response) {
  console.log(response);
});
