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

  var bounds = new google.maps.LatLngBounds();

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

    bounds.extend(marker.position)
  });

  map.fitBounds(bounds)
})