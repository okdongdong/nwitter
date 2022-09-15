import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { fbStore } from "../fb";

export default function Home({ userInfo }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(fbStore, "nweets"), (querySnapshot) => getNweets(querySnapshot));
  }, []);

  const getNweets = (querySnapshot) => {
    try {
      const tempNweets = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(tempNweets);

      setNweets([...tempNweets]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const nweetData = {
        nweet,
        createdAt: new Date(),
        creatorId: userInfo.uid,
      };

      const res = await addDoc(collection(fbStore, "nweets"), nweetData);
      console.log(res);

      setNweet("");
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    setNweet(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" value={nweet} onChange={onChangeHandler} placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((item, idx) => (
          <Nweet key={`nweet-${idx}`} nweet={item} isOwner={item.creatorId === userInfo.uid} />
        ))}
      </div>
    </div>
  );
}
