var placeFrom = "SYD";
var placeTo = "NYC";
var dateFrom = "18/11/2019";
var dateTo = "20/11/2019";

$.ajax({
  url:
    "https://api.skypicker.com/flights?flyFrom=" +
    placeFrom +
    "&to=" +
    placeTo +
    "&dateFrom=" +
    dateFrom +
    "&dateTo=" +
    dateTo +
    "&limit=10&partner=picky",
  method: "GET"
}).then(function(response) {
  console.log(response);
});
