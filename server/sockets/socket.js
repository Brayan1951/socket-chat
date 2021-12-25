const { io } = require("../server");
const Usuarios = require("../classes/usuarios");
const {crearMensaje} = require('../utils/utilidades');

var usuarios = new Usuarios();

io.on("connection", (client) => {
  client.on("entrarChat", (usuario, callback) => {


    if (!usuario.nombre) {
      return callback({
        error: true,
        msg: "El nombre/sala es necesario",
      });
    }

    client.join(usuario.sala)

    const personas = usuarios.agregarPersonas(client.id, usuario.nombre,usuario.sala);
    client.broadcast.to(usuario.sala).emit("listaPersona", usuarios.getPersonasPorSala(usuario.sala));
    client.broadcast.to(usuario.sala).emit("crearMensaje",crearMensaje('Admin',`${usuario.nombre} se unio`));
    callback(personas);
  });


  client.on('crearMensaje',(data,callback)=>{
      const persona=usuarios.getPersona(client.id)
      const mensaje=crearMensaje(persona.nombre,data.mensaje)
      client.broadcast.to(persona.sala).emit('crearMensaje',mensaje)
 
      callback(mensaje)
    })
    
    
    client.on("disconnect", () => {
        const personaBorrada = usuarios.borrarPersona(client.id);
        
        client.broadcast.to(personaBorrada.sala).emit("crearMensaje",crearMensaje('Admin',`${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit("listaPersona", usuarios.getPersonasPorSala(personaBorrada.sala));
    });
    
    
    client.on('mensajePrivado',data=>{
    const persona=usuarios.getPersona(client.id)
    client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje))

})


});
