import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { IoMdSend, IoMdCheckmark } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import logo from './assets/chatIcon.png'
import './styles/Chat.css'

function Chat({socket, username, room, setShowChat}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [editMessage, setEditMessage] = useState(false);
    const [idMessage, setIdMessage] = useState(0);
    // Obtengo el elemnto html textarea
    const textAreaRef = useRef(null);
    
    
    // Ajusto el tamaño del textarea segun corresponda al texto que se este escrito
    const resizeTextArea = () => {
      if (!textAreaRef.current) {
        return;
      }

      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      
      const currentHeight = parseInt(textAreaRef.current.style.height.split("px")[0])
      
      if (currentHeight > 80) {
        textAreaRef.current.style.overflow = 'auto';
      } else {
        textAreaRef.current.style.overflow = 'hidden';
      }
    };
  
    useEffect(() => {
      resizeTextArea();
      window.addEventListener("resize", resizeTextArea);
    }, []);

    function scrollMessage() {
        var chatList = document.querySelector('ul')
        chatList.scrollTop = chatList.scrollHeight
    }

    async function sendMessage() {
        // Si hay un mensaje por enviar
        if (message.length > 0) {
            const dataMessage = {
                message,
                room,
                username,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
                isEdited: false
            }
            await socket.emit('send_message', dataMessage)
            // Aseguro que ambos obtengan el mensaje
            setMessages((prevMessages) => [...prevMessages, dataMessage])
            // Al enviar el mensaje el input estara vacio
            setMessage('')
            // Vuelve a enfocar el textarea
            textAreaRef.current.focus()
            scrollMessage()
        }
    }

    function handleEditMessage(message, id) {
        setIdMessage(id)
        setMessage(message)
        setEditMessage(true)
        textAreaRef.current.focus()
    }

    async function changeMessage() {
        const updatedMessages = messages.map((prevMessage, index) => {
            if (index === idMessage) {
                return { ...prevMessage, message, isEdited: true };
            }
            return prevMessage;
        });
    
        setMessages(updatedMessages);
    
        await socket.emit('send_message', updatedMessages[idMessage]);
    
        setEditMessage(false);
        setMessage('');
        textAreaRef.current.focus();
    }
    

    async function deleteMessage(id) {
        const updatedMessages = messages.filter((_, index) => index !== id);
        
        setMessages(updatedMessages);
    
        await socket.emit('delete_message', id);
    }
    

    // Recibo los datos del mensaje que se envio
    useEffect(() => {
        // Funcion que agrega el mensaje a la lista de mensajes
        function handleMessage(dataMessage) {
            setMessages((prevMessages) => [...prevMessages, dataMessage])
        }
        socket.on('receive_message', handleMessage)
        // Apaga el socket para que el mensaje no se envie dos veces
        return () => socket.off('receive_message', handleMessage)
    }, [socket])

    useEffect(() => {
        function handleDeleteMessage(messageId) {
            setMessages((prevMessages) =>
                prevMessages.filter((_, index) => index !== messageId)
            );
        }
    
        socket.on('message_deleted', handleDeleteMessage);
    
        return () => socket.off('message_deleted', handleDeleteMessage);
    }, [socket]);

    return (
        <div className='container-chat'>
            <div>
                <header>
                    <div>
                        <img src={logo} alt="Icon Room" /> 
                        <h2>{room}</h2> 
                    </div>
                    <button onClick={() => setShowChat(false)}><RiCloseLargeFill /></button>
                </header>
                
                <ul>
                    {/* Muestro todos los mensajes que se han enviado */}
                    {messages.map((dataMessage, index) => {
                        // Modifico el estilo del mensaje dependiendo de si es el remitente o el destinatario
                        const messageStyle = {
                            // backgroundColor: username === dataMessage.username ? 'hsl(203, 74%, 85%)' : 'hsl(193, 100%, 88%)',
                            backgroundColor: username === dataMessage.username ? '#00a1c9' : '#0075be',
                            alignSelf: username === dataMessage.username ? 'end' : 'start'
                        }
                        
                        var isUser;
                        if (username === dataMessage.username) {
                            isUser = true
                        } else {
                            isUser = false
                        }

                        return <Message 
                            key={index} id={index} messageStyle={messageStyle} dataMessage={dataMessage}
                            handleEditMessage={handleEditMessage} deleteMessage={deleteMessage} isUser={isUser}
                        />
                    })}
                </ul>

                <footer>
                    { editMessage ? 
                        <div className="edit-container">
                            <textarea className="edit"
                                onChange={(e) => {setMessage(e.target.value); resizeTextArea()} } 
                                ref={textAreaRef} value={message} rows={1}>
                            </textarea>
                            <div className="button-group">
                                <button onClick={changeMessage}><IoMdCheckmark /></button>
                                <button onClick={() => {setEditMessage(false); setMessage('')}}><RiCloseLargeFill /></button>
                            </div>
                        </div> : 
                        <div> 
                            <textarea 
                                onChange={(e) => {setMessage(e.target.value); resizeTextArea()} } 
                                ref={textAreaRef} value={message} rows={1}>
                            </textarea>
                            <button onClick={sendMessage}><IoMdSend /></button>
                        </div>
                    }
                </footer>
            </div>
        </div>
    )
}

export default Chat;