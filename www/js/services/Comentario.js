// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Comentario', [
	'$http',
	'API_SERVER',
	'Auth',
	function($http, API_SERVER, Auth) {
		return {
			comentarioPorPost: function(id) {
				return $http.get(API_SERVER + '/comentarios/' + id);
			},
			crear: function(datos, id) {
				return $http.post(API_SERVER + '/comentarios/'+ id, datos, {
					headers: {
						'X-Token': Auth.getToken()
					}
				});
			}		
		};
	}
]);