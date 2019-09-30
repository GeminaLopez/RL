// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('ComentariosNuevoCtrl', [
	'$scope',
	'$state',
	'$stateParams',
	'$ionicPopup',
	'Comentario',
	function($scope, $state, $stateParams, $ionicPopup, Comentario) {
		$scope.comentario = {
			id: null,
			fkUsuarios: null,
			fkPosts: null,
			texto: null,
			fecha_publicacion: null
		};

		$scope.grabar = function(comentario) {
			Comentario.crear(comentario, $stateParams.id)
				.then(function(response) {
					let responseInfo = response.data;
					if(responseInfo.status == 1) {
						$ionicPopup.alert({
							title: 'Éxito!',
							template: 'El comentario fue creado exitosamente!'
						}).then(function() {
							// Lo redireccionamos al listado, pero luego de que cierren el mensaje.
							$state.go('tab.posts');
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