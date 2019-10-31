// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PostsCtrl', [
	'$scope',
	'Usuario',
	'Post',
	'SERVER',
	function($scope,Usuario, Post, SERVER) {
		$scope.posts = [];
		$scope.api_server = SERVER;

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
	}
]);