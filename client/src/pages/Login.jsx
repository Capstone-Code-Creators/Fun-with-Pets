import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import "../App.css";

const Login = ({setUserSignedIn}) => {
  return (
    <section>
        <section className='login-page'>
            <section>
              <h2>Login</h2>
              <LoginForm setUserSignedIn={setUserSignedIn}/>
            </section>
            <section id='needRegister'>
              <h3>Need to Register?</h3>
              <section id='registerText'>
                <Link to="/register">Register</Link>
                <Link to="/Profile">Profile</Link>
              </section>
            </section>
        </section>
    </section>
  );
};

export default Login;
