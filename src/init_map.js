// Load the map centered on a location, intialize classes for later use
let map, geocoder, placesService, distanceMatrixService, directionsService, directionsRenderer, lastRoute1, lastRoute2, markersArray, placesResults, bounds, originPoint;
function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: {lat: 40.7828647, lng: -73.9653551},
    zoom: 12
  })
  geocoder = new google.maps.Geocoder();
  distanceMatrixService = new google.maps.DistanceMatrixService
  placesService = new google.maps.places.PlacesService(map)
  bounds = new google.maps.LatLngBounds()
  infoWindow = new google.maps.InfoWindow()
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  markersArray = []

}
