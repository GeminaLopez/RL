// creo el nuevo servicio para usuario.
angular.module('RedLight.services')
.factory('Usuario', [
	'$http',
	'API_SERVER',
	'Auth',
	function($http, API_SERVER, Auth) {
		return {
			getLoggedUser: function () {
				return $http.get(API_SERVER + '/perfil', {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			editar: function(datos) {
				return $http.put(API_SERVER + '/perfil', datos, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			editarPassword: function(datos) {
				return $http.patch(API_SERVER + '/perfil', datos, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			getNoAmigos: function(id) {
				return $http.get(API_SERVER + '/perfil/getNoAmigos/'+ id, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			getAmigos: function(id) {
				return $http.get(API_SERVER + '/perfil/getAmigos/'+ id,{
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			agregarAmigo: function(id) {
				return $http.post(API_SERVER + '/perfil/agregarAmigo/'+ id, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			eliminarAmigo: function(id) {
				return $http.delete(API_SERVER + '/perfil/eliminarAmigo/' + id, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}			
				});
			},
			getMensajes: function() {
				return $http.get(API_SERVER + '/mensajes/getMensajes',{
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			getChat: function(id) {
				return $http.get(API_SERVER + '/mensajes/'+ id ,{
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			enviarMensaje: function(datos, id) {
				return $http.post(API_SERVER + '/mensajes/'+ id, datos, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			getUsuarios:  function() {
				return $http.get(API_SERVER + '/mensajes/getUsuarios', {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
			crearMensaje: function(datos) {
				return $http.post(API_SERVER + '/mensajes/nuevo', datos, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': Auth.getToken()
					}
				});
			},
		};
	}
]);