// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Genero', [
	'$http',
	'API_SERVER',
	function($http, API_SERVER) {
		return {
			todos: function() {
				return $http.get(API_SERVER + '/genero');
			},
			traerGeneroPorID: function(id){
				return $http.get(API_SERVER + '/genero/'+ id);
			}
		};
	}
]);