import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { fbStorage, fbStore } from "../fb";

export default function Home({ userInfo }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

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
      let attachmentUrl = null;
      if (fileUrl) {
        const storageRef = ref(fbStorage, `${userInfo.uid}/${new Date().getTime()}`);

        // 파일 업로드
        await uploadString(storageRef, fileUrl, "data_url");
        attachmentUrl = await getDownloadURL(storageRef);
      }

      const nweetData = {
        nweet,
        createdAt: new Date(),
        creatorId: userInfo.uid,
        attachmentUrl,
      };

      // 파일이 저장된 url과 함께 nweet생성
      const res = await addDoc(collection(fbStore, "nweets"), nweetData);
      console.log(`res`, res);

      setNweet("");
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    setNweet(event.target.value);
  };

  const onFileChange = (event) => {
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setFileUrl(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" value={nweet} onChange={onChangeHandler} placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {fileUrl && (
          <div>
            <img src={fileUrl} alt="choosed file" height="100px" />
            <button onClick={() => setFileUrl(null)}>clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((item, idx) => (
          <Nweet key={`nweet-${idx}`} nweet={item} isOwner={item.creatorId === userInfo.uid} />
        ))}
      </div>
    </div>
  );
}
