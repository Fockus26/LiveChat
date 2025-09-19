# LiveChat

A real-time chat application built with **Node.js**, **Socket.IO**, and **React**.  
Una aplicación de chat en tiempo real construida con **Node.js**, **Socket.IO** y **React**.

---

## 🌍 Overview / Descripción

**English**  

LiveChat is a real-time chat system developed as part of a 1-day technical challenge for an interview. The project includes both a **backend (Node.js + Socket.IO)** and a **frontend (React - CRA)**. It allows users to create or join chat rooms by providing an ID and then exchange messages instantly.

**Español**  

LiveChat es un sistema de chat en tiempo real desarrollado como parte de un reto técnico de 1 día para una entrevista. El proyecto incluye tanto el **backend (Node.js + Socket.IO)** como el **frontend (React - CRA)**. Permite a los usuarios crear o unirse a salas de chat proporcionando un ID, y luego intercambiar mensajes de forma instantánea.

---

## ✨ Features / Características

**English**

- 🌐 Real-time messaging with **Socket.IO**  
- 👥 Create or join chat rooms using an ID  
- 💬 Support for multiple rooms simultaneously  
- 🔄 Ephemeral storage (messages are not persisted in a database)  
- ⚡ Built in 1 day as a coding challenge  

**Español**

- 🌐 Mensajería en tiempo real con **Socket.IO**  
- 👥 Crear o unirse a salas de chat usando un ID
- 💬 Soporte para múltiples salas simultáneamente
- 🔄 Almacenamiento efímero (los mensajes no se persisten en una base de datos) 
- ⚡ Desarrollado en 1 día como reto técnico

---

## 🛠️ Tech Stack / Tecnologías

- **Backend:** Node.js, Express, Socket.IO  
- **Frontend:** React (Create React App)  
- **Others:** CORS, dotenv  

---

## 📂 Project Structure / Estructura del Proyecto

```text
LiveChat/
│
├── server/                 # Backend (Node.js + Socket.IO)
│   └── app.js
│
├── client/                 # Frontend (React - CRA)
│   ├── build/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── Chat.js
│       ├── Login.js
│       ├── Message.js
│       ├── index.js
│       ├── styles/
│       │   ├── Chat.css
│       │   ├── Login.css
│       │   └── index.css
│       └── assets/
│           └── chaticon.png
│
└── README.md
```

---


## ⚙️ Installation & Setup / Instalación y Configuración

### Clone repo / Clonar repositorio
```bash
git clone https://github.com/Fockus26/LiveChat.git
cd LiveChat
```

### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm start
```

---

### 🔑 Environment Variables / Variables de Entorno

**English**

Create a .env file inside /server with: 

**Español**

Crea un archivo .env dentro de /server con:

```env
PORT=3000
REACT_URL=http://localhost:3001
```

**English**

- PORT → Port where the server will runs
- REACT_URL → URL where the frontend is deployed or running locally

**Español**

- PORT → Puerta donde el servidor corre
- REACT_URL → URL donde el frontend esta subido o corriendo localmente

---

## 🚀 Usage / Uso

**English**

1. Start the backend (server/)
2. Start the frontend (client/)
3. Open the app in your browser
4. Enter a username and a room ID to join or create a chat room
5. Start chatting in real time!

**Español**

1. Inicia el backend (server/)
2. Inicia el frontend (client/)
3. Abre la app en tu navegador
4. Ingresa un nombre de usuario y un ID de sala para unirte o crear una sala de chat
5. ¡Empieza a chatear en tiempo real!

---

## 📡 API & Socket Events / Eventos de Socket

### Connection / Conexion
```js
io.on('connection', (socket) => {
   // User connected
});
```

### Join Room / Unirse a la sala
```js
socket.emit('join_room', {
  room: 'room-id',
  username: 'Cesar'
});
```

### Send Message / Enviar mensaje
```js
socket.emit('send_message', {
  room: 'room-id',
  sender: 'Cesar',
  text: 'Hello world',
  timestamp: Date.now()
});
```

### Receive Message / Recibir mensaje
```js
socket.on('receive_message', (data) => {
  console.log(data);
});
```

---

## 📖 Case Study / Caso de Estudio

**English**

This project was developed as part of a 1-day technical interview challenge. The goal was to design a simple but functional chat system with real-time communication.

- **Challenge**: Build a live chat with support for multiple rooms.
- **Approach**: Used Socket.IO for WebSocket connections, and React for a minimal frontend (Login, Chat, and Message components).
- **Constraints**: No database integration — messages are ephemeral.
- **Result**: A fully functional real-time chat delivered within the given deadline, successfully passing the interview.

**Español**

Este proyecto fue desarrollado como parte de un reto técnico de 1 día para una entrevista. El objetivo era diseñar un sistema de chat sencillo pero funcional con comunicación en tiempo real.

- **Reto**: Construir un chat en vivo con soporte para múltiples salas.
- **Enfoque**: Se utilizó Socket.IO para las conexiones WebSocket, y React para un frontend mínimo (componentes Login, Chat y Message).
- **Limitaciones**: Sin integración de base de datos — los mensajes son efímeros.
- **Resultado**: Un chat en tiempo real completamente funcional entregado dentro del plazo, logrando pasar la entrevista con éxito.

---

## 📈 Future Improvements / Mejoras Futuras

**English**

- 🗄️ Add database persistence (MongoDB, PostgreSQL)
- 🔐 User authentication (JWT, OAuth)
- 📲 Add typing indicators and presence status
- 📷 File/image sharing
- 📱 Deploy mobile-friendly UI

**Español**

- 🗄️ Agregar persistencia en base de datos (MongoDB, PostgreSQL)
- 🔐 Autenticación de usuarios (JWT, OAuth)
- 📲 Agregar indicadores de escritura y estado de presencia
- 📷 Compartir archivos e imágenes
- 📱 Optimizar/desplegar una interfaz amigable para móviles

---

## 📜 License / Licencia

**English**

This project is licensed under the MIT License.

**Español**

Este proyecto está licenciado bajo la Licencia MIT.
