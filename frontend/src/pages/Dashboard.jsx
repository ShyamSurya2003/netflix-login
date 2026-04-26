function Dashboard({ setIsLoggedIn }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl mb-6">Welcome to Netflix 🎬</h1>

      <button
        onClick={() => setIsLoggedIn(false)}
        className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;