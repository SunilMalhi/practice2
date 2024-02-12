// Set up initial map center and zoom level
var map = L.map('map', {
  center: [41.57, -72.69], // EDIT latitude, longitude to re-center map
  zoom: 9,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
  scrollWheelZoom: false,
  tap: false
});

/* Control panel to display map layers */
var controlLayers = L.control.layers( null, null, {
  position: "topright",
  collapsed: false
}).addTo(map);

// display Carto basemap tiles with light features and labels
var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
controlLayers.addBaseLayer(light, 'Carto Light basemap');

// Read markers data from data.csv
$.get('Resources/Processed/SkiData.csv', function(csvString) {

// Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

    var marker = L.marker([row.Latitude, row.Longitude], {
      opacity: 1
    }).bindPopup(row.Country);
      
  marker.addTo(map);
  }

});
