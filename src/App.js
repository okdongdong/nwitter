import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { fbAuth } from "./fb";
import Router from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserInfo(user);
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }

      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? `loading...` : <Router isLoggedIn={isLoggedIn} userInfo={userInfo} />}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
