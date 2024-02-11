import '../styles/layout.css'
import { userListObj } from '../typescript/users';
import NoChatScreen from './NoChatScreen'
import ChatHeader from './ChatHeder'
import MessageInput from './MessageInput';
import ChatBody from './ChatBody';
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import { conversationArray } from '../typescript/chats';

type Props = {
    chatRoom: string | null,
    user1: Partial<userListObj>
    user2: userListObj | null,
    reference: RefObject<HTMLDivElement>
    chatActive: Dispatch<SetStateAction<string | null>>
}
function ChatScreen({chatRoom, user1, user2, reference,chatActive}:Props){
    const [conversation, setConversation] = useState< conversationArray>([])
    const [text, setText] = useState<string| undefined>()
    let sentence = ['Hi, nice to meet you', 'Hello! how are you', "It's great meeting you", "I was trying to reach you since morning", "Greetings", "Have a nice day", "Great job", "Are you busy", "Fine", "How can i reach you", "My name is karthik"]

    
    let messages = localStorage.getItem('messages') || null;

    // get the conversation for the user from localstorage if present
    useEffect(() => {
        if (!chatRoom) return;
        setConversation([])
        if (messages) {
          let parsedMessages: { [key: string]: conversationArray } = JSON.parse(messages);
          if (parsedMessages.hasOwnProperty(chatRoom)) {
            let sortedMessages = parsedMessages[chatRoom].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            setConversation(sortedMessages);
          }
        }
      }, [chatRoom])
    
    // adds random message to the conversion from receiver end
    // with the probability of 0.5 (Math.floor(Math.random() * (sentence.length - 1)) > 5)
    const getRandomText = () => {
        let index= Math.floor(Math.random() * (sentence.length - 1))
        const text = sentence[index]
        if (user1 && user2 && user2.id !== undefined && user1.id !== undefined && Math.floor(Math.random() * (sentence.length - 1)) > 5) {
            setConversation(prev => [
                ...prev,
                { senderId: user2.id, receiverId:user1.id ? user1.id :1, content: text, timestamp: new Date().toISOString() }
              ]);
        }
     }

    // conservation with latest message 
    const updateConversation = (sender:number| undefined, receiver:number| undefined, text:string |undefined) => {
        if (text === undefined || sender === undefined || receiver === undefined) return
        setConversation(prev => [
            ...prev,
            { senderId: sender, receiverId: receiver, content: text, timestamp: new Date().toISOString() }
          ]);
          
          // to get random Text from other user
          getRandomText()
    }

    // to save message to the localstorage
    const saveMessages = () => {
        if(chatRoom) {
            let parasedMessages = messages ? JSON.parse(messages) : {} 
            parasedMessages[chatRoom] = conversation;
            localStorage.setItem('messages', JSON.stringify(parasedMessages))
        }
    }

    useEffect(() => {
        saveMessages()
    }, [conversation])
    
    return<>
    <div className="chat-screen" ref={reference}>
        {chatRoom == null? <NoChatScreen />: 
        <>
            <div className='chat-container'>
                <ChatHeader to={user2} backToUserList={chatActive}/>
                <ChatBody messages={conversation} sender={user1.id} senderName={user1.fullname} receiverName={user2?.fullname}/>
                <MessageInput setTextMessage={setText} textMessage={text} handleSend={updateConversation} sender={user1.id} receiver={user2?.id}/>
            </div>
        </>}
    </div>
    </>
}
export default ChatScreen