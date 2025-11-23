# Sabor Urbano - API REST

**Tecnicatura en Desarrollo de Software – IFTS 29**  
**Materia:** Desarrollo de Sistemas Web Backend  
**Integrantes:**
- Nicolini, Guido
- Vazquez, Ian
- Caeiro, Felicitas
  
---

## Descripción
API REST para el restaurante **Sabor Urbano**, desarrollada con **Node.js** y **Express**, que permite gestionar **clientes**, **productos** y **pedidos**.  
El proyecto incluye integración con **Pug** para vistas dinámicas.

---

## 🚀 Tecnologías utilizadas

- **Node.js** v22  
- **Express** v5  
- **Pug** v3  
- **MongoDB + Mongoose** 

---


## 🧠 Funcionalidades principales

- 🔐 **Autenticación y sesiones de usuario**
  - Inicio y cierre de sesión con control de acceso según rol.
  - Protección de rutas y persistencia de sesión mediante `express-session`.

- 🧾 **Gestión de productos**
  - Alta, baja, modificación y consulta de productos.

- 👥 **Gestión de clientes**
  - Registro, actualización y eliminación de clientes.
  - Asociación de clientes a pedidos existentes.

- 🍽️ **Gestión de pedidos**
  - Creación y edición de pedidos.
  - Control de estados: `pendiente`, `preparando`, `finalizado`.
  - Actualización visual en Pug mediante `fetch()` y recarga dinámica.

- 📊 **Módulo de informes**
  - Reportes automáticos de:
    - *Productos más vendidos*
    - *Clientes más recurrentes*
  - Datos generados a partir de los pedidos realizados.

- 💾 **Persistencia de datos**
  - Manejo de información mediante **MongoDB**.

- 💡 **Interfaz dinámica con Pug**
  - Vistas limpias.
  - Integración con formularios.

---

## ⚙️ Funcionamiento
- Ejecutar:  
```bash
npm install
npm run dev
```

---

## 📦 Endpoints principales:

`/clientes`
  - GET → Obtener clientes
  - POST → Registrar cliente
  - PUT → Actualizar cliente
  - DELETE → Eliminar cliente
    
`/pedidos`
  - GET → Obtener pedidos
  - POST → Registrar pedido
  - PUT → Actualizar pedido
  - DELETE → Eliminar pedido
    
`/productos`
  - GET → Obtener productos
  - POST → Registrar producto
  - PUT → Actualizar producto
  - DELETE → Eliminar producto
    
`/informe`
  - GET → Obtener informe
  
`/caja`
  - GET → Obtener pagos
  - POST → Registrar pago

---

## Bibliografía

[Node.js Docs](https://nodejs.org/docs/latest/api/)
[Express Docs](https://expressjs.com/)
[Pug Docs](https://pugjs.org/api/getting-started.html)
[Mongo Docs](https://www.mongodb.com/docs/)
[Mongoose Docs](https://mongoosejs.com/docs/guide.html)
[Passport-JWT Docs](https://www.passportjs.org/packages/passport-jwt/)
