//Aviation Edge api
//234b97-f4a134

//Google maps platform api
// AIzaSyDFnMLHhIPMyVaVj-tWEU4H15JCryMYtos

var from;
var to;
var dateFrom;
var dateTo;
var dateFromConverted;
var dateToConverted;
var airlineCode;
var clearFlight = $("#actitivitesDivBodyPadding");
var clearActivities = $("#flightDivBodyPadding");
var background = $("#backgroundImage");
var tempModal = $("#temperatureModalButton");
var newsModal = $("#newsModalButton");
var main = $(".main");
var flight = $(".flight");
var activity = $(".activity");
var news = $(".news");
var destinationActivities = $(".destinationActivities");
var destinationCurrentAffairs = $(".destinationCurrentAffairs");

$("#search").on("click", function(e) {
  e.preventDefault();
  flight.empty();
  activity.empty();
  from = $("#from").val();
  to = $("#to").val();
  tempModal.css("display", "block");
  newsModal.css("display", "block");
  weather(to);
  currentNews(to);

  placeOfInterest(to);
  destinationActivities.append("<span> in " + to + "</span>");
  destinationCurrentAffairs.append("<span> in " + to + "</span>");
  dateFrom = $("#start").val();
  dateTo = $("#end").val();
  dateFromConverted = moment(dateFrom).format("DD/MM/YYYY");
  dateToConverted = moment(dateTo).format("DD/MM/YYYY");

  travelFrom(from);
});

function travelFrom(code) {
  var settings = {
    url:
      "https://aviation-edge.com/v2/public/autocomplete?key=234b97-f4a134&city=" +
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
      "https://aviation-edge.com/v2/public/autocomplete?key=234b97-f4a134&city=" +
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
      "&limit=3&curr=AUD&max_stopovers=1&sort=price&partner=picky",

    method: "GET"
  })
    .then(function(response) {
      console.log(response);

      if (response.data.length == 0) {
        flight.append("<p>No flights to show</p>");
      } else {
        response.data.forEach(function(item) {
          var flightContainer =
            "<li id='flightDisplayList' class='list-group-item mb-2 capitalize'>";

          if (item.route.length > 0) {
            item.route.forEach(function(path) {
              airlineCode = path.airline;
              arrivalTime = moment.unix(path.aTimeUTC).format("HH:mm");
              depatureTime = moment.unix(path.dTimeUTC).format("HH:mm");

              totalTime = item.fly_duration;
              fare = item.conversion.AUD;

              flightContainer +=
                //start row div
                "<div class='row capitalize'>" +
                //first column
                "<div class='col-md-2 flightHeader'>" + //flight carrier data
                "</div>" +
                //second column
                "<div class='col-md-2'>" +
                "<div>" +
                depatureTime +
                "</div><div>" +
                path.cityFrom +
                "</div>" +
                "</div>" +
                //third column
                "<div class='col-md-2'>" +
                "<div>" +
                arrivalTime +
                "</div><div>" +
                path.cityTo +
                "</div>" +
                "</div>";
              //fourth column
            });
            flightContainer +=
              "<div class='col-md-2 '>" +
              totalTime +
              "</div>" +
              //fifth column
              "<div class='col-md-2'><div>&nbsp;&nbsp;&nbsp;$" +
              fare +
              "</div>" +
              //sixth column
              "<div class='col-md-2'>" +
              "<a class='btn btn-primary' href=" +
              item.deep_link +
              ">Book</a> " +
              "</div>" +
              //closing row div
              "</div>";

            codeIataAirline(airlineCode, flightContainer);
          }
        });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
//removed the 2nd arugument from here
function codeIataAirline(code, currentFlightContainer) {
  $.ajax({
    url:
      "https://aviation-edge.com/v2/public/airlineDatabase?key=234b97-f4a134&connections=2&codeIataAirline=" +
      code,
    method: "GET"
  }).then(function(response) {
    var data = JSON.parse(response);
    console.log(data[0].nameAirline);

    // currentFlightContainer += "<p>" + data[0].nameAirline + "</p></li>";
    $(".flight").append(currentFlightContainer);
    $(".flightHeader").text(data[0].nameAirline);

    main.css("display", "block");
    background.hide();
  });
}

function placeOfInterest(place) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://api.foursquare.com/v2/venues/explore?client_id=2ZDZYBITSRLBTQDUWQZZRTI1M2WSRX12HAMIV41RZ202EJUB&client_secret=5FMLVF5KGOKXIXLLBLY3BWWI5ORKDJ1XQ3TFJOG2I1YHGOJ3&v=20180323&limit=10&near=" +
      place,
    method: "GET"
  };

  $.ajax(settings).done(function(response) {
    response.response.groups[0].items.forEach(function(item) {
      activity.append(
        "<li id='activitiesDisplayList1' class='list-group-item mb-2'>" +
          "<span class='capitalize'>" +
          item.venue.name +
          "</span></li>"
      );
    });
  });
}

function weather(location) {
  console.log(location);
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=" +
      location,
    method: "GET",
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "e45b480c59msh9749a20cfe00060p123db4jsna04589ddba47"
    }
  };

  $.ajax(settings).done(function(response) {
    temperature = Math.floor(response.main.temp);

    $(".temp").html(
      "<p style='color: blue'>The temperature in " +
        response.name +
        " is " +
        temperature +
        "&#xb0 C<p>"
    );
  });
}

function currentNews(place) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?&count=5&q=" +
      place,
    method: "GET",
    headers: {
      "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "e45b480c59msh9749a20cfe00060p123db4jsna04589ddba47"
    }
  };

  $.ajax(settings).done(function(response) {
    response.value.forEach(function(item) {
      news.append(
        "<a  href='" +
          item.url +
          "'<li id='activitiesDisplayList1' class='list-group-item mb-2'>" +
          "<span class='capitalize'>" +
          item.name +
          "</span></li>"
      );
    });
  });
}
