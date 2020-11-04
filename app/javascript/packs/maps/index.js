console.log("maps")

document.addEventListener("turbolinks:load", function(){
  console.log("turbolinks loads....")
  var map = new GMaps({
    div: '#map',
    lat: 38.5816,
    lng: -121.4944
  });
})