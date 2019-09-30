// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('ComentariosCtrl', [
	'$scope',
	'$stateParams',
	'Comentario',
	'API_SERVER',
	function($scope, $stateParams, Comentario, API_SERVER) {
		$scope.comentario = {
			id: null,
			fkUsuarios: null,
			fkPosts: null,
			texto: null
		};

		$scope.fkPosts = $stateParams.id;

		$scope.api_server = API_SERVER+'/';

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