// Store our API endpoint as queryUrl.
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Create a map object.
let myMap = L.map("map", {
    center: [5.205630, 95.153353],
    zoom: 3
  });
  
// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(queryURL).then((data) => {
    features = data.features

    // Loop through the countries array, and create one marker for each country object.
    for (let i = 0; i < features.length; i++) {

        // Conditionals for 
        let color = "";
        if (features[i].geometry.coordinates[2] < 10) {
          color = "#dfce20";
        }
        else if (features[i].geometry.coordinates[2] < 30) {
          color = "#dd8d22";
        }
        else if (features[i].geometry.coordinates[2] < 50) {
          color = "#c5633a";
        }
        else if (features[i].geometry.coordinates[2] < 70) {
            color = "#b8476d";
        }
        else if (features[i].geometry.coordinates[2] < 90) {
            color = "#9545ba";
        }
        else {
          color = "#4d3cc3";
        }

        L.circle([features[i].geometry.coordinates[0], features[i].geometry.coordinates[1]], {
            fillOpacity: 0.90,
            color: "black",
            weight: 1,
            fillColor: color,
            // Adjust the radius.
            radius: features[i].properties.mag * 50000
          }).bindPopup(`<h1>${features[i].properties.place}</h1> <hr> 
          <p>Magnitude: ${features[i].properties.mag}</p>
          <p>Depth: ${features[i].geometry.coordinates[2]}</p>`).addTo(myMap);
    
    }
})

/*Legend specific*/
var legend1 = L.control({ position: "bottomright" });

legend1.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML += '<i style="background: #dfce20"></i><span>Less than 10></span><br>';
    div.innerHTML += '<i style="background: #dd8d22"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #c5633a"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #b8476d"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #9545ba"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #4d3cc3"></i><span>90+</span><br>';
  
    return div;
};

 // Adding the legend to the map
 legend1.addTo(myMap);
