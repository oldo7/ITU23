//Autor: Martin Packa

import AuthDetails from "./components/auth/AuthDetails";
import SignIn from "./components/auth/SignIn";
import { Link } from "react-router-dom";

const Login = ({ AuthUser }) => {
  const loginStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    background: 'transparent',
  };

  const loginCardStyle = {
    padding: '2rem',
    backgroundColor: 'pink',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    margin: '0 20px',
    boxSizing: 'border-box',
  };

  const linkStyle = {
    marginTop: '20px',
    color: '#ff7e5f',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  return (
    <div style={loginStyle}>
      <div style={loginCardStyle}>
        {/* Assuming SignIn contains the form and AuthDetails the information of the user */}
        <SignIn />
        <AuthDetails AuthUser={AuthUser} />
        <div style={linkStyle}>
          Nemate ucet? Vytvorte si ho <Link to='/register' style={{ color: '#ff7e5f' }}>Tu</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;