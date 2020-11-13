console.log("maps")
var map

window.addMarkers = function addMarkers() {
  var element = document.querySelector("#transaction_list")
  var transactions = window.transactions = JSON.parse(element.dataset.transactions)
  window.transactions = transactions

  map.removeMarkers()

  transactions.forEach(element => {
    if(!element.latitude && !element.longitude) return; 
    var marker = map.addMarker({
      lat: element.latitude,
      lng: element.longitude,
      title: element.address,
      infoWindow: {
        content: `<p><a href="/transactions/${element.id}">${element.address}</a></p>`
      }
    });
  });

  var l = document.querySelector("#transaction_list").dataset.l
  if(l){
    var latlngs   = l.split(',');
    var southWest = new google.maps.LatLng(latlngs[0],latlngs[1])
    var northEast = new google.maps.LatLng(latlngs[2],latlngs[3])
    var bounds    = new google.maps.LatLngBounds(southWest, northEast)
    map.fitBounds(bounds, 0)
  } else {
    map.fitZoom()
  }
}

document.addEventListener("turbolinks:load", function(){
  console.log("turbolinks loads....")
  map = window.map = new GMaps({
    div: '#map',
    lat: 38.5816,
    lng: -121.4944
  });

  addMarkers()
  
  map.addListener('dragend', function() {
    var bounds = map.getBounds();
    var location = bounds.getSouthWest().toUrlValue() + "," + bounds.getNorthEast().toUrlValue();
    Turbolinks.visit(`/transactions?l=${location}`)
  })
})