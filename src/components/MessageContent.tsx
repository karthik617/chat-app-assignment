import { useRef } from "react";
import "../styles/layout.css"
type Props ={
    text:string,
    userName: string | undefined,
    time: string | undefined
}
function MessageContent({text,userName,time}:Props) {
    const date = new Date(time?time:"");
    const textMessagae = useRef<HTMLDivElement>(null)

    // if the text.length is large split the text and display on the next line
    const splitText = (text:string, maxLength:number) => {
        let splitTextArray = [];
        for (var i = 0; i < text.length; i += maxLength) {
            splitTextArray.push(text.substring(i, i + maxLength));
        }
        return splitTextArray.join('\n');
    }
    return <>
     <div className="message-content">
        <div className="user-name">{userName}</div>
        <div className="message" ref={textMessagae}>{text.length > 50 ? splitText(text,49): text}</div>
        <div className="time">{date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}).toLowerCase()}</div>
     </div>
    </>
}

export default MessageContent;