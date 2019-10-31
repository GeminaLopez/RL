// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PostsNuevoCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Post',
	'Auth',
	function($scope, $state, $ionicPopup, Post, Auth) {
		$scope.post = {
			titulo: null,
			id_user: null,
			texto: null,
		};

		// Justo de antes de entrar a la vista, le pedimos que traiga los datos del usuario.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				// console.log(response);
				if(response.id_user !== null) {
					$scope.post = {
						id_user: response.id_user,
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

		$scope.grabar = function(post) {
			// creo un nuevo post con los datos que cargo del formulario
			Post.crear(post).then(function(response) {
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'El post fue creado exitosamente!'
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
					template: 'Por favor, revisá los campos del formulario.'
				});
			});
		};
	}
]);