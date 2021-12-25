var socket = io();

const params=new URLSearchParams(window.location.search)
if (!params.has('nombre')||!params.has('sala')) {
    window.location='index.html'
    throw new Error('El nombre y sala son necesario')
}
if (params.get('nombre').length==0) {
    window.location='index.html'
    throw new Error('El nombre y sala son necesario')
    
}

const usuario={
    nombre:params.get('nombre'),
    sala:params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat',usuario,function(resp){
        console.log('usuarios conectados ',resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});





// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


// Escuhar cambios de usuarios cuando sale o entra del chat

socket.on('listaPersona', function(mensaje) {

    console.log('personas:', mensaje);

});

// Mensajes privados

socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje Privado ',mensaje);
})