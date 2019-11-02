// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PostsCtrl', [
	'$scope',
	'Post',
	'SERVER',
	'Auth',
	function($scope, Post, SERVER, Auth) {
		$scope.posts = [];
		$scope.api_server = SERVER;

		// Justo de antes de entrar a la vista, le pedimos que traiga los datos del usuario.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				// console.log(response);
				if(response.id_user !== null) {
					$scope.user = {
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

		// Justo de antes de entrar a la vista, le pedimos que traiga los posts.
		$scope.$on('$ionicView.beforeEnter', function() {
	        Post.todos().then(function(response) {
				// Resolve
				$scope.posts = response.data
			}, function() {
				// Reject
				console.log('Hubo un problema, no se pudo traer la información solicitada');
			});
		});	
		
		
		// funcion agregar amigo, recibe como parametro el id del usuario a agregar
		$scope.eliminarPost = function(id) {
			Post.eliminarPost(id)
			.then(function(response) {
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'Se ha eliminado post exitosamente!'
					}).then(function() {
						// Lo redireccionamos al listado, pero luego de que cierren el mensaje.
						$state.go('tab.posts');
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