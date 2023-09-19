import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useEffect } from 'react';

const Navbar = ({ userSignedIn, setUserSignedIn }) => {
    const navigate = useNavigate();
    console.log(userSignedIn)

    useEffect(() => {
        const userId = localStorage.getItem('id');
        const isUserSignedIn = userId ? true : false;

        setUserSignedIn(isUserSignedIn);
    }, [setUserSignedIn]);


    const handleSignOut = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('id', null)
        

        setUserSignedIn(false);
        
        navigate('/');
    };

    return (
        <nav className="navbar">
            <section className="navbar-menu">
                <ul>

                    {!userSignedIn && (
                        <>
                            <li>
                                <Link to="/">Landing</Link>
                            </li>
                            <li>
                                <Link to="/Register">Register</Link>
                            </li>
                        </>
                    )}
                    {userSignedIn && (
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

