// Load the map centered on a location, intialize classes for later use
let map, geocoder, service, markers, bounds;
function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: {lat: 40.7828647, lng: -73.9653551},
    zoom: 12
  })
  geocoder = new google.maps.Geocoder();
  service = new google.maps.places.PlacesService(map)
  bounds = new google.maps.LatLngBounds()
  infoWindow = new google.maps.InfoWindow()
  markers = []
}
