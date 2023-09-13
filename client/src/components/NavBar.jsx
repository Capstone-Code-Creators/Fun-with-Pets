import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <section className="navbar-menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
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
