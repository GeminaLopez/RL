// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('LoginCtrl', [
	'$scope',
	'$ionicPopup',
	'$state',
	'Auth',
	'Ciudad',
	'Genero',
	function($scope, $ionicPopup, $state, Auth, Ciudad, Genero) {
		$scope.user = {
			email: null,
			password: null
		};

		Ciudad.todas().then(function(response){
			$scope.ciudades = response.data;
		});

		Genero.todos().then(function(response){
			$scope.generos = response.data;
		});
		
		$scope.login = function(user) {
			Auth.login(user).then(function(respuesta) {
				if(respuesta.status == 1 ) {
					$ionicPopup.alert({
						title: 'Éxito',
						template: 'Bienvenido/a! Disfrutá de Red Light!!'
					}).then(function() {
						$state.go('tab.perfil');
					});
				} else {
					$scope.errores = respuesta.errores;
					$ionicPopup.alert({
						title: 'Error',
						template: 'Parece que las credenciales no coinciden con nuestros registros. Por favor, revisá que todo esté bien y probá de nuevo.'
					});
				}
			});
		};

		$scope.registro = function(user){
			//let avatar = document.getElementById('avatar');
			
			// valido si cargaron la imagen para convertirla en base64
            /*if(avatar.files.length == 0){                
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
                
			}*/
			
			registro(user);

			function registro(user){
				Auth.registro(user).then(function(respuesta){
					if(respuesta.status == 1 ){
						$ionicPopup.alert({
							title: 'Éxito',
							template: 'Bienvenido/a! Disfrutá del Encuentro Nacional de Mujeres'
						}).then(function() {
							$state.go('tab.talleres');
						});
					} else {
				        $scope.errores = respuesta.errores;
						$ionicPopup.alert({
							title: 'Error',
							template: 'Hubo un error en tu registro. Por favor, revisá que todos los datos esten completos y que los datos están bien.'
						});
					}
				}) 
			}
		}

		$scope.calcularEdad = function(fecha_nac){ 
			var ageDifMs = Date.now() - fecha_nac.getTime();
			$scope.edad = Math.floor(ageDifMs / 1000 / 60 / 60 / 24 / 365);
		}
	}
]);