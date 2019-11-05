// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MensajesCtrl', [
	'$scope',
	'Usuario',
	'SERVER',
	function($scope, Usuario,SERVER) {
		$scope.mensajes = [];

		$scope.api_server = SERVER;
		
		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes.
		$scope.$on('$ionicView.beforeEnter', function() {
			Usuario.getMensajes().then(function(response) {
				// Resolve
				//console.log(response.data);
				$scope.mensajes = response.data;
			}).catch(function(err) {
				if(err.data.message === 'Unauthenticated.')
				{
					$ionicPopup.alert({
						title: 'Error',
						template: 'Tenés que estar logueado para poder acceder a esta pantalla.'
					}).then(function() {
						$state.go('tab.login');
					});
				}
			});
		});	
    }

]);