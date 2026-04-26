import { useState } from "react";

function Signup({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://netflix-login-gmfg.onrender.com/signup",
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
        setSuccess("Signup successful! Redirecting...");

        setTimeout(() => {
          setPage("login");
        }, 1500);
      } else {
        setSuccess("");
        setError(data.message || "Signup failed");
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
      <div className="flex items-center justify-center h-full bg-black/70">
        <div className="bg-black/80 p-10 rounded w-[350px] text-white shadow-2xl">
          <h1 className="text-3xl mb-6">Sign Up</h1>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
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
              Sign Up
            </button>
          </form>

          <p className="text-gray-400 mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setPage("login")}
              className="text-white cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;