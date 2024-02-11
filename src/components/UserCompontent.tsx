import { userListObj } from "../typescript/users";
type Props = {
    user: userListObj
}
function userCompontent({user}:Props) {
    return<>
    <div className="user">
        <img src={user.avatar} alt="user profile icon" className="profile-icon"/>
        <div className="profile-desc">
            <div className="profile-name">{user.fullname}</div>
        </div>
    </div>
    </>
}

export default userCompontent;