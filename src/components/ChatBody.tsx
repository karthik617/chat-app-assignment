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
    const styleSender = {
        borderRadius: "10px 0px 10px 10px",
        backgroundColor: "#747bff",
        color: "white",
        boxShadow: "-1px 1px 1px 1px rgba(0, 0, 255, .2)",
        border:"1px solid rgba(0, 0, 255, .2)"
    }
    const styleReceiver = {
        borderRadius: "0px 10px 10px 10px",
        backgroundColor: "#eee",
        boxShadow: "1px 1px 1px 1px rgba(0, 0, 255, .2)",
        border:"1px solid rgba(0, 0, 255, .2)"
    }
    return <>
    <div className='chat-body' ref={chatBodyRef}>
        {
            messages.length > 0 && messages.map((message,index) => 
                <div className="message-container" key={message.timestamp+index} style={{justifyContent: sender && sender === message.senderId ? "flex-end": "flex-start"}}>
                    {sender && sender === message.senderId ? <MessageContent text={message.content} userName={senderName} time={message.timestamp} style={styleSender}/>:<MessageContent text={message.content} userName={receiverName} time={message.timestamp} style={styleReceiver}/>}
                </div>
            )
        }
    </div>
    </>
}
export default ChatBody;