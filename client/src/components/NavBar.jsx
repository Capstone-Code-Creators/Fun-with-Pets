import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = ({ userSignedIn, setUserSignedIn }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        setUserSignedIn(false);
        navigate('/Login');
    };

    return (
        <nav className="navbar">
            <section className="navbar-menu">
                <ul>
                    <li>
                        <Link to="/">Landing</Link>
                    </li>
                    {!userSignedIn && (
                        <li>
                            <Link to="/Register">Register</Link>
                        </li>
                    )}
                    {userSignedIn && (
                        <>
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
                        </>
                    )}
                    
                </ul>
            </section>
            <section className="navbar-right">
                {userSignedIn && (
                    <button onClick={handleSignOut} className="sign-out-button">
                        Sign Out
                    </button>
                )}
            </section>
        </nav>
    );
};

export default Navbar;

