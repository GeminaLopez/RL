// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('LoginCtrl', [
	'$scope',
	'$ionicPopup',
	'$state',
	'Auth',
	'Ciudad',
	'Genero',
	'$cordovaCamera',
	'$ionicLoading',
	'$cordovaGeolocation',
	function($scope, $ionicPopup, $state, Auth, Ciudad, Genero, $cordovaCamera, $ionicLoading, $cordovaGeolocation) {
		$scope.user = {
			email: null,
			password: null
		};

		function setOptions(srcType) {
			var options = {
				quality: 85,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: srcType,
				encodingType: Camera.EncodingType.JPEG,
				mediaType: Camera.MediaType.PICTURE,
				allowEdit: true,
				correctOrientation: true,
				targetWidth: 300,
				targetHeight: 300
			}
			return options;
		}

		$scope.suboImagen = function(event){
			event.preventDefault();
			var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			var options = setOptions(srcType);

			$cordovaCamera.getPicture(options)
			.then(function(data){
				//console.log("mi foto es: " + angular.toJson(data));
				$scope.avatar = 'data:image/jpeg;base64,' + data;
			}, function(error){
				//console.log("error de camara : " + angular.toJson(error))
			});
		}

		$scope.tomarFoto = function(){
			var srcType = Camera.PictureSourceType.CAMERA;
			var options = setOptions(srcType);

			$cordovaCamera.getPicture(options)
			.then(function(data){
				//console.log("mi foto es: " + angular.toJson(data));
				$scope.avatar = 'data:image/jpeg;base64,' + data;
			}, function(error){
				//console.log("error de camara : " + angular.toJson(error))
			});
		}

		Ciudad.todas().then(function(response){
			//console.log(response.data);
			$scope.ciudades = response.data;
		});

		Genero.todos().then(function(response){
			$scope.generos = response.data;
		});

		var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
		};

		//ubico coordenadas gps
		$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
			$scope.user.ubicacion_lat  = position.coords.latitude;
			$scope.user.ubicacion_long = position.coords.longitude;
		});

		$scope.login = function(user) {
			Auth.login(user).then(function(respuesta) {
				//console.log(respuesta);
				if(respuesta.status == 1 ) {
					user.email = '';
					user.password = '';
					$ionicPopup.alert({
						title: 'Éxito',
						template: 'Bienvenido/a! Disfrutá de Red Light!!'
					}).then(function() {
						$state.go('tab.perfil');
					});
				} else {
					if(respuesta.status == 401)
					{
						$scope.errores = null;
						$ionicPopup.alert({
							title: 'Error',
							template: 'Parece que las credenciales no coinciden con nuestros registros. Por favor, revisá que todo esté bien y probá de nuevo.'
						});
					}
					else{
						$ionicLoading.hide();
						$scope.errores = respuesta;
						$ionicPopup.alert({
							title: 'Error',
							template: 'Por favor revise el formulario.'
						});
						
					}
				}
			});
		};

		
		
		$scope.registro = function (user){
			// se saco una foto o la subio desde su galeria
			// valido que el avatar sea diferente a null - undefined
			if ($scope.avatar){
				$scope.user.avatar = $scope.avatar;
				registro(user);
			}
			else{
				$scope.user.avatar = "";
				registro(user);
			}
			
			function registro(user){
				$ionicLoading.show({
					template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
					noBackdrop: true
				});
				Auth.registro(user).then(function(respuesta){
					//console.log(respuesta);
					if(respuesta.status == 1 ){
						$ionicLoading.hide();
						$ionicPopup.alert({
							title: 'Éxito',
							template: 'Bienvenido/a! Disfrutá de Red Light!!'
						}).then(function() {
							$state.go('tab.login');
						});
					} else {
						$ionicLoading.hide();
						$scope.errores = respuesta;
						$ionicPopup.alert({
							title: 'Error',
							template: 'Hubo un error en tu registro. Por favor, revisá que todos los datos esten completos y que los datos están bien.'
						});
					}
				});
			}
		}

		$scope.edad = 0;

		$scope.calcularEdad = function(fecha_nac){
			if(fecha_nac!="undefined" && fecha_nac!=null)
			{
				var ageDifMs = Date.now() - fecha_nac.getTime();
				$scope.edad = Math.floor(ageDifMs / 1000 / 60 / 60 / 24 / 365);
				if($scope.edad >= 18 && $scope.edad <= 80)
				{

				}
			}
			else{
				$scope.edad = 0;
			}
		}
	}
]);