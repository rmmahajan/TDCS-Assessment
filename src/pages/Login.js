import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div>
      <h1>Login</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
      <div className="form-group">
        <input
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        </div>
        <br />
        <div className="form-group">
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        </div>
        <br />
        <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
        </div>
      </form>
    </div>
  );
}
