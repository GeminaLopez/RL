// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Auth', [
	'$http',
	'API_SERVER',
	'Firebase',
	function($http, API_SERVER, Firebase) {
		// Definimos unas propiedades "privadas" para almacenar los datos de la autenticación, como el token, el nombre de usuario, etc.
		//let access_token = null

		let userData = {
			id: null,
			email: null,
			usuario: null,
			ttl: null,
		};

		/** Contiene el id del timeout para el logout. */
		let toid;

		if(localStorage.getItem('userData') !== null) {
			userData = JSON.parse(localStorage.getItem('userData'));
			setAuthTimeout();
		}

		/**
		 * Setea un timeout para desloguear automáticamente al usuario pasada
		 * la duración de la sesión.
		 */
		function setAuthTimeout() {
			if(toid) {
				clearTimeout(toid);
			}
			// Calculamos el tiempo en segundos de duración de la sesión.
			const time = userData.ttl - Math.floor(Date.now() / 1000);
			toid = setTimeout(() => {
				logout();
			}, time * 1000);
		}

		return{
			login: function(user){
				return $http.post(API_SERVER + '/auth/login', user,{
					credentials: 'include'
				}).then(function(rta) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					if(rta.data.status == 1) {
						// Info correcta!
						//access_token = responsePayload.access_token;
						userData = {
							id: rta.data.data.id,
							email: rta.data.data.email,
							usuario: rta.data.data.usuario,
							ttl: rta.data.data.ttl,
						};
						localStorage.setItem('userData', JSON.stringify(userData));
						setAuthTimeout();
						Firebase.login(user);
						return rta;
					} else {
						// Info errónea
						return rta;
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
					credentials: 'include'
				}).then(function(response) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					let responsePayload = response.data;
					if(responsePayload.status == 1) {
						Firebase.registro(user.email, user.password);
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
					credentials: 'include'
				}).then(function(response) {
					// Vamos a verificar si la petición de get user tuvo éxito o no.
					let responsePayload = response.data;
					return responsePayload;
				});
			},
			logout: function(){
				return $http.get(API_SERVER + '/auth/logout',{
					credentials: 'include'
				}).then(function(rta) {
					// Vamos a verificar si la petición del login tuvo éxito o no.
					userData = {
						id: null,
						email: null,
						usuario: null,
						ttl: null,
					};
					localStorage.removeItem('userData');
					Firebase.logout();
					return rta.data;
				});
			},
			isLogged: function() {
				let user = Firebase.getCurrentUser();
				return userData.id !== null || user.email !== null ;
			},
		}
	}
]);