// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Ciudad', [
	'$http',
	'API_SERVER',
	function($http, API_SERVER) {
		return {
			todas: function() {
				return $http.get(API_SERVER + '/ciudad');
			},
			traerCiudadPorID: function(id){
				return $http.get(API_SERVER + '/ciudad/'+ id);
			}
		};
	}
]);