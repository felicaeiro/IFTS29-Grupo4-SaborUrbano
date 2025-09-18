class Cliente{

  constructor(id, nombre, apellido, fecha_nacimiento, dni, domicilio) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nacimiento = fecha_nacimiento;
    this.dni = dni;
    this.domicilio = domicilio;
  }

}

module.exports = { Cliente };