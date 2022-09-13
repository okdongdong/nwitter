import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { fbAuth } from "../fb";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSumitHandler = (event) => {
    event.preventDefault();
    if (newAccount) createAccount();
    else login();
  };

  const login = async () => {
    console.log(`login`);
    try {
      const res = await signInWithEmailAndPassword(fbAuth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const createAccount = async () => {
    console.log(`create account`);
    try {
      const res = await createUserWithEmailAndPassword(fbAuth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onSocialLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(fbAuth, provider);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSumitHandler}>
        <input name="email" type="email" placeholder="Email" value={email} required autoComplete="true" onChange={onChangeHandler} />
        <input name="password" type="password" placeholder="Password" value={password} required autoComplete="true" onChange={onChangeHandler} />
        <input type="submit" value={!newAccount ? `Login` : `Create New Account`} />
      </form>
      <div>
        <button onClick={() => setNewAccount((prev) => !prev)}> {newAccount ? `Login` : `Create New Account`}</button>
        <button name="google" onClick={onSocialLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
