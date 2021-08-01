// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MapaCtrl', [
	'$scope',
	'$ionicLoading',
	'$cordovaGeolocation',
	'$ionicPlatform',
	'Usuario',
	function($scope,$ionicLoading, $cordovaGeolocation, $ionicPlatform,Usuario) {

		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes.
		$scope.$on('$ionicView.beforeEnter', function() {
			//busco todos los usuarios menos el actual
			Usuario.todosMenosLogged().then(function(exito){
				$scope.usuarios = exito.data;
			});
		});

		$ionicPlatform.ready(function() {    
			
			$ionicLoading.show({
				template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando...'
			});

			var posOptions = {timeout: 10000, enableHighAccuracy: true};
			$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
				var lat  = position.coords.latitude;
				var long = position.coords.longitude;
				 
				//posiciono default buenos aires			 
				var map = L.map('map').setView([-34.6131500, -58.3772300], 13);

				L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
					maxZoom: 18,
					id: 'mapbox/streets-v11',
					tileSize: 512,
					zoomOffset: -1,
					accessToken: 'pk.eyJ1IjoiZ2VtaW5hMTg2IiwiYSI6ImNrMzF1OHU2cDA1OXozaGxlejJiYm55djUifQ.Nq-yz-pQCKWyy8m0m4D3Tg'
				}).addTo(map);

				var marker = L.marker([lat, long]).addTo(map);

				marker.bindPopup("<b>Tu estás aquí</b>");

				for (var i=0; i< $scope.usuarios.length; i++) {
					if($scope.usuarios[i].brinda_servicio)
					{
						L.circle([$scope.usuarios[i].ubicacion_lat, $scope.usuarios[i].ubicacion_long], {
							color: 'red',
							fillColor: '#f03',
							fillOpacity: 0.5,
							radius: 500
						}).addTo(map);
					}
				}

				$ionicLoading.hide();  

			}, function(err) {
				$ionicLoading.hide();
				console.log(err)
			});

			var watchOptions = {timeout : 3000, enableHighAccuracy: false};
			var watch = $cordovaGeolocation.watchPosition(watchOptions);
				
			watch.then(
				null,
					
				function(err) {
					console.log(err)
				},
				function(position) {
					var lat  = position.coords.latitude
					var long = position.coords.longitude
					console.log(lat + '' + long)
				}
			);

			watch.clearWatch();
		})       
	}

]);