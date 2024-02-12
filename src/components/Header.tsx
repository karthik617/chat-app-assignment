import '../styles/header.css'
import Logo from '../assets/logo.png'

function Header() {
    return <>
        <div className="header">
            <img src={Logo} alt="app-logo" className='logo'/>
            <div className='title'>
                Chat.
            </div>
        </div>
    </>
}

export default Header;