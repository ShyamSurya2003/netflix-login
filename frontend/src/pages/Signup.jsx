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
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setError("");
        setSuccess("Signup successful! Redirecting...");

        setTimeout(() => {
          setPage("login");
        }, 1500);
      } else {
        setSuccess("");
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="h-screen relative">

      <h1
        className="absolute top-6 left-10 text-red-600 text-5xl tracking-widest drop-shadow-lg"
        style={{ fontFamily: "Bebas Neue" }}
      >
        NETFLIX
      </h1>

      <div className="flex items-center justify-center h-full bg-black/70">
        <div className="bg-black/80 p-10 rounded w-[350px] text-white">

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

            <button className="bg-red-600 py-3 rounded">
              Sign Up
            </button>
          </form>

          <p className="text-gray-400 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setPage("login")}
              className="text-white cursor-pointer"
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