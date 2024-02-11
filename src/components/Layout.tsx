import { useLayoutEffect, useRef, useState } from 'react'
import ChatList from './UserChatList'
import ChatScreen from './ChatScreen'
import '../styles/layout.css'
import { userList, userListObj } from '../typescript/users'

function Layout() {
    const mainLayout = useRef<HTMLDivElement>(null)
    const usersChatListRef = useRef<HTMLDivElement>(null)
    const userChatScreenRef = useRef<HTMLDivElement>(null)
    
    // to adjust the layout height as per the window height
    useLayoutEffect(() => {
        const windowHeight = () => {
            if(mainLayout.current) {
                const ele = mainLayout.current
                ele.style.height = `${window.innerHeight}px`;
            }
        }
        window.addEventListener('resize', windowHeight)
        windowHeight();
        return () => window.removeEventListener('resize', windowHeight)
    })

    // first user detail 
    const firstUser:Partial<userListObj> = {
        "id": 1,
        "fullname": "Karthik",
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
      }
    
    /* users list
    with this user first user will be having conversation 
    */
    const userList:userList = [
        {
          "id": 2,
          "fullname": "Jaya",
          "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
          "chatroom_id": "chatroom_12"
        },
        {
          "id": 3,
          "fullname": "Utaya",
          "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
          "chatroom_id": "chatroom_13"
        },
        {
          "id": 4,
          "fullname": "Janie",
          "avatar": "https://randomuser.me/api/portraits/women/4.jpg",
          "chatroom_id": "chatroom_14"
        },
        {
          "id": 5,
          "fullname": "Raj",
          "avatar": "https://randomuser.me/api/portraits/men/5.jpg",
          "chatroom_id": "chatroom_15"
        },
        {
          "id": 6,
          "fullname": "Kumar",
          "avatar": "https://randomuser.me/api/portraits/women/6.jpg",
          "chatroom_id": "chatroom_16"
        }
    ]
    // chatroom_id 
    const [chatRoom, setChatRoom] = useState<string | null>(null)

    // to return the user which is been selected for converation
    const getUser2 = () => {
        let user2 = userList.filter((i) => i.chatroom_id === chatRoom)[0] || null
        return user2
    }
    
    // for mobile view
    useLayoutEffect(() => {
      // console.log(window.innerWidth, chatRoom, userChatScreenRef.current, usersChatListRef.current)
      if(window.innerWidth <= 600) {
        if(chatRoom === null && userChatScreenRef.current && usersChatListRef.current) {
          userChatScreenRef.current.style.display = "none";
          usersChatListRef.current.style.display = "flex";
        }
        if (chatRoom !== null && usersChatListRef.current && userChatScreenRef.current ) {
          usersChatListRef.current.style.display = "none";
          userChatScreenRef.current.style.display = "flex";
        }
      }
    },[chatRoom,window.innerWidth])
    return (
      <>
        <div className="main-layout" ref={mainLayout}>
            <ChatList list={userList} chatRoom={chatRoom ? chatRoom : ''} chatActive={setChatRoom} reference={usersChatListRef}/>
            <ChatScreen chatRoom={chatRoom} user1={firstUser} user2={getUser2()} reference={userChatScreenRef} chatActive={setChatRoom}/>
        </div>
      </>
    )
  }
  
  export default Layout