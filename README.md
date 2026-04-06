# ⚽ Zona 5 - Complejo Deportivo & E-commerce

<div align="center">

<img src="/src/assets/img/zona5pasto.png" alt="Logo Zona 5" width="300"/>

</div>

## 🚀 Descripción

**Zona 5** es una plataforma web integral desarrollada con el stack MERN (MongoDB, Express, React, Node.js), diseñada para modernizar y facilitar la gestión de un complejo de canchas deportivas.

El proyecto busca ofrecer una solución completa que combina la gestión de turnos con una tienda virtual, transmitiendo valores de:

- Rapidez y eficiencia en la reserva de turnos.
- Transparencia y facilidad en los métodos de pago.
- Experiencia de usuario intuitiva y moderna.

La aplicación incorpora **MongoDB** como base de datos principal, **JWT** para la autenticación y protección de rutas privadas, y una integración nativa con la API de **Mercado Pago** para procesar cobros de manera 100% online y segura.

## 📖 Sobre el Proyecto

**Zona 5** nace con el objetivo de eliminar las fricciones clásicas en el alquiler de canchas (llamadas perdidas, mensajes de WhatsApp sin leer, solapamiento de horarios). Ofrecemos un sistema donde reservar un partido tome menos de un minuto.

🛡️ Control inteligente anti-solapamiento de turnos.  
💳 Pasarela de pagos online y registro de pagos en efectivo.  
📧 Verificación de cuentas mediante correo electrónico.

## 🛠️ Tecnologías Utilizadas

<div align="center">

| Tecnologías                                                                                                          | Descripción                                                                                 |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                  | Biblioteca de JavaScript para crear interfaces de usuario interactivas y dinámicas.         |
| ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)                     | Herramienta de construcción rápida y moderna para proyectos web.                            |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)       | Framework de CSS para diseño responsivo y componentes estilizados (Mobile First).           |
| ![MercadoPago](https://img.shields.io/badge/MercadoPago-00B1EA?style=for-the-badge&logo=mercadopago&logoColor=white) | Integración de pasarela de pagos para procesar reservas de forma online.                    |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)             | Base de datos NoSQL orientada a documentos, utilizada para almacenar información de la app. |

</div>

Ver Demo en Vivo: [https://zona-5.vercel.app/](https://zona-5.vercel.app/)
Ver Documentación: [https://documenter.getpostman.com/view/51129014/2sBXihqY8e](https://documenter.getpostman.com/view/51129014/2sBXihqY8e)

</div>

## ⚙️ Instalación y Ejecución Local

1️⃣ Clonar el repositorio <br/>
`git clone https://github.com/SkyBreakk/proyecto-3-canchas-frontend.git`

2️⃣ Instalar dependencias del Frontend <br/>
`npm install`

3️⃣ Configurar variables de entorno <br/>
Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
VITE_API_URL=

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_MP_PUBLIC_KEY=
```
