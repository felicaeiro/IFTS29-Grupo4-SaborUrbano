const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');

class DatosService{

    async crearProductos() {
        const productos = [
            {
                nombre: 'Provoleta',
                descripcion: 'Queso provolone a la parrilla con orégano y ají molido.',
                precio: 4000
            },
            {
                nombre: "Matambre a la Pizza",
                descripcion: "Corte de carne cubierto con salsa de tomate, queso y morrones.",
                precio: 15000
            },
            {
                nombre: "Locro",
                descripcion: "Guiso tradicional con maíz, zapallo, porotos y carnes.",
                precio: 10000
            },
            {
                nombre: "Tamales",
                descripcion: "Masa de maíz rellena de carne y envuelta en chala.",
                precio: 7000
            },
            {
                nombre: "Humita en Chala",
                descripcion: "Preparación de maíz tierno con queso, envuelta en hojas de choclo.",
                precio: 400
            },
            {
                nombre: "Bife de Chorizo",
                descripcion: "Clásico corte argentino de carne a la parrilla.",
                precio: 28000
            },
            {
                nombre: "Choripán",
                descripcion: "Chorizo a la parrilla en pan francés con chimichurri.",
                precio: 7000
            },
            {
                nombre: "Bondiola Braseada",
                descripcion: "Bondiola de cerdo cocida lentamente con salsa criolla.",
                precio: 19000
            },
            {
                nombre: "Guiso de Lentejas",
                descripcion: "Plato casero con lentejas, chorizo colorado y panceta.",
                precio: 8000
            },
            {
                nombre: "Flan Casero",
                descripcion: "Flan de huevo acompañado de dulce de leche y crema.",
                precio: 4000
            },
            {
                nombre: "Panqueque de Dulce de Leche",
                descripcion: "Clásico panqueque relleno con abundante dulce de leche.",
                precio: 3500
            },
            {
                nombre: "Helado Artesanal",
                descripcion: "Helado de elaboración propia, sabores:vainilla, dulce de leche o chocolate.",
                precio: 3500
            }
        ];

        try {
            await Producto.insertMany(productos);
            console.log('Productos guardados exitosamente.');
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }

    async crearClientes() {
        const clientes = [
            {
                nombre: "Juan",
                apellido: "Pérez",
                fecha_nacimiento: "1985-03-12",
                dni: 31548792,
                domicilio: "Av. Corrientes 1234"
            },
            {
                nombre: "María",
                apellido: "González",
                fecha_nacimiento: "1992-07-25",
                dni: 36987123,
                domicilio: "Calle Falsa 567"
            },
            {
                nombre: "Carlos",
                apellido: "Rodríguez",
                fecha_nacimiento: "1978-11-02",
                dni: 26789456,
                domicilio: "Av. Rivadavia 890"
            },
            {
                nombre: "Ana",
                apellido: "López",
                fecha_nacimiento: "1995-01-30",
                dni: 38123456,
                domicilio: "Boulevard Oroño 210"
            },
            {
                nombre: "Luis",
                apellido: "Martínez",
                fecha_nacimiento: "1980-09-15",
                dni: 28456789,
                domicilio: "San Martín 345"
            },
            {
                nombre: "Laura",
                apellido: "Sánchez",
                fecha_nacimiento: "1988-06-18",
                dni: 33654987,
                domicilio: "Belgrano 1122"
            },
            {
                nombre: "Jorge",
                apellido: "Gómez",
                fecha_nacimiento: "1975-04-22",
                dni: 24876123,
                domicilio: "Sarmiento 789"
            },
            {
                nombre: "Sofía",
                apellido: "Fernández",
                fecha_nacimiento: "2000-02-14",
                dni: 42123789,
                domicilio: "Urquiza 2345"
            },
            {
                nombre: "Miguel",
                apellido: "Díaz",
                fecha_nacimiento: "1991-12-01",
                dni: 35789654,
                domicilio: "9 de Julio 1500"
            },
            {
                nombre: "Valentina",
                apellido: "Moreno",
                fecha_nacimiento: "1998-08-08",
                dni: 40987321,
                domicilio: "Av. Pellegrini 678"
            },
            {
                nombre: "Ricardo",
                apellido: "Romero",
                fecha_nacimiento: "1969-10-10",
                dni: 21345876,
                domicilio: "Córdoba 1357"
            },
            {
                nombre: "Camila",
                apellido: "Álvarez",
                fecha_nacimiento: "1993-05-03",
                dni: 37654123,
                domicilio: "Entre Ríos 456"
            },
            {
                nombre: "Fernando",
                apellido: "Torres",
                fecha_nacimiento: "1983-02-28",
                dni: 30123987,
                domicilio: "Maipú 987"
            },
            {
                nombre: "Julieta",
                apellido: "Ruiz",
                fecha_nacimiento: "1997-07-07",
                dni: 39876543,
                domicilio: "Santa Fe 1212"
            },
            {
                nombre: "Diego",
                apellido: "Ramírez",
                fecha_nacimiento: "1986-11-11",
                dni: 32456123,
                domicilio: "Salta 2020"
            },
            {
                nombre: "Lucía",
                apellido: "Flores",
                fecha_nacimiento: "1990-04-19",
                dni: 34987654,
                domicilio: "Tucumán 340"
            },
            {
                nombre: "Pablo",
                apellido: "Benítez",
                fecha_nacimiento: "1979-08-23",
                dni: 27890123,
                domicilio: "Jujuy 810"
            },
            {
                nombre: "Martina",
                apellido: "Acosta",
                fecha_nacimiento: "2001-03-05",
                dni: 43123890,
                domicilio: "La Rioja 1414"
            },
            {
                nombre: "Javier",
                apellido: "Medina",
                fecha_nacimiento: "1982-01-17",
                dni: 29654321,
                domicilio: "Mendoza 1600"
            },
            {
                nombre: "Paula",
                apellido: "Herrera",
                fecha_nacimiento: "1994-09-09",
                dni: 37987123,
                domicilio: "San Juan 1818"
            },
            {
                nombre: "Andrés",
                apellido: "Suárez",
                fecha_nacimiento: "1987-05-14",
                dni: 32876543,
                domicilio: "Catamarca 555"
            },
            {
                nombre: "Florencia",
                apellido: "Giménez",
                fecha_nacimiento: "1996-10-26",
                dni: 39123456,
                domicilio: "Chacabuco 123"
            },
            {
                nombre: "Sergio",
                apellido: "Pereyra",
                fecha_nacimiento: "1973-03-01",
                dni: 23456789,
                domicilio: "Ayacucho 999"
            },
            {
                nombre: "Rocío",
                apellido: "Castillo",
                fecha_nacimiento: "1999-12-12",
                dni: 41876543,
                domicilio: "Junín 777"
            },
            {
                nombre: "Matías",
                apellido: "Ortiz",
                fecha_nacimiento: "1989-02-04",
                dni: 34123890,
                domicilio: "Pueyrredón 432"
            }
        ];

        try {
            await Cliente.insertMany(clientes);
            console.log('Clientes guardados exitosamente.');
        } catch (error) {
            console.error('Error al guardar los clientes:', error);
        }
    }


    async crearPedidos() {
        try {
            const clientes = await Cliente.find({}, '_id');
            const productos = await Producto.find({}, '_id precio');

            if (clientes.length === 0 || productos.length === 0) {
                console.log('No hay suficientes clientes o productos en la base de datos para crear pedidos.');
                return;
            }

            const pedidos = [];
            const tipos = ['delivery', 'local'];

            for (let i = 0; i < 20; i++) {
                // 1. Seleccionar cliente aleatorio
                const clienteAleatorio = clientes[Math.floor(Math.random() * clientes.length)];

                // 2. Seleccionar productos aleatorios (entre 1 y 4)
                const cantidadProductos = Math.floor(Math.random() * 4) + 1;
                const productosPedido = [];
                let totalPedido = 0;
                const productosDisponibles = [...productos];

                for (let j = 0; j < cantidadProductos; j++) {
                    if (productosDisponibles.length === 0) break;
                    const indiceProducto = Math.floor(Math.random() * productosDisponibles.length);
                    const productoSeleccionado = productosDisponibles.splice(indiceProducto, 1)[0];
                    productosPedido.push(productoSeleccionado._id);
                    totalPedido += productoSeleccionado.precio;
                }

                // 3. Crear el pedido
                const nuevoPedido = {
                    fecha: new Date(new Date() - Math.random() * (365 * 24 * 60 * 60 * 1000)), // Fecha aleatoria en el último año
                    total: totalPedido,
                    tipo: tipos[Math.floor(Math.random() * tipos.length)],
                    id_cliente: clienteAleatorio._id,
                    productos: productosPedido,
                };
                pedidos.push(nuevoPedido);
            }

            await Pedido.insertMany(pedidos);
            console.log('20 pedidos aleatorios creados exitosamente.');
        } catch (error) {
            console.error('Error al crear los pedidos:', error);
        }
    }

}

module.exports = new DatosService();