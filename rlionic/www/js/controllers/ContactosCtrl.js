// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('ContactosCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Usuario',
	'API_SERVER',
	function($scope,$state,$ionicPopup,Usuario,API_SERVER) {
		$scope.amigos = [];
		$scope.noAmigos = [];

		$scope.api_server = API_SERVER+'/';

		// Justo de antes de entrar a la vista, le pedimos que traiga los amigos y no amigos.
		$scope.$on('$ionicView.beforeEnter', function() {
			Usuario.getAmigos()
			.then(function(response) {
				// Resolve
				$scope.amigos = response.data;
			}, function() {
				// Reject
				console.log('Hubo un problema, no se pudo traer la información solicitada');
			});
			Usuario.getNoAmigos()
			.then(function(response) {
				// Resolve
				$scope.noAmigos = response.data;
			}, function() {
				// Reject
				console.log('Hubo un problema, no se pudo traer la información solicitada');
			})
		});
		
		// funcion agregar amigo, recibe como parametro el id del usuario a agregar
		$scope.agregarAmigo = function(id) {
			Usuario.agregarAmigo(id)
			.then(function(response) {
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
					Usuario.getAmigos()
					.then(function(response) {
						// Resolve
						$scope.amigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					});
					Usuario.getNoAmigos()
					.then(function(response) {
						// Resolve
						$scope.noAmigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					})
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'Se ha agregado a tus amigos exitosamente!'
					}).then(function() {
						// Lo redireccionamos al listado, pero luego de que cierren el mensaje.
						$state.go('tab.contactos');
					});
				} else if(responseInfo.status == 0) {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Oops! Hubo un error al grabar en nuestro servidor. Por favor, probá de nuevo.'
					});
				}
			});
		};

		// funcion agregar amigo, recibe como parametro el id del usuario a agregar
		$scope.eliminarAmigo = function(id) {
			Usuario.eliminarAmigo(id)
			.then(function(response) {
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
					Usuario.getAmigos()
					.then(function(response) {
						// Resolve
						$scope.amigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					});
					Usuario.getNoAmigos()
					.then(function(response) {
						// Resolve
						$scope.noAmigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					});
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'Se ha eliminado amigo exitosamente!'
					}).then(function() {
						// Lo redireccionamos al listado, pero luego de que cierren el mensaje.
						$state.go('tab.contactos');
					});
				} else if(responseInfo.status == 0) {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Oops! Hubo un error al eliminar en nuestro servidor. Por favor, probá de nuevo.'
					});
				}
			});
		};
	}
]);