// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('ComentariosNuevoCtrl', [
	'$scope',
	'$state',
	'$stateParams',
	'$ionicPopup',
	'Comentario',
	'Auth',
	function($scope, $state, $stateParams, $ionicPopup, Comentario, Auth) {
		$scope.comentario = {
			id_user: null,
			id_post: null,
			texto: null
		};

		// Justo de antes de entrar a la vista, le pedimos que traiga los datos del usuario.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				// console.log(response);
				if(response.id_user !== null) {
					$scope.comentario = {
						id_user: response.id_user,
						id_post: $stateParams.id
					};
				}
				else{
					$ionicPopup.alert({
						title: 'Error',
						template: 'No pudimos encontrar sus datos. Por favor, contactate con nosotros.'
					});
				}
			});
		});

		$scope.grabar = function(comentario) {
			Comentario.crear(comentario).then(function(response) {
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'El comentario fue creado exitosamente!'
					}).then(function() {
						// Lo redireccionamos al listado, pero luego de que cierren el mensaje.
						$state.go('tab.posts');
					});
				} 
			}).catch(function(err)
			{
				$scope.errores = err.data.errors;
				$ionicPopup.alert({
					title: 'Error',
					template: 'Por favor, revisá el error.'
				});
			});
		};
	}
]);