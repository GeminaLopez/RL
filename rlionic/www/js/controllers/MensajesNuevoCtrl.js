// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MensajesNuevoCtrl', [
	'$scope',
	'$state',
	'Usuario',
	'$ionicPopup',
	'API_SERVER',
	function($scope, $state, Usuario, $ionicPopup, API_SERVER) {
		$scope.mensajes = [];

		$scope.api_server = API_SERVER+'/';

		// busco todas los usuarios para cargar el dropdown
		Usuario.getUsuarios().then(function(exito){
			$scope.usuarios = exito.data;
		});
		
		$scope.grabar = function(mensaje) {
			Usuario.crearMensaje(mensaje)
				.then(function(response) {
					let responseInfo = response.data;
					if(responseInfo.status == 1) {
						$ionicPopup.alert({
							title: 'Éxito!',
							template: 'El mensaje fue enviado exitosamente!'
						}).then(function() {
							// Lo redireccionamos al listado, pero luego de que cierren el mensaje.
							$state.go('tab.mensajes');
						});
					} else if(responseInfo.status == 0) {
						$ionicPopup.alert({
							title: 'Error',
							template: 'Oops! Hubo un error al grabar en nuestro servidor. Por favor, probá de nuevo.'
						});
					}
					else{
						$scope.errores = responseInfo.errores;
						$ionicPopup.alert({
							title: 'Error',
							template: 'Por favor, revisá los campos del formulario.'
						});
					}
				});
		};	
    }

]);