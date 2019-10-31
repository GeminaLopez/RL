// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Comentario', [
	'$http',
	'API_SERVER',
	'Auth',
	function($http, API_SERVER, Auth) {
		return {
			comentarioPorPost: function(id) {
				return $http.get(API_SERVER + '/comentarios/' + id,{
					headers:{
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			crear: function(datos) {
				return $http.post(API_SERVER + '/comentarios', datos, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			}		
		};
	}
]);