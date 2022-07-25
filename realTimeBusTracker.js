let marcadores = {};

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFjYW11cyIsImEiOiJjbDVpZXFhMmQwN2F1M2JvOXJqZGFsbWY5In0.Co6Kds6pz-RigFc8JMvFbw';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10',
	center :[-71.104081, 42.365554],
	zoom: 14
});
const locations = "";
async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	for (i=0; i<locations.length; i++){
		let label = locations[i].attributes.label;
		let lat = locations[i].attributes.latitude;
		let lon = locations[i].attributes.longitude;
		//console.log(label,lat,lon)
		if (marcadores[label] === undefined){
				marcadores[label] = new mapboxgl.Marker()
				.setLngLat([lon, lat])
				.addTo(map);
			}
		else{
			marcadores[label].setLngLat([lon, lat])
			.addTo(map);
		}
	}


	// timer
	setTimeout(run, 15000);
}



// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();