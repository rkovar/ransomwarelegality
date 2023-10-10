console.log("Script started");

// Initialize the map
let mymap = L.map('map').setView([20, 0], 2);

// Add tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

// Load data from the YAML file
fetch('data.yml')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error fetching 'data.yml'! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(yamlText => {
        const geoData = jsyaml.load(yamlText);
        console.log("Loaded Geo Data:", geoData);

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

            console.log("Geo Data for Identifier:", geoData[identifier]);

            const citations = [];
            if (geoData[identifier]?.citation1) {
                citations.push(`<a href="${geoData[identifier].citation1}" target="_blank">Citation 1</a>`);
            }
            if (geoData[identifier]?.citation2) {
                citations.push(`<a href="${geoData[identifier].citation2}" target="_blank">Citation 2</a>`);
            }

            console.log("Generated Citations:", citations);

            const citationHTML = citations.length ? `<br>` + citations.join('<br>') : '';

            e.target.bindPopup(`<strong>${name}: Ransomware Payment Details</strong><br>${info}${citationHTML}`).openPopup();
        }

        // Fetch the merged GeoJSON data, add it to the map, and set up click interactions
        fetch('merged-data.geojson')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error fetching 'merged-data.geojson'! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                L.geoJson(data, {
                    style: styleFeature,
                    onEachFeature: function (feature, layer) {
                        layer.on({
                            click: onFeatureClick
                        });
                    }
                }).addTo(mymap);
            })
            .catch(e => {
                console.error("Error fetching merged-data.geojson:", e.message);
            });
    })
    .catch(e => {
        console.error("Error fetching data.yml:", e.message);
    });
