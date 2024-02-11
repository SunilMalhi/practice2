function createMap(Resorts) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the Resorts layer.
  let overlayMaps = {
    "Resorts": Resorts
  };

  // Create the map object with options.
  let map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, Resorts]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

// Read markers data from data.csv
function loadCSVData() {
  d3.csv(".../Resources/Processed/locations2.csv", function(result) {
    result.forEach(function (Resort) {
      addMarker(Resort);
    });
  });
}

function addMarker(Resort) {
  L.marker([Resort.latitude, Resort.longitude])
    .bindPopup([Resort.State/Province, Resort.Country])
    .addTo(map);
}