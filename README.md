# Training ROR [![](https://img.shields.io/badge/autor-letItCurl-red.svg)](https://www.linkedin.com/in/roland-lopez-developer/?locale=en_US)
> data data data

## Let's use location data, display them and search trought them !


You can set proxys and caching here
```bash
rails generate geocoder:config
```

Bulk update
```bash
rake geocode:all CLASS=Transaction SLEEP=0.25 BATCH=100
```

Neat example: reverse geocoding to get location of phone
```ruby
reverse_geocoded_by :latitude, :longitude do |obj,results|
  if geo = results.first
    obj.city    = geo.city
    obj.zipcode = geo.postal_code
    obj.country = geo.country_code
  end
end
after_validation :reverse_geoc
```

Get within a box
```ruby
sw_corner = [40.71, 100.23]
ne_corner = [36.12, 88.65]
Venue.within_bounding_box(sw_corner, ne_corner)
```

we used searchkick to quey into our elastic search instance:
(don't forget to increase ram for docker in mac)
```bash
docker-compose up
```

to index:
```ruby
Model.reindex
# and it does the work
```

searchkick really does more than a simple client for elastic search, it makes query easy.

## FROM

Chris GoRails videos ::
[Geocoding, Geolocation and Search with Geocoder + Google Maps APIs](https://gorails.com/episodes/geolocation-and-search-with-geocoder)
[How to use Google Maps and Markers](https://gorails.com/episodes/google-maps-and-markers)

# About me

<table style="border: none;">
  <tr>
    <td>
      <div style="width: 120px;">
        <img style="width: 120px;" src="https://res.cloudinary.com/duydvdaxd/image/upload/w_120,c_fill,ar_1:1,g_auto/v1587723517/Rodeooo_khmmmu.jpg"/>
    </div>
    </td>
    <td>
      <div style="margin-left: 30px;">
        <p>Hey there !</br>
        I'm letItCurl, fullstack developer engineer in freelance</br>
        If you have any question you can <a href="https://www.linkedin.com/in/roland-lopez-developer/?locale=en_US">contact me</a> if you wish !</p>
        <p>I'm always ready to help !</p>
        <a style="color: #f694ff;" href="mailto:rolandlopez.developer@gmail.com?subject=Hey! Are you available?">Email me </a>
    </div>
    </td>
  </tr>
</table>




