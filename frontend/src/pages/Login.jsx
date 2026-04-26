import { useState } from "react";

function Login({ setIsLoggedIn, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(
        "https://netflix-login-gmfg.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setError("");
        setIsLoggedIn(true);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="h-screen relative">
      {/* Logo */}
      <h1
        className="absolute top-6 left-10 text-red-600 text-5xl tracking-widest drop-shadow-lg"
        style={{ fontFamily: "Bebas Neue" }}
      >
        NETFLIX
      </h1>

      {/* Overlay */}
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-black/70 via-black/60 to-black/80">
        <div className="bg-black/75 p-10 rounded w-[350px] text-white shadow-2xl">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email or phone number"
              className="p-3 bg-gray-700 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="p-3 bg-gray-700 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-red-600 py-3 rounded font-semibold">
              Sign In
            </button>
          </form>

          <p className="text-gray-400 mt-6 text-sm">
            New to Netflix?{" "}
            <span
              onClick={() => setPage("signup")}
              className="text-white cursor-pointer hover:underline"
            >
              Sign up now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;