let platform = new H.service.Platform({
    'apikey': 'YKxTbZh74-q4FmBXXyy4sTH_yMRYRrAemShOpFehxL0'
  });

  // Obtain the default map types from the platform object:
  //let defaultLayers = platform.createDefaultLayers();

// Calculates and displays the location of the 'Eiffel Tower'using a landmark geocoding search
//A full list of available request parameters can be found in the Geocoder API documentation.
//see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-search.html
//@param   {H.service.Platform} platform    A stub class to access HERE services

function landmarkGeocode() {
  let title = document.querySelector('h1').textContent;
  let geocoder = platform.getGeocodingService(),
    landmarkGeocodingParameters = {
      searchtext: title,
      jsonattributes : 1
    };

  geocoder.search(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}
function showMap(result) {
  let location = result.response.view[0].result[0].place.locations[0].displayPosition;
  let defaultLayers = platform.createDefaultLayers();
  // Instantiate (and display) a map object:
  let map = new H.Map(
  document.querySelector('.map'),
  defaultLayers.vector.normal.map,
  {
    zoom: 15,
    center: { lat: location.latitude, lng: location.longitude }
  });
  let marker = new H.map.Marker({lat: location.latitude, lng: location.longitude});
    map.addObject(marker);
  // Create the default UI:
  let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();