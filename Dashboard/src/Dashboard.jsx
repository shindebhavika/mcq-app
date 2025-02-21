import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://car-survey-backend.vercel.app/getInfo");
      setData(response.data.data);
      sessionStorage.setItem("surveyData", JSON.stringify(response.data.data)); // Store data
    } catch (error) {
      toast.error("Failed to fetch data ❌");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and check sessionStorage
  useEffect(() => {
    const cachedData = sessionStorage.getItem("surveyData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    } else {
      fetchData();
    }

    // Refetch when page is focused (user revisits)
    const handleFocus = () => fetchData();
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Optional: Auto-refresh every 30 seconds
  // useEffect(() => {
  //   const interval = setInterval(fetchData, 30000);
  //   return () => clearInterval(interval);
  // }, []);

  // Handle download
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get("https://car-survey-backend.vercel.app/download-xlsx");
      if (response.data.downloadUrl) {
        window.location.href = response.data.downloadUrl;
        alert("File downloaded successfully ✅");
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
    <div className="min-h-screen w-full flex flex-col items-center pt-16 bg-gradient-to-br from-[#357c94] to-[#2d0c2b] text-white">
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
             <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`${isDownloading ? "animate-bounce" : ""}`}
  >
    <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-7 2h14v2H5v-2z" />
  </svg>
            {isDownloading ? "Downloading..." : "Download Data"}
          </button>
        </div>

        <div className="p-6 bg-blue/10 backdrop-blur-md rounded-xl text-center shadow-lg border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-2">USED CAR MARKET STUDY</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : data ? (
            <>
              <h3 className="text-xl font-semibold text-gray-300">Total Surveys Submitted ✅</h3>
              <p className="text-5xl font-bold text-[#6bfbb3] animate-pulse">{data.totalEntry}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-3">Survey Data</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#218e8c] text-white">
                <th className="px-4 py-2">City</th>
                
                <th className="px-4 py-2">Total Entries</th>
              </tr>
            </thead>
            <tbody>
              {data?.city &&
                Object.entries(data.city)
                  .filter(([city]) => city && city !== "undefined") // Ensure city is valid
                  .map(([city, count]) => (
                    <tr key={city} className="bg-white/10 border-b border-gray-600">
                      <td className="px-4 py-2">{city}</td>
                      <td className="px-4 py-2">{count}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-3">Type of Respondent</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#218e8c] text-white">
                <th className="px-4 py-2">Segment</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data && (
                <>
                  <tr className="bg-white/10 border-b border-gray-600">
                    <td className="px-4 py-2">Segment 1 Mass Market vehicle buyer</td>
                    <td className="px-4 py-2">{data.typeOfRespondent["1"] || 0}</td>
                  </tr>
                  <tr className="bg-white/10 border-b border-gray-600">
                    <td className="px-4 py-2">Segment 2 Premium vehicle buyer</td>
                    <td className="px-4 py-2">{data.typeOfRespondent["2"] || 0}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
