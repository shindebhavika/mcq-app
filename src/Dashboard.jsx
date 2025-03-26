import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch data function
  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get("https://car-survey-backend.vercel.app/getInfo");
  //     setData(response.data.data);
  //     sessionStorage.setItem("surveyData", JSON.stringify(response.data.data)); // Store data
  //   } catch (error) {
  //     toast.error("Failed to fetch data ❌");
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Initial fetch and check sessionStorage
  // useEffect(() => {
  //   const cachedData = sessionStorage.getItem("surveyData");
  //   if (cachedData) {
  //     setData(JSON.parse(cachedData));
  //   } else {
  //     fetchData();
  //   }

  //   // Refetch when page is focused (user revisits)
  //   const handleFocus = () => fetchData();
  //   window.addEventListener("focus", handleFocus);

  //   return () => {
  //     window.removeEventListener("focus", handleFocus);
  //   };
  // }, []);

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
    <div className="min-h-screen w-full flex flex-col items-center pt-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2c7e87] to-[#2d0c2b] text-white">
  <div className="w-full max-w-3xl p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
    {/* Header Section */}
    <div className="flex flex-col  justify-between items-center mb-6 gap-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#7ae9f5] text-center sm:text-left">
        Admin Dashboard 📊
      </h2>
  {/* <h2 className="text-2xl sm:text-3xl font-extrabold text-center sm:text-left bg-clip-text text-transparent bg-cover bg-center" style={{ backgroundImage: "url('data:image/jpeg;base64,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')" }}>
  Admin Dashboard
</h2> */}




      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`relative flex items-center gap-3 px-5 py-2 md:px-6 md:py-3 font-bold border border-transparent rounded-full shadow-lg transition-transform duration-300 text-white
          ${isDownloading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 active:scale-95"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${isDownloading ? "animate-bounce" : ""}`}
        >
          <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-7 2h14v2H5v-2z" />
        </svg>
        {isDownloading ? "Downloading..." : "Download Data"}
      </button>
    </div>

    {/* Shop Survey Card */}
    <div className="p-6 bg-blue/10 backdrop-blur-md rounded-xl text-center shadow-lg border border-white/20">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
        Shop Survey 
      
    
    
      </h3>
      {isLoading ? (
        <p className="text-gray-300">Loading...</p>
      ) : data ? (
        <>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-300">
            Total Surveys Submitted ✅
          </h3>
          <p className="text-4xl sm:text-5xl font-bold text-[#6bfbb3] animate-pulse">
            {data.totalEntry}
          </p>
        </>
      ) : (
        <p className="text-gray-300">No data available</p>
      )}
    </div>
  </div>
</div>

  );
}
