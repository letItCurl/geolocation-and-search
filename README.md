```bash
rake geocode:all CLASS=Transaction SLEEP=0.25 BATCH=100
```

```bash
rails generate geocoder:config
```

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

```ruby
sw_corner = [40.71, 100.23]
ne_corner = [36.12, 88.65]
Venue.within_bounding_box(sw_corner, ne_corner)
```

Geocoding, Geolocation and Search with Geocoder + Google Maps APIs :
https://gorails.com/episodes/geolocation-and-search-with-geocoder

How to use Google Maps and Markers:
https://gorails.com/episodes/google-maps-and-markers