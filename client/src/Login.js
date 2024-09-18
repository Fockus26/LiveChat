import { useState } from 'react';
import logo from './assets/chatIcon.png'
import './styles/Login.css'

function Login(props) {
    const [isChooseRoom, setIsChooseRoom] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);


    return (
        <div className='container-login'>
            <div className='login-header'>
                <img src={logo} alt="Live Chat Logo" />
                <h1>LiveChat</h1>
            </div>
            <form>
                <input onChange={(e) => props.setUsername(e.target.value)} value={props.username} type="text" placeholder='Usuario' />
                {/* <input onChange={(e) => props.setRoom(e.target.value)} value={props.room} type="text"placeholder='Room' /> */}

                {!isChooseRoom && 
                    <button onClick={(e) => {e.preventDefault(); setJoinRoom(true); setIsChooseRoom(true)}} className='joinRoom'>Unirse a sala</button>
                }

                {joinRoom &&
                    <div>
                        <input onChange={(e) => props.setRoom(e.target.value)} value={props.room} type="text" placeholder='Sala' />
                        <button onClick={props.joinRoom} className='joinRoom'>Unirse</button>
                    </div>
                }

            </form>
        </div>
    )
}

export default Login