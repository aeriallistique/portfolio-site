mapboxgl.accessToken = 
'pk.eyJ1Ijoic2VtZXNlcmlhc3UiLCJhIjoiY2tocWh2MWs1MDdtejMwbXQ0dGtvaDM0cSJ9.F89wWUY5RPlxW7k6eCh6fw';

    navigator.geolocation.getCurrentPosition( successLocation, errorLocation, {
        enableHighAccuracy: true
    }  )

    function successLocation(position){

        setupMap([position.coords.longitude, position.coords.latitude])
    }

    function errorLocation(){

    }

    const obj1={
        anchor:'top',
        color: 'red',
        scale: .5
   }

   const countryCoords = [[48.1351, 11.5820], [48.8566, 2.3522], [40.416775, -3.703790], [-34.603722, -58.381592],
[48.210033, 16.363449], [25.025885, -78.035889], [16.245567, -89.023911], [32.366859, -64.683647],
[-22.970722, -43.182365], [45.508888, -73.561668], [19.292997, -81.366806], [23.128994, 113.253250], [45.815399, 15.966568], [12.169570, -68.990021], [50.073658, 14.418540], [4.624335, -74.063644], [55.676098, 12.568337],
[59.436962, 24.753574],[61.904461, -6.888534], [37.983810, 23.727539], [16.276478, -86.596840], [22.316668, 114.183334], [47.497913, 19.040236], 
[63.880238, -22.450562], [40.853294, 14.305573], [18.476223, -77.893890], [20.214788, -87.430588], [47.003670, 28.907089], [43.740070, 7.426644], [52.379189, 4.899431], [59.911491, 10.757933], [8.983333, -79.516670], [18.466333, -66.105721],
[59.933994, 30.305969], [18.075277, -63.060001], [59.334591, 18.063240],[47.559601, 7.588576], [41.015137, 28.979530], [46.469391, 30.740883], [36.114647, -115.172813], [-34.901112, -56.164532], [41.901134, 12.453314], [16.047079, 108.206230], [18.319410, -64.703247],
[33.589886, -7.603869], [38.736946, -9.142685]
]

    function setupMap(center){
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 3
            })
            map.addControl(new mapboxgl.NavigationControl());

            var marker = new mapboxgl.Marker(obj1)
            .setLngLat(center)
            .addTo(map);

            var marker1 = new mapboxgl.Marker(obj1)
            .setLngLat([25.5887, 45.6427])
            .addTo(map);

            countryCoords.forEach(item=>{
                new mapboxgl.Marker(obj1)
            .setLngLat([ item[1],item[0] ])
            .addTo(map);
            })

    
    }

   
    
    