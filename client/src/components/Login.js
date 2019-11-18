import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      });
  };
  return (
    <>
      <main className="login-container">
        <h1>Welcome to the Bubble App!</h1>
        <section className="login-form">
          <form onSubmit={login}>
            <div className="login-form-content">
              <h3>Login</h3>
              <div className="login-form-inputs">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <button>Login</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
