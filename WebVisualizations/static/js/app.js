console.log("first line");
// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});
// mapbox://styles/mapbox/dark-v10
var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});
// mapbox://styles/mapbox/satellite-streets-v11
var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});
var comicmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.comic",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  pm10: new L.LayerGroup(),
  pm25: new L.LayerGroup(),
  co: new L.LayerGroup(),
  no2: new L.LayerGroup(),
  o3: new L.LayerGroup(),
  bc: new L.LayerGroup(),
  so2: new L.LayerGroup(),
};


var baseMaps = {
  "Light Map": lightmap,
  "Dark Map": darkmap,
  "Satellite": satellitemap,
  "Outdoors": outdoorsmap,
  "Comic": comicmap
}

// Create the map with our layers
function createMap() {
  var map = L.map("map", {
    center: [38.6270, -90.1994],
    zoom: 5,
    layers: [
      layers.pm10
      // layers.pm25,
      // layers.co,
      // layers.no2,
      // layers.o3,
      // layers.bc,
      // layers.so2
    ]
  });


  // Add our 'lightmap' tile layer to the map
  satellitemap.addTo(map);
  console.log(map);

  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, overlays, {
    collapsed: false
  }).addTo(map); // i don't want baselayer to be selectable

  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);
  console.log(map);
}





// Create an overlays object to add to the layer control
var overlays = {
  "PM10": layers.pm10,
  "PM25": layers.pm25,
  "CO": layers.co,
  "NO2": layers.no2,
  "O3": layers.o3,
  "BC": layers.bc,
  "SO2": layers.so2
};





console.log("before createMarkers");

function createMarkers(airquality_combined2) {

  d3.json("/metadata/all").then(function (airquality_combined) {
    console.log("beginning of createMarkers");
    console.log(airquality_combined);



    // Pull the "features" property off of response.data
    // var parameters = airquality_combined.parameter;

    // console.log(parameters)
    //console.log("features[1]")       // works
    //console.log(features[1])        // works
    // data comes from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

    // Initialize an array to hold quake markers
    var avgvalueMarkers = [];

    // console.log("right before for loop");       // works

    // Loop through the features array
    for (var index = 0; index < airquality_combined.length; index++) {
      var parameter = airquality_combined[index];
      // console.log(feature);       // works


      function chooseColor(parameter) {
        var avgvalue = parameter.avgvalue;
        var parametercolor = parameter.parameter;

        if (parametercolor == "o3") {
          return "darkred";
        } else if (parametercolor == "so2") {
          return "purple";
        } else if (parametercolor == "bc") {
          return "orange";
        } else if (parametercolor == "no2") {
          return "yellow";
        } else if (parametercolor == "pm10") {
          return "blue";
        } else if (parametercolor == "pm25") {
          return "DarkSeaGreen";
        } else if (parametercolor == "co") {
          return "Gray";
        } else {
          return "lightgreen";
        }
      };




      var scalingFactors = {
        'o3': 1250,
        'pm10': 0.5,
        'pm25': 1.5,
        'so2': 20000,
        'no2': 2000,
        'bc': 25,
        'co': 50
      }
      console.log(parameter.parameter)


      var quakeMarker = L.circleMarker([parameter.coordinates_latitude, parameter.coordinates_longitude], {
          color: chooseColor(parameter)
        })
        // var quakeMarker = L.marker([19.844, -155.371])      // manual coordinates work
        .bindPopup("<h3>Location: " + parameter.city + "<h3><h3>ppm: " + parameter.avgvalue + "<h3>Pollutant: " +
          parameter.parameter + "<h3>Coordinates: " + parameter.coordinates_latitude + ", " + parameter.coordinates_longitude +
          "<br><a href='" + "http://www.cnn.com" + "'>Add'l Details</a>" +
          // "<br><a href='" + "http://www.cnn.com" + "'>Radar</a>")
          "<br><a href='" + "test_chart_js2.html" + "'>Radar Chart</a>")


        // .setRadius(50); // try a function in here to evaluate size
        .setRadius((parameter.avgvalue) * scalingFactors[parameter.parameter])
      // .fillColor("red")
      // Add the marker to the quakeMarkers array
      // avgvalueMarkers.push(quakeMarker);

      quakeMarker.addTo(layers[parameter.parameter]);
    }
    console.log("end of quakeMarker");
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap();
    // (L.layerGroup(avgvalueMarkers), L.layerGroup(avgvalueMarkers));
    // first quakeMarkers is real data, second time to spoof "test" variable
  });
};
console.log("outside quakeMarker function");







// Initialize an object containing icons for each layer group
// var pollutionMarker = L.circleMarker([coordinates_latitude, coordinates_longitude, { color: chooseColor(feature) })


console.log("before buildSomething");
// Perform an API call to the Citi Bike Station Information endpoint
function buildSomething(test) {
  console.log("ran buildSomething");
  d3.json("../metadata/all").then(function (pollutant) {
    console.log("calling json")
    console.log(pollutant)
    // var dirtyAir = [parameter];
    // console.log(dirtyAir);
    // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
    // d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function (statusRes) {
    // var updatedAt = infoRes.last_updated;
    // var stationStatus = statusRes.data.stations; // array of stations
    var dirty = combined_US.city; // array of stations
    var value = pollutant.value;
    console.log(dirty);
    console.log(value);

    // Create an object to keep of the number of markers in each layer
    var pollutantCount = {
      PM10: 0,
      PM25: 0,
      CO: 0,
      NO2: 0,
      O3: 0,
      BC: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var pollutantLayers;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < dir.length; i++) {

      // Create a new station object with properties of both station objects
      var station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (!station.is_installed) {
        stationStatusCode = "PM10";
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "PM25";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "O3";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "CO";
      }
      // Otherwise the station is normal
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "NO2";
      }
      // Otherwise the station is normal
      else {
        stationStatusCode = "BC";
      }

      // Update the station count
      stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([station.lat, station.lon], {
        icon: icons[stationStatusCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount);
  });



  console.log("after buildSomething");

  // Update the legend's innerHTML with the last updated time and station count
  function updateLegend(time, stationCount) {
    document.querySelector(".legend").innerHTML = [
      "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
      "<p class='out-of-order'>O3: " + stationCount.O3 + "</p>",
      "<p class='coming-soon'>PM10: " + stationCount.PM10 + "</p>",
      "<p class='empty'>PM25: " + stationCount.PM25 + "</p>",
      "<p class='low'>CO: " + stationCount.CO + "</p>",
      "<p class='healthy'>NO2: " + stationCount.NO2 + "</p>",
      "<p class='cow'>BC: " + stationCount.BC + "</p>"
    ].join("");
  }
}

console.log("after updateLegend");
d3.json("../metadata/all", createMarkers);