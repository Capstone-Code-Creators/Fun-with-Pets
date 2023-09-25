import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';

const Navbar = ({ userSignedIn, setUserSignedIn }) => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('id');
        const isUserSignedIn = userId ? true : false;

        setUserSignedIn(isUserSignedIn);
    }, [setUserSignedIn]);

    const handleSignOut = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('id', null);

        setUserSignedIn(false);
        
        navigate('/');
    };

    return (
        <nav className="navbar">
            <section className="navbar-menu">
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Menu
                </button>
                {dropdownOpen && (
                    <ul>
                        {!userSignedIn ? (
                            <>
                                <li>
                                    <Link to="/">Landing</Link>
                                </li>
                                <li>
                                    <Link to="/Register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/Home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/Feed">Feed</Link>
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
                                <li>
                                    <Link 
                                        to="/" 
                                        className="sign-out-button" 
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                )}
            </section>
        </nav>
    );
};

export default Navbar;
