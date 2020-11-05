console.log("maps")

document.addEventListener("turbolinks:load", function(){
  console.log("turbolinks loads....")
  var map = new GMaps({
    div: '#map',
    lat: 38.5816,
    lng: -121.4944
  });


  var transactions = JSON.parse(document.querySelector("#map").dataset.transactions)
  window.transactions = transactions
  window.map = map

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

  var l = document.querySelector("#map").dataset.l
  if(l){
    var latlngs   = l.split(',');
    var southWest = new google.maps.LatLng(latlngs[0],latlngs[1])
    var northEast = new google.maps.LatLng(latlngs[2],latlngs[3])
    var bounds    = new google.maps.LatLngBounds(southWest, northEast)
    map.fitBounds(bounds, 0)
  } else {
    map.fitZoom()
  }

  document.querySelector("#redo-search").addEventListener("click", function(e) {
    e.preventDefault();
    var bounds = map.getBounds();
    var location = bounds.getSouthWest().toUrlValue() + "," + bounds.getNorthEast().toUrlValue();
    Turbolinks.visit(`/transactions?l=${location}`)
  })
})