// Initialize the map
let mymap = L.map('map').setView([20, 0], 2);

// Add tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

// Load data from the YAML file
fetch('data.yml')
    .then(response => response.text())
    .then(yamlText => {
        const geoData = jsyaml.load(yamlText);

        // Function to style features based on data
        function styleFeature(feature) {
            const identifier = feature.id;
            return {
                fillColor: geoData[identifier]?.color || 'white',
                fillOpacity: 0.6,
                weight: 2
            };
        }

        // Function to handle click events on features (countries or states)
        function onFeatureClick(e) {
            const identifier = e.target.feature.id;
            const name = e.target.feature.properties.name;
            const info = geoData[identifier]?.info || 'No information available';
            const citation = geoData[identifier]?.citation ? `<br><a href="${geoData[identifier].citation}" target="_blank">Citation</a>` : '';
            
            e.target.bindPopup(`<strong>${name}: Ransomware Payment Details</strong><br>${info}${citation}`).openPopup();
        }

        // Fetch the merged GeoJSON data, add it to the map, and set up click interactions
        fetch('merged-data.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJson(data, {
                    style: styleFeature,
                    onEachFeature: function (feature, layer) {
                        layer.on({
                            click: onFeatureClick
                        });
                    }
                }).addTo(mymap);
            });
    });
