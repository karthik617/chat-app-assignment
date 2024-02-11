import { Dispatch, SetStateAction } from 'react';
import '../styles/layout.css'
type Props = {
 setTextMessage: Dispatch<SetStateAction<string | undefined>>
 textMessage:string | undefined
 sender: number | undefined
 receiver: number | undefined
 handleSend: (sender: number | undefined, receiver: number | undefined , text: string | undefined) => void
}
function MessageInput({setTextMessage,textMessage, handleSend, sender, receiver}:Props) {
    const handleInput = (text: string) => {
        setTextMessage(text)
    }
    const handleKeyEvent = (e:string) => {
        if (e === 'Enter') {
            handleSend(sender,receiver,textMessage)
            setTextMessage(undefined)
        }
    }
    return <>
    <div className='message-input'>
        <div className='input-box'>
            <input type="text" placeholder='Enter Message' className='input-field' onChange={(e) => handleInput(e.target.value)} value={textMessage? textMessage : ''} onKeyDown={(e) => handleKeyEvent(e.key)}/>
        </div>
        <div className='message-send-btn'>
            <button className='send-btn' onClick={() => {handleSend(sender,receiver,textMessage), setTextMessage(undefined)}} onKeyDown={(e) => handleKeyEvent(e.key)}>Send</button>
        </div>
    </div>
    </>
}

export default MessageInput;