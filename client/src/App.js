import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import Login from './Login'

// const socket = io.connect(process.env.REACT_APP_URL)
const socket = io.connect('https://livechat-backend-8iik.onrender.com')
console.log('https://livechat-backend-8iik.onrender.com')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  // Agrego un nuevo room o busco el room existente donde los usuarios podran chatear
  function joinRoom(event) {
    event.preventDefault()
    if (username.length > 0 && room.length > 0) {
      const dataUser = {username, room}
      socket.emit('join_room', dataUser)
      setShowChat(true)
    }
  }

  return (
    <main>
      {/* Si ingresamos el chat se mostrara de lo contrario se mostrara el login */}
      {showChat ? 
      <Chat socket={socket} username={username} room={room} setShowChat={setShowChat} /> : 
      <Login joinRoom={joinRoom} username={username} setUsername={setUsername} room={room} setRoom={setRoom} />}
    </main>
  )
}

export default App
