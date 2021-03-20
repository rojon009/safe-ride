import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../Images/logo.png';
import './Header.css'
const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    
    const handleClick = () => {
        console.log('run');
        history.push('/login')
    }
    
    return (
        <div className="header">
            <Link to="/"><img className='logo' src={logo} alt="logo"/></Link>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/blog">Blog</Link>
                {
                    loggedInUser ?
                    <button className="user">{loggedInUser?.displayName}</button>
                    :
                    <button className='highlight' onClick={handleClick}>Login</button>
                }
            </nav>
            <button className="menu">
                <button className="user">{loggedInUser?.displayName}</button>
                <svg width='40px' height="40px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
    );
};

export default Header;