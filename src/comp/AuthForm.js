import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pw") {
      setPw(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // create Accuont
        await createUserWithEmailAndPassword(authService, email, pw);
      } else {
        // Sign in
        await signInWithEmailAndPassword(authService, email, pw);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="pw"
          type="password"
          placeholder="Password"
          required
          value={pw}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign in"}
          required
        />
        <div>{error && <span className="authError">{error}</span>}</div>
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
