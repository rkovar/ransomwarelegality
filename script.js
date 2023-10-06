// Initialize the map
let mymap = L.map('map').setView([20, 0], 2);

// Add tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

// Conditional data for countries and states
const geoData = {
    'AFG': { color: '', info:  'Afghanistan the taliban banned paying ransom in 2018' },
    'GBR': { color: 'grey', info:  'King Charles believes it is bad for buisness' },
    'Connecticut': { color: 'red', info:  'Conn. Gen. Stat. § 53a-262 Provides that a person is guilty of computer extortion by use of ransomware when such person introduces ransomware into any computer, computer system or computer network and demands payment of money or other consideration to remove the ransomware, restore access to the computer, computer system, computer network or data contained on such computer, computer system or computer network, or otherwise remediate the impact of the ransomware.' },
    'Louisiana': { color: 'red', info:  'La. Rev. Stat. §§ 51:2111 to 51:2116 Creates a registration system for managed service providers and managed security service providers doing business in the state with a public body. Provides access for public bodies to obtain information on managed service providers and managed security service providers. Requires managed service providers and managed security service providers to report to the Louisiana Fusion Center any cyber incidents and the payment of cyber ransom or ransomware. Acts 2020, No. 117, §2, eff. Feb. 1, 2021.' },
    'North Carolina': { color: 'red', info:  'NCGS § 143-800 (2021 S.B. 105 (art. 84)) Prohibits state agencies or local government entities from submitting payment or otherwise communicating with an entity that us making a ransomware demand.' },
    'Alaska': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Alabama': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Arkansas': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Arizona': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'California': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Colorado': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'DC': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Delaware': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Florida': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Georgia': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Hawaii': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Iowa': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Idaho': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Illinois': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Indiana': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Kansas': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Kentucky': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Massachusetts': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Maryland': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Maine': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Michigan': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Minnesota': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Missouri': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Mississippi': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Montana': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'North Dakota': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Nebraska': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'New Hampshire': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'New Jersey': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'New Mexico': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Nevada': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'New York': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Ohio': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Oklahoma': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Oregon': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Pennsylvania': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Rhode Island': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'South Carolina': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'South Dakota': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Tennessee': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Texas': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Utah': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Virginia': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Vermont': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Washington': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Wisconsin': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'West Virginia': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' },
    'Wyoming': { color: 'yellow', info: 'A 2020 ruling by the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC) and the Financial Crimes Enforcement Network (FinCEN) states most cases of paying a ransom are illegal.' }





    // ... Add other countries and states as needed
};

// Function to style features based on data
function styleFeature(feature) {
    const identifier = feature.id || feature.properties.name;
    return {
        fillColor: geoData[identifier]?.color || 'white',
        fillOpacity: 0.6,
        weight: 2
    };
}

// Function to handle click events on features (countries or states)
function onFeatureClick(e) {
    const name = e.target.feature.properties.name;  // For the popup title
    const identifier = e.target.feature.id;  // For looking up the data
    const info = geoData[identifier]?.info || 'No information available';
    e.target.bindPopup(`<strong>${name}: Ransomware Payment Details</strong><br>${info}`).openPopup();
}


// Fetch the merged GeoJSON data, add it to the map, and set up click interactions
var geojsonLayer;

fetch('merged-data.geojson')
    .then(response => response.json())
    .then(data => {
        geojsonLayer = L.geoJson(data, {
            style: styleFeature,
            onEachFeature: function (feature, layer) {
                layer.on({
                    click: onFeatureClick
                });
            }
        }).addTo(mymap);
    });

