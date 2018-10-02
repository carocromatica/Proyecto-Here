var map;
var platform;
//Dibujo de un icono en SVG
let svgMarkup =
    '<svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
    '	 width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">' +
    '<g>' +
    '	<path fill="#97B94F" d="M18.333,17.343c0.035-0.494,0.05-0.983,0.049-1.466c-0.507,0.292-1.079,0.49-1.695,0.569' +
    '		c-2.493,0.317-4.773-1.446-5.09-3.94c-0.318-2.494,1.446-4.773,3.94-5.09c0.447-0.058,0.887-0.047,1.311,0.022' +
    '		c-0.433-1.233-0.878-2.247-1.223-2.963C15.473,4.485,15.321,4.5,15.168,4.52c-4.635,0.591-7.914,4.827-7.324,9.462' +
    '		c0.216,1.691,1.676,3.749,3.456,6.286l6.966-2.971L18.333,17.343z"/>' +
    '	<path fill="#D0D647" d="M20.627,11.355c0.239,1.877-0.701,3.632-2.245,4.522c0.001,0.483-0.015,0.972-0.049,1.466l4.587,3.116' +
    '		c2.043-3.99,1.942-6.789,1.709-8.616c-0.571-4.482-4.551-7.696-9.005-7.369c0.344,0.716,0.79,1.73,1.223,2.963' +
    '		C18.785,7.754,20.367,9.309,20.627,11.355z"/>' +
    '	<path fill="#6CA753" d="M17.822,20.591c0.275-1.092,0.438-2.181,0.512-3.249l-0.067-0.046L11.3,20.268' +
    '		c0.235,0.334,0.475,0.676,0.718,1.027c0.524,0.755,0.823,1.567,0.962,2.394l4.809-3.129L17.822,20.591z"/>' +
    '	<path fill="#508B4A" d="M17.398,22.018c-1.072,3.11-6.645,9.697-6.645,9.697s7.214-3.827,10.178-8.004l-3.109-3.12' +
    '		C17.702,21.066,17.562,21.543,17.398,22.018z"/>' +
    '	<path fill="#97B94F" d="M22.92,20.458l-4.587-3.116c-0.074,1.068-0.237,2.156-0.512,3.249l3.109,3.12' +
    '		c0.006-0.009,0.014-0.019,0.021-0.029C21.763,22.531,22.409,21.458,22.92,20.458z"/>' +
    '	<path fill="#D0D647" d="M17.398,22.018c0.164-0.475,0.304-0.952,0.424-1.427L17.79,20.56l-4.809,3.129' +
    '		c0.648,3.864-2.228,8.027-2.228,8.027S16.326,25.128,17.398,22.018z"/>' +
    '</g>' +
    '<path fill="#97B94F" d="M15.502,4.474c0,0-0.933,0.187-1.283-1.124c-0.35-1.312,1.147-3.018,1.147-3.018S12.224,1.8,13.001,3.309' +
    '	c0.777,1.509,0.598,2.193,0.598,2.193L15.502,4.474z"/>' +
    '</svg>';


//obtiene la posicion actual en el navegador.
var queryOptions = { timeout: 5000, maximumAge: 20000, enableHighAccurace: true };
window.navigator.geolocation.getCurrentPosition(handle_geolocation_success, handle_geolocation_failures, queryOptions);

function handle_geolocation_success(position) {//cuando tiene la posicion la reporta aqui.
    var buffer = "";
    var lastPosition = position.coords.latitude + ',' + position.coords.longitude;

    //informacion de el posicionamiento.
    buffer += 'Timestamp: ' + position.timestamp;
    buffer += '\nLatitud/Longitud (en grados decimales): ' + position.coords.latitude + ',' + position.coords.longitude;
    buffer += '\nPrecision (en metros): ' + position.coords.accuracy;
    buffer += '\nAltitud: ' + position.coords.altitude;
    buffer += '\nVelocidad (metros/segundo): ' + position.coords.speed;
    buffer += '\nDireccion (grados decimales): ' + position.coords.heading;

    //resultado de los datos del posicionamiento en la consola
    console.log(buffer);


    // inicializacion del mapa:
    platform = new H.service.Platform({
        'app_id': 'xp2LMzBFCMvdU9TNRRjY',
        'app_code': 'w1p60cUN3oTM8VhpR1B0ww'
    });

    //obtiene el tipo de capa por defecto del mapa
    var maptypes = platform.createDefaultLayers();

    // inicializa el objeto mapa, elije el div donde lo colocara y lo configura :
    map = new H.Map(
        document.getElementById('mapContainer'),//contenedor html en donde estara el mapa
        maptypes.normal.map,//tipo de mapa normal.
        {
            zoom: 16,//zoom mientras mas alto el numero mas cerca
            center: { lng: position.coords.longitude, lat: position.coords.latitude } // latitud y longitud de la posicion central del mapa
        });

    var ui = H.ui.UI.createDefault(map, maptypes, 'es-ES');//controles del mapa y el idioma  'es-ES' (español)
    /*
        ui.getControl('mapsettings').setEnabled(false);
        ui.getControl('zoom').setEnabled(false);
        ui.getControl('panorama').setEnabled(false);
    */

    //una marca de la posicion (Posicion actual)
    position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    marker = new H.map.Marker(position); //crea una marca con la posicion
    map.addObject(marker);//agrega la marca en el mapa



    let position2 = {
        lat: -33.602500,
        lng: -70.886200
    };


    let puntosReciclaje = [
        { lat: -33.602500, lng: -70.886200},
        { lat: -33.602500, lng: -70.886200},
        { lat: -33.602500, lng: -70.886200},
        { lat: -33.602500, lng: -70.886200},
        { lat: -33.602500, lng: -70.886200}
    ];


    //Crea yb icono y pone u objeto en la latitud y longitud , y agrega una marca:
    var icon = new H.map.Icon(svgMarkup),
        //coords = {lat: position.coords.latitude , lng: position.coords.longitude },
        marker = new H.map.Marker(position2, { icon: icon });

    //agrega una marca en el mapa
    map.addObject(marker);
    //map.setCenter(coords);

    // Activa eventos en el mapa:
    var mapEvents = new H.mapevents.MapEvents(map);

    //Agrega un evento tap:
    map.addEventListener('tap', function (evt) {
        //escribe en la consola el tab:
        console.log(evt.type, evt.currentPointer.type);
    });

    activarRuta(position);


}

function handle_geolocation_failures(error) {  //resuelve si el navegador da algun problema con la geoposicionamiento.
    var appErrMessage = null;

    if (error.core == error.PERMISSION_DENIED) {
        appErrMessage = "El usuario no ha concedido los privilegios de geolocalización";
    } else if (error.core == error.POSITION_UNAVAILABLE) {
        appErrMessage = "Posicion no disponible";
    } else if (error.core == error.TIMEOUT) {
        appErrMessage = "Demasiado tiempo intentando obtener la localización del usuario.";
    } else if (error.core == error.UNKNOWN) {
        appErrMessage = "Error desconocido";
    } else {
        appErrMessage = "Error insesperado";
    }
    console.log(appErrMessage);

    /*
    $("#location_output").val(appErrMessage);
    */

}


function activarRuta(position) {
    // Create the parameters for the routing request:
    console.log('waypoint0 : geo!' + position.lat + ', ' + position.lng);

    var routingParameters = {
        // The routing mode:
        'mode': 'fastest;pedestrian',//'fastest;car',
        // The start point of the route:
        'waypoint0': 'geo!' + position.lat + ',' + position.lng,
        // The end point of the route:
        'waypoint1': 'geo!-33.422333,-70.644819',
        // To retrieve the shape of the route we choose the route
        // representation mode 'display'
        'representation': 'display'
    };

    // Define a callback function to process the routing response:
    var onResult = function (result) {
        var route,
            routeShape,
            startPoint,
            endPoint,
            linestring;
        if (result.response.route) {
            // Pick the first route from the response:
            route = result.response.route[0];
            // Pick the route's shape:
            routeShape = route.shape;

            // Create a linestring to use as a point source for the route line
            linestring = new H.geo.LineString();

            // Push all the points in the shape into the linestring:
            routeShape.forEach(function (point) {
                var parts = point.split(',');
                linestring.pushLatLngAlt(parts[0], parts[1]);
            });

            // Retrieve the mapped positions of the requested waypoints:
            startPoint = route.waypoint[0].mappedPosition;
            endPoint = route.waypoint[1].mappedPosition;

            // Create a polyline to display the route:
            var routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: 'green', lineWidth: 5 }
            });

            // Create a marker for the start point:
            var startMarker = new H.map.Marker({
                lat: startPoint.latitude,
                lng: startPoint.longitude
            });

            let positionFinal = {
                lat: endPoint.latitude,
                lng: endPoint.longitude
            };
            var icon = new H.map.Icon(svgMarkup);

            // Create a marker for the end point:
            var endMarker = new H.map.Marker(positionFinal, { icon: icon });



            // Add the route polyline and the two markers to the map:
            map.addObjects([routeLine, startMarker, endMarker]);

            // Set the map's viewport to make the whole route visible:
            map.setViewBounds(routeLine.getBounds());
        }
    };

    // Get an instance of the routing service:
    var router = platform.getRoutingService();

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
        function (error) {
            alert(error.message);
        });


}
