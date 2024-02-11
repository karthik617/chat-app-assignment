import '../styles/layout.css'
import Header from './Header'
import {userList} from "../typescript/users"
import Users from './UserCompontent'
import { Dispatch, RefObject, SetStateAction } from 'react'

type Props = {
    list:userList,
    chatActive: Dispatch<SetStateAction<string | null>>
    reference: RefObject<HTMLDivElement>
}

function ChatList({list,chatActive,reference}: Props){
    const handleKeyEvent = (e:string, chatId: string) => {
        if(e === 'Enter') {
            chatActive(chatId)
        }
    }
    return<>
    <div className="chat-user-list" ref={reference}>
        <Header />
        <div className='users-container'>
            {list && list.map((user) => 
            <div onClick={() => chatActive(user.chatroom_id)} style={{cursor:'pointer'}} key={user.id} tabIndex={0} onKeyDown={(e) => handleKeyEvent(e.key,user.chatroom_id)}>
                <Users user={user}/>
            </div>)}
        </div>
    </div>
    </>
}
export default ChatList