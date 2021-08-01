angular.module('RedLight.services')
.factory('Firebase', [
	'$http',
	'API_SERVER',
	function($http, API_SERVER) {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyC6013VMVQnJZ0AFo95GBU5jTnDObX3H9A",
            authDomain: "red-light-1567463578930.firebaseapp.com",
            databaseURL: "https://red-light-1567463578930.firebaseio.com",
            projectId: "red-light-1567463578930",
            storageBucket: "red-light-1567463578930.appspot.com",
            messagingSenderId: "965340307082",
            appId: "1:965340307082:web:9ee51ff6956d06f9569773",
            measurementId: "G-SLT02WFFD1"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // firebase.analytics();
        const auth = firebase.auth();
        const store = firebase.firestore();
        
        const userData = {
            email: null
        };

		return {
			login: function(user) {
                auth.signInWithEmailAndPassword(user.email, user.password)
                .catch(error => {
                    // error
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
                auth.onAuthStateChanged(user => {
                    if(user) {
                        // Hay user! :D
                        userData.email = user.email;
                        console.log("firebase Auth: ", userData);
                    } else {
                        // No está logueado.
                    }
                });
            },

            logout: function() {
                auth.signOut().then(() => {
                // Sign-out successful.
                }).catch((error) => {
                // An error happened.
                });
            },

            getCurrentUser: function() {
                var user = auth.currentUser;
                if(user) {
                    return user
                }
            },

            registro: function(email,password){
                auth.createUserWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
            },

            getCollection: function(url, callback) {
                const ref = store.collection(url);

                ref.orderBy('fecha').onSnapshot(snapshot => {
                    const salida = [];

                    snapshot.forEach(doc => {
                        salida.push(doc.data());
                    });

                    callback(salida);
                });
            },

            getChats: function(url, id_user) {
                const ref = store.collection(url);

                return ref.get().then(function(querySnapshot) {
                    const salida = [];
                    querySnapshot.forEach(function(doc) {
                        if(doc.id.indexOf(id_user) !== -1){
                            if(doc.id.split("_")[1] == id_user)
                            {
                                salida.push(doc.id.split("_")[0]);
                            }
                            else{
                                salida.push(doc.id.split("_")[1]);
                            }
                        }
                        
                    });
                    return salida;
                })
            },

            addMensajeToCollection: function(url,datos) {
                const ref = store.collection(url);

                return ref.add(datos).then(data => {
                    console.log("Mensaje enviado! ", data);
                });
            },

            addChatToCollection: function(url, idChat, datos) {
                const ref = store.collection(url);
                let mensajes = {};

                return ref.doc(idChat).set(mensajes).then(data => {
                    let mensaje = store.collection('chat/'+ idChat +'/mensajes');
                    mensaje.add(datos).then(data => {
                        console.log("Mensaje enviado! ", data);
                    });
                    console.log("Chat nuevo creado ", data);
                });
            },

		};
	}
]);