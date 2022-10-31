import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fbAuth, fbStore } from "../fb";

export default function Profile({ refreshUser, userInfo }) {
  const navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState(userInfo.displayName);

  const onClickHandler = () => {
    signOut(fbAuth);
    navigate("/");
  };

  const getMyNweets = async () => {
    const q = query(collection(fbStore, "nweets"), where("creatorId", "==", userInfo.uid), orderBy("createdAt"));
    const nweets = await getDocs(q);
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onChangeHandler = (event) => {
    setNewDisplayName(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (userInfo.displayName === newDisplayName) return;

    await updateProfile(userInfo, { displayName: newDisplayName, photoURL: "" });
    refreshUser();
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" placeholder="Display Name" onChange={onChangeHandler} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
}
