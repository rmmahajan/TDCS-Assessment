import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

export default function Welcome() {
  const [credentails, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{height: '50px',textAlign:"left"}}>
        {credentails && <Button onClick={logout} variant="outline-info">Logout</Button>}
      </Navbar>
      <h1 style={{marginTop: '3%'}}>Welcome {credentails && credentails.username}</h1>
      {!credentails && <button className="btn btn-primary btn-block" style={{width: '150px'}}><Link style={{color: '#ffffff', textDecoration: 'none'}} to="/register">Register</Link></button>}
      <br /><br />
      {!credentails && <button className="btn btn-primary btn-block" style={{width: '150px'}}><Link style={{color: '#ffffff', textDecoration: 'none'}} to="/login">Login</Link></button>}
      {credentails && <Todos />}
    </div>
  );
}
