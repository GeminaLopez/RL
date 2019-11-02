// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Auth', [
	'$http',
	'API_SERVER',
	function($http, API_SERVER) {
		// Definimos unas propiedades "privadas" para almacenar los datos de la autenticación, como el token, el nombre de usuario, etc.
		let access_token = null

		return{
			login: function(user){
				return $http.post(API_SERVER + '/auth/login', user,{
					credentials: 'include'
				}).then(function(response) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					let responsePayload = response.data;
					if(responsePayload.status == 1) {
						// Info correcta!
						// Registro en las variables del servicio el token y los datos del usuario.
						access_token = responsePayload.access_token;
						return responsePayload;
					} else {
						// Info errónea
						return responsePayload;
					}
				}, function(err) {
					if( err.data.status == 401)
					{
						return err.data;
					}
					else{
						// para los errores de validacion del form
						return err.data.errors;
					}
				});
			},
			registro: function(user){
				return $http.post(API_SERVER + '/usuarios', user,{
					headers:{
						'Access-Control-Allow-Origin': '*'
						
					}
				}).then(function(response) {
					console.log(response)
					// Vamos a verificar si la petición del login tuvo éxito o no.
					let responsePayload = response.data;
					if(responsePayload.status == 1) {
						// Vamos a verificar si la petición del login tuvo éxito o no.
						return response.data;
					}
				}, function(err) {
					console.log(err);
					// para los errores de validacion del form
					return err.data.errors;
				}
				);
			},
			getUser: function(){
				return $http.get(API_SERVER + '/auth/user',{
					headers:{
						Authorization: 'Bearer ' + access_token
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
						Authorization: 'Bearer ' + access_token
					}
				}).then(function(response) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					access_token = null	
					return response.data;
				});
			},
			isLogged: function() {
				if(access_token != null) {
					return true;
				} else {
					return false;
				}
			},
			getToken: function(){
				return 'Bearer ' + access_token;
			}

		}
	}
]);