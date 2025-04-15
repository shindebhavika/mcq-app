

function Submit({ score, total, onRetry }) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6">
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-2 text-center">✅ Quiz Completed!</h2>
        <p className="mb-2 text-center">Your Score: {score} / {total}</p>
        <p className="mb-4 text-center">Thank you for your participation.</p>

        <button
          onClick={onRetry}
          className="bg-gradient-to-r mt-4 from-blue-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Submit;
