import { FiEdit2 } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";

function Message(props) {
    function handleEditMessage() {
        props.handleEditMessage(props.dataMessage.message, props.id)
    }

    function deleteMesage() {
        props.deleteMessage(props.id)
    }

    return (
        <li style={props.messageStyle}>
            <div className='top'>
                <span className='username'>{props.dataMessage.username}</span>
                {props.isUser &&
                    <div>
                        <button onClick={handleEditMessage}><FiEdit2 size={'12px'} /></button>
                        <button onClick={deleteMesage}><RiCloseLargeFill size={'12px'} /></button>
                    </div>
                }
            </div>
            <div>
                <span>{props.dataMessage.message}</span>
                {props.dataMessage.isEdited &&
                    <span className='isEdited'>Edited</span>
                }
                <span className='time'>{props.dataMessage.time}</span>
            </div>
        </li>
    )
}

export default Message