import { Link } from 'react-router-dom';
import '../App.css';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    console.log(isUserSignedIn)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setIsUserSignedIn(true);
        } else {
            setIsUserSignedIn(false);
        }
    }, []);

    return (
        <nav className="navbar">
            <section className="navbar-menu">
                <ul>
                    <li>
                        <Link to="/">Landing</Link>
                    </li>
                    {!isUserSignedIn && (
                        <li>
                            <Link to="/Register">Register</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/Home">Home</Link>
                    </li>
                    <li>
                        <Link to="/Profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/PetRegisterPage">Pet Register</Link>
                    </li>
                    <li>
                        <Link to="/LocalEvents">Local Events</Link>
                    </li>
                </ul>
            </section>
        </nav>
    );
};

export default Navbar;

