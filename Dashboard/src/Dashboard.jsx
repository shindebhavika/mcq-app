import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s2Image from "./s2.png";

export function Dashboard() {
  const [isDownloading, setIsDownloading] = useState(false);

  const dummyData = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Alice Smith", age: 34 },
    { id: 3, name: "Bob Johnson", age: 42 },
    { id: 4, name: "Emma Brown", age: 25 },
  ];

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await axios.get("https://car-survey-backend.vercel.app/download-xlsx");

      if (response.data.downloadUrl) {
        window.location.href = response.data.downloadUrl;
        
        alert("File downloaded successfully ✅")
       
      } else {
        toast.error("Download URL not found ❌");
      }
    } catch (error) {

      toast.error("Error fetching the download URL", error?.response || error);
      console.error("Error fetching the download URL", error?.response || error);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-16 bg-gradient-to-br from-[#50a997] to-[#171721] text-white">
      <div className="w-full max-w-3xl p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-[#7ae9f5]">Admin Dashboard 📊</h2>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`relative flex items-center gap-3 px-6 py-3 font-bold border border-transparent rounded-full shadow-lg transition-transform duration-300
            ${isDownloading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 active:scale-95"}
            text-white`}
          >
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z"></path>
                </svg>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 11l5 5l5 -5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
                <span>Download Data</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 bg-blue/10 backdrop-blur-md rounded-xl text-center shadow-lg border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Survey Title <img src={s2Image} alt="Survey Image" className="w-6 h-6 inline-block" />
          </h3>
          <h3 className="text-xl font-semibold text-gray-300">
            Total Surveys Submitted <img src={s2Image} alt="Survey Image" className="w-6 h-6 inline-block" />
          </h3>
          <p className="text-5xl font-bold text-[#6bfbb3] animate-pulse">{dummyData.length}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-3">Survey Participants</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#218e8c] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((person) => (
                <tr key={person.id} className="bg-white/10 border-b border-gray-600">
                  <td className="px-4 py-2">{person.id}</td>
                  <td className="px-4 py-2">{person.name}</td>
                  <td className="px-4 py-2">{person.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
