var SERVER = "http://192.168.0.100/kmis/new_kmimos.mx/app";
// var SERVER = "http://kmimosmx.sytes.net/QA2/app";
var CARGAR = true;
var CUIDADORES = [];


var LATITUD = 0;
var LONGITUD = 0;

var map;
var marker;
function initMap() {
	var latitud = 10;
	var longitud = 10;
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center:  new google.maps.LatLng(latitud, longitud), 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
    	disableDefaultUI: true
	});
	marker = new google.maps.Marker({
		map: map,
		draggable: false,
		position: new google.maps.LatLng(latitud, longitud),
		icon: "https://www.kmimos.com.mx/wp-content/themes/pointfinder/vlz/img/pin.png"
	});
}