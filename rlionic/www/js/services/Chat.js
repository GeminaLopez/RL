// creo el nuevo servicio.
angular.module('RedLight.services')
.factory('Chat', [
	'$http',
	'Firebase',
	'Auth',
	function($http, Firebase, Auth) {
		return {

            // creo nuevo chat
            nuevoChat: function(mensaje) {
                let user, idChat, datos;
                return Auth.getUser().then(data => {
                    user = data;
                    if(user.id_user > mensaje.id_user) {
                        idChat = mensaje.id_user + "_" + user.id_user;
                    } else {
                        idChat = user.id_user + "_" + mensaje.id_user;
                    }

                    mensaje = {
                        emisor: user.id_user,
                        fecha: new Date(), 
                        mensaje: mensaje.mensaje     
                    }

                    return Firebase.addChatToCollection('chat', idChat, mensaje);
                });
            },

            // obtiene los chats
            getChats: function() {
                let user;
                return Auth.getUser().then(data => {
                    user = data;
                    return Firebase.getChats('chat', user.id_user);
                });
            },

            // obtiene msj de una charla "ver chat"
            getMensajes: function(id, callback) {
                let user, idChat;
                Auth.getUser().then(data => {
                    user = data;
                    if(user.id_user > id) {
                        idChat = id + "_" + user.id_user;
                    } else {
                        idChat = user.id_user + "_" + id;
                    }

                    Firebase.getCollection('chat/' + idChat + '/mensajes', function(response){
                        callback(response);
                    })
                    //return callback(Firebase.getCollection('chat/' + idChat + '/mensajes'));
                });
            },
            sendMensaje: function(mensaje, id) {
                let user, idChat, datos;
                return Auth.getUser().then(data => {
                    user = data;
                    if(user.id_user > id) {
                        idChat = id + "_" + user.id_user;
                    } else {
                        idChat = user.id_user + "_" + id;
                    }

                    datos = {
                        emisor: user.id_user,
                        fecha: new Date(), 
                        mensaje: mensaje.mensaje
                    }

                    return Firebase.addMensajeToCollection('chat/' + idChat + '/mensajes', datos);
                });  
            },

		};
	}
]);