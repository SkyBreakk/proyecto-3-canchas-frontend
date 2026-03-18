# ⚽ Zona 5 - Complejo Deportivo & E-commerce

🚀 **Descripción**

Zona 5 es una plataforma web integral desarrollada con el stack MERN (MongoDB, Express, React, Node.js) diseñada para gestionar un complejo de canchas deportivas. La aplicación no solo permite a los usuarios registrarse y reservar sus turnos, sino que también integra una tienda virtual para la compra de artículos deportivos.

El sistema cuenta con un robusto panel de administración y un sistema de pagos híbrido, permitiendo abonar los turnos de manera presencial o de forma 100% online a través de Mercado Pago.

### ✨ Características Principales
* **Autenticación Segura:** Registro y Login con JWT (JSON Web Tokens) y verificación de cuentas mediante envío de correos electrónicos (Nodemailer).
* **Gestión de Reservas:** Sistema inteligente que evita el solapamiento de turnos en una misma cancha, fecha y hora.
* **Pasarela de Pagos:** Integración nativa con la API de **Mercado Pago** para abonar reservas directamente desde la web.
* **Panel de Administrador:** Vista exclusiva con protección de rutas (Middlewares de roles) para gestionar reservas, cambiar estados de pago y moderar usuarios/productos.
* **Tienda Online:** E-commerce integrado para la venta de productos deportivos.

---

📖 **Sobre el Proyecto**

Zona 5 nace con el objetivo de modernizar la gestión de los complejos deportivos, eliminando las planillas de papel y los mensajes de WhatsApp perdidos. Buscamos ofrecer una experiencia de usuario rápida, intuitiva y segura, donde reservar un partido con amigos tome menos de un minuto.

---

🛠️ **Tecnologías Utilizadas**

| Tecnología | Descripción |
| :--- | :--- |
| **React + Vite** | Biblioteca principal para la construcción de interfaces de usuario dinámicas y ultrarrápidas. |
| **Node.js & Express** | Entorno de ejecución y framework para la creación de nuestra API REST y manejo de rutas backend. |
| **MongoDB & Mongoose** | Base de datos NoSQL orientada a documentos para almacenar usuarios, reservas, productos y canchas. |
| **Mercado Pago API** | SDK oficial utilizado para generar preferencias de pago y procesar cobros online. |
| **JWT & Bcrypt** | Herramientas para la encriptación de contraseñas y el manejo de sesiones seguras mediante tokens. |
| **React Hook Form** | Gestión eficiente y validación estricta de formularios en el frontend. |
| **Bootstrap** | Framework de CSS para un diseño 100% responsivo (Mobile First) y estilizado. |

---

🖥️ **Demostración**

**Ver Demo en Vivo:** [https://zona-5.vercel.app/](https://zona-5.vercel.app/)

---

⚙️ **Instalación y Ejecución Local**

### 1️⃣ Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/zona-5.git](https://github.com/tu-usuario/zona-5.git)