import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fbAuth } from "../fb";

export default function Profile() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    signOut(fbAuth);
    navigate("/");
  };
  return (
    <div>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
}
