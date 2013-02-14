  var map;
    $(document).ready(
      function(){
        
        //executes to obtain related geo data
        var universityKey = Parse.User.current().relation("Universities").parent.get("universityId").id;
        var Universities = Parse.Object.extend("Universities");
        var query = new Parse.Query(Universities);
        //gathers the approprite coordinates for the user's university
        query.get(universityKey, {  
          success: function(results){
            var latitudeParse = results.get("latitude");
            var longitudeParse = results.get("longitude");
        //sets the map to that geo location
        map = new GMaps({
          div: '#map',
          zoom: 15,
          lat: latitudeParse,
          lng: longitudeParse,

          markerClusterer: function(map) {
            return new MarkerClusterer(map);
          },
          // map control options enabled
          mapTypeControlOptions: {
            mapTypeIds : ["hybrid", "roadmap", "satellite", "terrain", "osm", "cloudmade"]
          }

        });

      // gets all the map points that have taken place in the given date below
        var Map = Parse.Object.extend("Map");
        var query = new Parse.Query(Map);
        var d = new Date();
        var dateCheck = d.getTime() - 172800000000;

        query.equalTo("universityId", Parse.User.current().relation("Universities").parent.get("universityId"));
            //query to return all map points
        query.find({

          success: function(results){

                for (var i = 0; i < results.length; i++) {


                  var contact = results[i].get("contact") || "";
                  var date = results[i].get("date") || "";
                  var subject = results[i].get("subject") || "";
                  var notes = results[i].get("notes") || "";
                  var ending = results[i].get("endTime") || "";
                  var latitudeParse = results[i].get("latitude") || "";
                  var longitudeParse = results[i].get("longitude") || "";
                  var starting = results[i].get("startTime") || "";
                  var name = results[i].get("name");

                    //if(date > dateCheck && ((subject == Parse.User.current().get("courseOne")) || (subject == Parse.User.current().get("courseTwo")) || (subject == Parse.User.current().get("courseThree")) || (subject == Parse.User.current().get("courseFour")) || (subject == Parse.User.current().get("courseFive")) || (subject == Parse.User.current().get("courseSix")) || (subject == Parse.User.current().get("courseSeven")))){
                      map.addMarker({
                      lat: latitudeParse,
                      lng: longitudeParse,
                      title: 'Location ' + i,
                      infoWindow: {
                        content: '<p> Name: '+ name +'</p>' + '<p> subject: '+ subject+ '</p>' + '<p> Notes: '+ notes + '</p>' + '<p> Contact Info: ' + contact +'</p>' + '<p> Starting Time: ' + starting + '</p>' + '<p> Ending Time: ' + ending + '</p>'
                      }
                      });
                    //}
                }

                },
                error: function(mapperList, error){
                  alert(error.code + " " + error.message);
                }


          });
            // end of Parse data


          //Map controller - GeoLocate button
          map.addControl({
            position: 'top_right',
            content: 'Geolocate',
            style: {
              margin: '5px',
              padding: '1px 6px',
              border: 'solid 1px #717B87',
              background: '#fff'
            },
            events: {
              click: function(){
                GMaps.geolocate({
                  success: function(position){
                    map.setCenter(position.coords.latitude, position.coords.longitude);

                  },
                  error: function(error){
                    alert('Geolocation failed: ' + error.message);
                  },
                  not_supported: function(){
                    alert("Your browser does not support geolocation");
                  }
                });
              }
            }
          });
          // end of map Controller - Geolocate


          //Search form - Geocoding
          $('#geocoding_form').submit(function(e){
            e.preventDefault();
            GMaps.geocode({
              address: $('#address').val().trim(),
              callback: function(results, status){
                if(status=='OK'){
                  var latlng = results[0].geometry.location;
                  map.setCenter(latlng.lat(), latlng.lng());
                  map.addMarker({
                    lat: latlng.lat(),
                    lng: latlng.lng()
                  });
                //alert(latlng.lat() + " " + latlng.lng());
                }
              }
            });
          });
          //End of Search form - GeoCoding


                //start of map types
                map.addMapType("osm", {
                  getTileUrl: function(coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                  },
                  tileSize: new google.maps.Size(256, 256),
                  name: "OpenStreetMap",
                  maxZoom: 16
                });
                map.addMapType("cloudmade", {
                  getTileUrl: function(coord, zoom) {
                    return "http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                  },
                  tileSize: new google.maps.Size(256, 256),
                  name: "CloudMade",
                  maxZoom: 18
                });
             //  map.setMapTypeId("terrain");
                //end of map types

                },
                error: function(results, error) {
                  // The save failed.
                  alert("failed");
                  // error is a Parse.Error with an error code and description.
                }
                });
      });