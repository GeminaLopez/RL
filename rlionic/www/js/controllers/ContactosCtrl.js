// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('ContactosCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Usuario',
	'SERVER',
	'Auth',
	'Ciudad',
	'Genero',
	function($scope,$state,$ionicPopup,Usuario,SERVER, Auth,Ciudad,Genero) {
		$scope.amigos = [];
		$scope.noAmigos = [];

		$scope.api_server = SERVER;

		// Justo de antes de entrar a la vista, le pedimos que traiga los amigos y no amigos.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				//console.log(response);
				if(response.id_user !== null) {
					Ciudad.traerCiudadPorID(response.id_ciudad).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_ciudad'] = resp.data.id_ciudad;
					});
					Genero.traerGeneroPorID(response.id_genero).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_genero'] = resp.data.id_genero;
					});
					$scope.user = {
						id_user: response.id_user,
						nombre: response.nombre,
						apellido: response.apellido,
						email: response.email,
						avatar: response.avatar,
					}

					Usuario.getAmigos(response.id_user).then(function(response) {
						// Resolve
						$scope.amigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					});
					Usuario.getNoAmigos(response.id_user).then(function(response) {
						// Resolve
						$scope.noAmigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					})
				}
				else{
					$ionicPopup.alert({
						title: 'Error',
						template: 'No pudimos encontrar sus datos. Por favor, contactate con nosotros.'
					});
				}
			});	
		});
		
		// funcion agregar amigo, recibe como parametro el id del usuario a agregar
		$scope.agregarAmigo = function(id) {
			Usuario.agregarAmigo(id).then(function(response) {
				//console.log(response);
				//console.log($scope.user['id_user']);
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
					Usuario.getAmigos($scope.user['id_user']).then(function(response) {
							// Resolve
							$scope.amigos = response.data;
						}, function() {
							// Reject
							console.log('Hubo un problema, no se pudo traer la información solicitada');
					});
					Usuario.getNoAmigos($scope.user['id_user']).then(function(response) {
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
					Usuario.getAmigos($scope.user['id_user']).then(function(response) {
						// Resolve
						$scope.amigos = response.data;
					}, function() {
						// Reject
						console.log('Hubo un problema, no se pudo traer la información solicitada');
					});
					Usuario.getNoAmigos($scope.user['id_user']).then(function(response) {
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