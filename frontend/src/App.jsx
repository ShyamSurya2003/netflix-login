import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

function App() {
  const [page, setPage] = useState("login"); // login / signup
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if logged in → show dashboard
  if (isLoggedIn) {
    return <Dashboard setIsLoggedIn={setIsLoggedIn} />;
  }

  // switch pages
  if (page === "signup") {
    return (
      <Signup
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
      />
    );
  }

  return (
    <Login
      setIsLoggedIn={setIsLoggedIn}
      setPage={setPage}
    />
  );
}

export default App;