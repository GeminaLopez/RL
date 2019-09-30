// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MensajesCtrl', [
	'$scope',
	'Usuario',
	'API_SERVER',
	function($scope, Usuario,API_SERVER) {
		$scope.mensajes = [];

		$scope.api_server = API_SERVER+'/';
		
		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes.
		$scope.$on('$ionicView.beforeEnter', function() {
			Usuario.getMensajes().then(function(response) {
				// Resolve
				$scope.mensajes = response.data;
			}, function() {
				// Reject
				console.log('Hubo un problema, no se pudo traer la información solicitada');
			});
		});	
    }

]);