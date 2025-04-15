import { useState } from "react";
import { Link } from "react-router-dom";

const Welcome = ({ onStart }) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-800 text-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome...😊</h2>
      <p className="mb-4">Please enter your name to begin:</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full px-4 py-2 rounded text-black mb-4"
      />
<Link to={`/quiz?name=${name}`}>
     <button
        onClick={handleStart}
        disabled={!name.trim()}
        className={`px-6 py-2 rounded font-semibold ${
          name.trim()
            ? "bg-green-500 hover:bg-green-600"
            : "bg-green-200 cursor-not-allowed"
        }`}
      >
        Start Quiz
      </button></Link>
    </div>
  );
};

export default Welcome;
