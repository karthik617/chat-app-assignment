import { useEffect, useRef } from "react";
import { conversationArray } from "../typescript/chats";
import MessageContent from "./MessageContent";

type Props = {
    messages: conversationArray | []
    sender: number | undefined,
    receiverName: string | undefined
    senderName: string | undefined,
}
function ChatBody({messages, sender,senderName,receiverName}:Props) {
    const chatBodyRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Scroll to the bottom when messages change
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);
    return <>
    <div className='chat-body' ref={chatBodyRef}>
        {
            messages.length > 0 && messages.map((message,index) => 
                <div className="message-container" key={message.timestamp+index} style={{justifyContent: sender && sender === message.senderId ? "flex-end": "flex-start"}}>
                    {sender && sender === message.senderId ? <MessageContent text={message.content} userName={senderName} time={message.timestamp}/>:<MessageContent text={message.content} userName={receiverName} time={message.timestamp}/>}
                </div>
            )
        }
    </div>
    </>
}
export default ChatBody;