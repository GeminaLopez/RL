// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MensajesChatCtrl', [
	'$scope',
	'$stateParams',
	'Usuario',
	'$ionicPopup',
	'SERVER',
	function($scope, $stateParams, Usuario, $ionicPopup,SERVER) {
		$scope.mensajes = [];

		$scope.api_server = SERVER+'storage/';
		
		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes.
		$scope.$on('$ionicView.beforeEnter', function() {
			Usuario.getChat($stateParams.id).then(function(response) {
				// Resolve
				$scope.mensajes = response.data;
			}, function() {
				// Reject
				console.log('Hubo un problema, no se pudo traer la información solicitada');
			});
		});
	
		$scope.grabar = function(mensaje) {
			Usuario.enviarMensaje(mensaje, $stateParams.id)
				.then(function(response) {
					let responseInfo = response.data;
					if(responseInfo.status == 1) {
						Usuario.getChat($stateParams.id).then(function(response) {
							// Resolve
							$scope.mensajes = response.data;
						}, function() {
							// Reject
							console.log('Hubo un problema, no se pudo traer la información solicitada');
						});
					} else if(responseInfo.status == 0) {
						$ionicPopup.alert({
							title: 'Error',
							template: 'Oops! Hubo un error al grabar en nuestro servidor. Por favor, probá de nuevo.'
						});
					} else{
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