// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Post', [
	'$http',
	'API_SERVER',
	'Auth',
	function($http, API_SERVER, Auth) {
		return {
			todos: function() {
				return $http.get(API_SERVER + '/posts',{
					headers:{
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			postAmigos: function() {
				return $http.get(API_SERVER + '/posts/amigos',{
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			crear: function(datos) {
				return $http.post(API_SERVER + '/posts', datos, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			}			
		};
	}
]);