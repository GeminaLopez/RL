// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('ComentariosCtrl', [
	'$scope',
	'$stateParams',
	'Comentario',
	'SERVER',
	function($scope, $stateParams, Comentario, SERVER) {
		$scope.comentario = {
			id_comentario: null,
			id_user: null,
			id_post: null,
			texto: null
		};

		$scope.id_post = $stateParams.id;

		$scope.api_server = SERVER;

		// Justo de antes de entrar a la vista, le pedimos que traiga los comentarios.
		$scope.$on('$ionicView.beforeEnter', function() {
	        Comentario.comentarioPorPost($stateParams.id)
			.then(function(response) {
				$scope.comentarios = response.data;
			}, function() {
				// Reject
				console.log('Hubo un problema, no se pudo traer la información solicitada');
			});
	    });	

	}
]);