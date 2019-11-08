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

		$scope.tomarFoto = function(){
			//console.log("hago click de foto");
			var options = {
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				encodingType: Camera.EncodingType.JPEG,
				allowEdit: true,
				targetWidth: 300,
				targetHeight: 300,
				popoverOptions: CameraPopoverOptions,
				quality: 85
			};
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
			// se saco una foto
			if ($scope.avatar === undefined || $scope.avatar === null)
			{
				// no se saco una foto, la cargo de galeria pero controlo que tenga el img
				let avatar = document.getElementsByClassName('avatar')[1];
			
				// valido si cargaron la imagen para convertirla en base64
				// sino paso al registro
				if(avatar.files.length == 0){                
					registro(user);               
				} else{
					// convierto la imagen a base64 para guardarla en la base
					const reader = new FileReader();            
					reader.readAsDataURL(avatar.files[0]);
					reader.addEventListener('load', function () {                   
						let base64 = reader.result;
						$scope.user.avatar = base64;                   
						registro(user);
					});		
				}
			}
			else{
				$scope.user.avatar = $scope.avatar;
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