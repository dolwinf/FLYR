//Aviation Edge api
//234b97-f4a134
var from;
var to;
var dateFrom;
var dateTo;
var dateFromConverted;
var dateToConverted;

$("button").on("click", function(e) {
  e.preventDefault();
  from = $("#from").val();
  to = $("#to").val();
  dateFrom = $("#start").val();
  dateTo = $("#end").val();
  dateFromConverted = moment(dateFrom).format("DD/MM/YYYY");
  dateToConverted = moment(dateTo).format("DD/MM/YYYY");

  travelFrom(from);
});

function travelFrom(code) {
  var settings = {
    url:
      "http://aviation-edge.com/v2/public/autocomplete?key=234b97-f4a134&city=" +
      code,
    method: "GET"
  };

  $.ajax(settings).then(function(response) {
    var fromValue = JSON.parse(response);
    from = fromValue.cities[0].codeIataCity;
    console.log(from);
    travelTo(to);
  });
}

function travelTo(code) {
  var settings = {
    url:
      "http://aviation-edge.com/v2/public/autocomplete?key=234b97-f4a134&city=" +
      code,
    method: "GET"
  };

  $.ajax(settings).then(function(response) {
    toValue = JSON.parse(response);
    to = toValue.cities[0].codeIataCity;
    console.log(to);
    kiwi(from, to);

    //clear form values after submission
    $("#from").val("");
    $("#to").val("");
    $("#start").val("");
    $("#end").val("");
  });
}

function kiwi(from, to) {
  $.ajax({
    url:
      "https://api.skypicker.com/flights?flyFrom=" +
      from +
      "&to=" +
      to +
      "&dateFrom=" +
      dateFromConverted +
      "&dateTo=" +
      dateToConverted +
      "&limit=5&currency=AUD&partner=picky",

    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    console.log(response.data[0].airlines);
  });
}
//http://aviation-edge.com/v2/public/autocomplete?key=234b97-f4a134&city=ams

// https://api.skypicker.com/flights?flyFrom=mumbai&to=sydney&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky

//================ Below to be executed after we get actual data from the kayak api ========================================================================

//variables required
//travelFrom
//travelTo
//departureDate
//returnDate
//cabinClass
//passengerNumber
//currency

// https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2019&dateTo=12/12/2019&sort=price&limit=5&partner=picky

//Flight IATA code to Flight name
//https://aviation-edge.com/v2/public/airlineDatabase?key=234b97-f4a134&codeIataAirline=AR

function codeIataAirline(code) {
  $.ajax({
    url:
      "https://aviation-edge.com/v2/public/airlineDatabase?key=234b97-f4a134&codeIataAirline=" +
      code,
    method: "GET"
  }).then(function(response) {
    var data = JSON.parse(response);
    console.log(data[0].nameAirline);
  });
}

codeIataAirline("AR");
