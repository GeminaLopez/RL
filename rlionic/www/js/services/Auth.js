// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Auth', [
	'$http',
	'API_SERVER',
	function($http, API_SERVER) {
		// Definimos unas propiedades "privadas" para almacenar los datos de la autenticación, como el token, el nombre de usuario, etc.
		let token_type = null,
			access_token = null

		return{
			login: function(user){
				return $http.post(API_SERVER + '/auth/login', user).then(function(response) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					let responsePayload = response.data;
					if(responsePayload.status == 1) {
						// Info correcta!
						// Registro en las variables del servicio el token y los datos del usuario.
						token_type = responsePayload.token_type;
						access_token = responsePayload.access_token;
						return responsePayload;
					} else {
						// Info errónea
						return responsePayload;
					}
				});
			},
			registro: function(user){
				return $http.post(API_SERVER + '/usuarios', user,{
					headers:{
						'Access-Control-Allow-Origin': '*'
					}
				}).then(function(response) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					return response.data;
				});
			},
			getUser: function(){
				return $http.get(API_SERVER + '/auth/user',{
					headers:{
						'Access-Control-Allow-Origin': '*',
						Authorization: token_type + ' ' + access_token
					}
				}).then(function(response) {
					// Vamos a verificar si la petición de get user tuvo éxito o no.
					let responsePayload = response.data;
					return responsePayload;
				});
			},
			logout: function(){
				return $http.get(API_SERVER + '/auth/logout',{
					headers:{
						'Access-Control-Allow-Origin': '*',
						Authorization: token_type + ' ' + access_token
					}
				}).then(function(response) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					token_type = null,
					access_token = null	
					return response.data;
				});
			},
			isLogged: function() {
				if(token_type != null) {
					return true;
				} else {
					return false;
				}
			},
			getToken: function(){
				return token_type + ' ' + access_token;
			}

		}
	}
]);