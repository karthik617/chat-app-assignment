import { Dispatch, SetStateAction } from 'react';
import '../styles/header.css'
import { userListObj } from '../typescript/users';
import backArrow from '../assets/back-arrow.png'

type Props = {
    to: userListObj | null,
    backToUserList: Dispatch<SetStateAction<string | null>> // for mobile responsive screen backarrow to set chatroom_id to null and get back to user list screen
}
function ChatHeader({to,backToUserList}:Props) {
    return <>
        <div className="header">
            <div className='profile-header'>
                {window.innerWidth <= 600 ? <img src={backArrow} alt="back-arrow" style={{width:"25px",height:"25px",marginRight:"5px",cursor:"pointer"}} onClick={() => backToUserList(null)}/> : null }
                <img src={to?.avatar} alt="user profile icon" className='profile-icons'/>
                <div className='profile-names'>{to?.fullname}</div>
            </div>
        </div>
    </>
}

export default ChatHeader;