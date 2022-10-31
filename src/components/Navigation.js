import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ userInfo }) {
  console.log(userInfo);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/profile">{userInfo.displayName}'s Profile</Link>{" "}
        </li>
      </ul>
    </div>
  );
}
