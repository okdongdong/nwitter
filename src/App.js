import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { fbAuth } from "./fb";
import Router from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);

      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? `loading...` : <Router isLoggedIn={isLoggedIn} />}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
