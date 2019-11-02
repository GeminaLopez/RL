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
					credentials: 'include'
				});
			},
			editar: function(datos) {
				return $http.put(API_SERVER + '/perfil', datos, {
					credentials: 'include'
				});
			},
			editarPassword: function(datos) {
				return $http.patch(API_SERVER + '/perfil', datos, {
					credentials: 'include'
				});
			},
			getNoAmigos: function(id) {
				return $http.get(API_SERVER + '/perfil/getNoAmigos/'+ id, {
					credentials: 'include'
				});
			},
			getAmigos: function(id) {
				return $http.get(API_SERVER + '/perfil/getAmigos/'+ id,{
					credentials: 'include'
				});
			},
			agregarAmigo: function(id) {
				return $http.post(API_SERVER + '/perfil/agregarAmigo', id, {
					credentials: 'include'
				});
			},
			eliminarAmigo: function(id) {
				return $http.delete(API_SERVER + '/perfil/eliminarAmigo/' + id, {
					credentials: 'include'			
				});
			},
			getMensajes: function() {
				return $http.get(API_SERVER + '/mensajes/getMensajes',{
					credentials: 'include'
				});
			},
			getChat: function(id) {
				return $http.get(API_SERVER + '/mensajes/'+ id ,{
					credentials: 'include'
				});
			},
			enviarMensaje: function(datos, id) {
				return $http.post(API_SERVER + '/mensajes/'+ id, datos, {
					credentials: 'include'
				});
			},
			getUsuarios:  function() {
				return $http.get(API_SERVER + '/mensajes/getUsuarios', {
					credentials: 'include'
				});
			},
			crearMensaje: function(datos) {
				return $http.post(API_SERVER + '/mensajes/nuevo', datos, {
					credentials: 'include'
				});
			},
		};
	}
]);