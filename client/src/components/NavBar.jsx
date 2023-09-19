import { Link, useNavigate } from 'react-router-dom';
import '../App.css';


const Navbar = ({ userSignedIn, setUserSignedIn }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('id', null);
        setUserSignedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <section className="navbar-menu">
                <ul>
                    <li><Link to="/">Landing</Link></li>
                    {!userSignedIn && <li><Link to="/Register">Register</Link></li>}
                    {userSignedIn && (
                        <>
                            <li><Link to="/Home"><img src='../photos/house-solid.png' />Home</Link></li>
                            <li><Link to="/Profile">Profile</Link></li>
                            <li><Link to="/PetRegisterPage">Pet Register</Link></li>
                            <li><Link to="/LocalEvents">Local Events</Link></li>
                        </>
                    )}
                </ul>
            </section>
            <section className="navbar-right">
                {userSignedIn && (
                    <Link 
                        to="/" 
                        className="sign-out-button" 
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Link>
                )}
            </section>
        </nav>
    );
};

export default Navbar;
