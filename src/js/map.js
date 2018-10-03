 const listado = document.getElementById('listado');
 console.log(listado);

 $(document).ready(function(){ // Inicializar checkbox
    $('select').formSelect();
  });
 
 //objeto que tiene el listado de los lugares de reciclaje
 let ecoPlaces = [
	{position: {lat: -33.4189088, lng: -70.6422443}, decripcion : " Punto Eco-Go Laboratoria", distancia: 0},
 	{position: {lat: -33.4188, lng: -70.6424}, decripcion : "Punto Eco-Go Star", distancia: 0},
 	{position: {lat: -33.4180, lng: -70.6433}, decripcion : "Punto Eco-Go Golden", distancia: 0},
 	{position: {lat: -33.4194, lng: -70.6405}, decripcion : "Punto Eco-Go Silver", distancia: 0},
 	{position: {lat: -33.4170, lng: -70.6405}, decripcion : "Punto Eco-Go Platinum", distancia: 0},
 	{position: {lat: -33.4184, lng: -70.6396}, decripcion : "Punto Eco-Go Diamond", distancia: 0}
 ];

//Paso 1: inicializar la plataforma
platform = new H.service.Platform({
	'app_id': 'xp2LMzBFCMvdU9TNRRjY',
	'app_code': 'w1p60cUN3oTM8VhpR1B0ww',
	useHTTPS: true
});

let pixelRatio = window.devicePixelRatio || 1;
let defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

//Paso 2: inicializar el mapa, pre configurando un lugar y zoom
let map = new H.Map(document.getElementById('mapContainer'),
  defaultLayers.normal.map,{
  center: {lat: -33.4189088, lng: -70.6422443},
  zoom: 16,
  pixelRatio: pixelRatio
});

/*
// Crea un MapTileService instancia para l(i.e. base.map.api.here.com):
var mapTileService = platform.getMapTileService({ 'type': 'map' });
var fleetStyleLayer = mapTileService.createTileLayer(
  'maptile', 
  'normal.day', 
  256, 
  'png8', 
  { 'style': 'fleet' });
  
// Set the new fleet style layer as a base layer on the map:
map.setBaseLayer(fleetStyleLayer);
*/


//Paso 3: hacer el mapa interactivo
// MapEvents obtener eventos del sistema
// Behavior implementa el pan/zoom 
let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// crea la interfaces de usuario por defecto en el mapa 
let ui = H.ui.UI.createDefault(map, defaultLayers);

//Sgv del icono de EcoGO
let svgMarkup = 
    '<svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
    '	 width="48px" height="48px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">' +
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

//Crea el icono de tipo map.icon con el sgv de ecoGo
let iconoEcoGo = new H.map.Icon(svgMarkup);

//crea una marca con la posicion indicada
let markerUser = new H.map.Marker({ lat: -33.4189088, lng: -70.6422443 });//, { icon: iconoEcoGo });
map.addObject(markerUser);

//Coloca las marcas de cada uno de los lugares de reciclaje
ecoPlaces.forEach(function(ecoMarker) {
	let markerUser = new H.map.Marker(ecoMarker.position, { icon: iconoEcoGo });
	map.addObject(markerUser);
	console.log(listado);
	listado.innerHTML += '<p>' + ecoMarker.decripcion + '</p>';
});


//Actualiza el mapa con la posicion actual cada 1 segundo.
function autoUpdate() {
  navigator.geolocation.getCurrentPosition(function(position) {  

    map.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});
    markerUser.setPosition({lat:position.coords.latitude, lng:position.coords.longitude});

  }); 
  setTimeout(autoUpdate, 1000);
}
//evento click del raton para poder hacer la ubicacion de los puntos ecologicos.
map.addEventListener('tap', function (evt) {
	let coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
	console.log('pinchaste en ' + Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S') + ' ' + Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W'));
});

autoUpdate();