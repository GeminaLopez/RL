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
						'Authorization': Auth.getToken()
					}
				});
			},
			editar: function(datos) {
				return $http.put(API_SERVER + '/perfil', datos, {
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			editarPassword: function(datos) {
				return $http.patch(API_SERVER + '/perfil', datos, {
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			getNoAmigos: function() {
				return $http.get(API_SERVER + '/perfil/getNoAmigos', {
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			getAmigos: function() {
				return $http.get(API_SERVER + '/perfil/getAmigos',{
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			agregarAmigo: function(id) {
				return $http.post(API_SERVER + '/perfil/agregarAmigo', id ,{
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			eliminarAmigo: function(id) {
				return $http.delete(API_SERVER + '/perfil/eliminarAmigo/' + id, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': Auth.getToken(),
					},
					body: {id : id}				
				});
			},
			getMensajes: function() {
				return $http.get(API_SERVER + '/mensajes/getMensajes',{
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			getChat: function(id) {
				return $http.get(API_SERVER + '/mensajes/'+ id ,{
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			enviarMensaje: function(datos, id) {
				return $http.post(API_SERVER + '/mensajes/'+ id, datos, {
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			getUsuarios:  function() {
				return $http.get(API_SERVER + '/mensajes/getUsuarios', {
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
			crearMensaje: function(datos) {
				return $http.post(API_SERVER + '/mensajes/nuevo', datos, {
					headers: {
						'Authorization': Auth.getToken()
					}
				});
			},
		};
	}
]);