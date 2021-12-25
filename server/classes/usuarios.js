class Usuario {
  constructor() {
    this.personas = [];
  }

  agregarPersonas(id, nombre,sala) {
    const persona = {
      id,
      nombre,
      sala
    };
    this.personas.push(persona);
    return this.personas;
  }
  // = es asginar ===comparacion
  getPersona(id) {
    const persona = this.personas.filter((persona) => persona.id === id)[0];
    return persona;
  }

  getPersonas() {
    return this.personas;
  }

  getPersonasPorSala(sala) {
    const personasEnsala=this.personas.filter(persona=>persona.sala==sala)
    return personasEnsala
  }

  borrarPersona(id) {
    const personaBorrada = this.getPersona(id);

    this.personas = this.personas.filter((persona) => persona.id !== id);

    return personaBorrada;
  }
}

module.exports = Usuario;
