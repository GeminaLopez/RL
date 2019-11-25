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
                auth.signInWithEmailAndPassword(user.email, user.password).catch({
                    // error
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

            registro: function(user){
                
            },

            getCollection: function(url) {
                const ref = store.collection(url);

                return ref.orderBy('fecha').get().then(snapshot => {
                    const salida = [];

                    snapshot.forEach(doc => {
                        salida.push(doc.data());
                    });

                    return salida;
                });
            },

            getChats: function(url, id_user) {
                const ref = store.collection(url);

                return ref.get().then(function(querySnapshot) {
                    const salida = [];
                    querySnapshot.forEach(function(doc) {
                        salida.push(doc.id.split("_")[1]);
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