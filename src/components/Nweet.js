import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { fbStorage, fbStore } from "../fb";

export default function Nweet({ nweet, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweet.nweet);

  const deleteNweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this Nweet?");

    if (ok) {
      await deleteDoc(doc(fbStore, "nweets", nweet.id));
      if (nweet.attachmentUrl) {
        const deleteRef = ref(fbStorage, nweet.attachmentUrl);
        await deleteObject(deleteRef);
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const updateNweet = async (event) => {
    event.preventDefault();
    updateDoc(doc(fbStore, "nweets", nweet.id), { nweet: newNweet });
    toggleEditing();
  };

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form>
            <input type="text" value={newNweet} required onChange={onChangeHandler} />
            <input type="submit" value="update" onClick={updateNweet} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweet.nweet}</h4>
          {nweet.attachmentUrl && <img src={nweet.attachmentUrl} alt="nweetImage" />}
          <span>{nweet.createdAt.toDate().toLocaleString()}</span>
          {isOwner && (
            <>
              <button onClick={deleteNweet} name="delete">
                Delete Nweet
              </button>
              <button onClick={toggleEditing} name="edit">
                Edit Nweet
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
