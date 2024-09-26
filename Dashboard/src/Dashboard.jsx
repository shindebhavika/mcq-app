import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [ageCount, setAgeCount] = useState({
    "GenZ": 0,
    "Millennials": 0,
    "GenX": 0,
    "Baby Boomers": 0,
    "Silent Generation": 0,
  });
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [regionCount, setRegionCount] = useState({
    "Mumbai": 0,
    "Konkan Division": 0,
    "Nashik Division": 0,
    "Pune Division": 0,
    "Aurangabad Division": 0,
    "Nagpur": 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://maharastra-backend.vercel.app/get-data"
        );
        const data = response.data;
        setTotalSurveys(data.totalNoOfEntries); // Set total survey count
        setRegionCount(data.districtCount); // Set region count
        setAgeCount(data.ageCount); // Set the data in the state
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  const handleDownload=async ()=>{
  try {
    const response = await axios.get('https://maharastra-backend.vercel.app/download-csv');
    const downloadLink = response.data.downloadUrl;
    window.location.href = downloadLink;
  } catch (error) {
    console.error("Error fetching the download URL", error);
  }
  }
  return (
    <>
      <div className="flex justify-between items-center drop-shadow-xl border-y-2 w-screen bg-blue-50 sticky top-0 z-50 ">
        <h2 className="text-indigo-800 text-3xl p-2">ADMIN DASHBOARD 📊</h2>
        <button className="h-fit w-fit bg-green-400 p-2 mr-6 drop-shadow-lg text-white hover:bg-green-500
        " onClick={handleDownload}>
          DOWNLOAD CSV 📩
        </button>
      </div>
      <div className="w-60 h-40 bg-gray-100 p-4 m-4 rounded-lg shadow-lg flex flex-col justify-between text-center text-gray-800 font-medium text-lg ">
        <div>
          <span className="inline-block font-semibold text-gray-600">
            Surveys submitted:📑
          </span>
        </div>
        <div className="bg-teal-600 py-3 text-white rounded-md flex items-center justify-center text-3xl font-bold shadow-md">
        {totalSurveys}
        </div>
      </div>

      {/* //! REGION */}
      <div className="flex justify-center">
        <div className="w-5/6 bg-gray-50 p-4 m-4 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-xl">
          <h1 className="text-3xl text-indigo-800">REGION-🗺️</h1>
          <div className="flex flex-wrap justify-center">
            {[
                "Mumbai",
                "Konkan Division",
                "Nashik Division",
                "Pune Division",
                "Aurangabad Division",
                "Nagpur",
              ].map((region) => (
                <div
                  key={region}
                  className="w-56 h-40 bg-blue-50 p-4 m-3 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-lg"
                >
                  {region.toUpperCase()} {/* Region name */}
                  <div className="bg-indigo-500 rounded-md h-16 text-white flex items-center justify-center mt-3 text-2xl shadow-sm">
                    {regionCount[region] || 0} {/* Display region count */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* //! AGE GROUPS */}
      <div className="flex justify-center">
        <div className="w-5/6 bg-gray-50 p-4 m-4 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-xl">
          <h1 className="text-3xl text-indigo-800">AGE GROUPS-🔢</h1>
          <div className="flex flex-wrap justify-center">
            {[
              "GenZ",
              "Millennials",
              "GenX",
              "Baby Boomers",
              "Silent Generation",
            ].map((generation) => (
              <div
                key={generation}
                className="w-56 h-40 bg-slate-50 p-4 m-3 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-lg"
              >
                {generation}
                <div className="bg-indigo-500 rounded-md h-16 text-white flex items-center justify-center mt-3 text-2xl shadow-sm">
                  {ageCount[generation] || 0} {/* Display the actual value */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* //! GENERATION GROUPS */}
      <div className="flex justify-center">
        <div className="w-5/6 bg-gray-50 p-4 m-4 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-xl">
          <h1 className="text-3xl text-indigo-800">GENERATION GROUP-🚸</h1>
          <div className="flex flex-wrap justify-center">
            {[
              "GEN-Z",
              "MILLENNIALS",
              "GEN-X",
              "BABY BOOMERS",
              "SILENT GENERATION",
            ].map((generation) => (
              <div
                key={generation}
                className="w-56 h-40 bg-slate-50 p-4 m-3 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-lg"
              >
                {generation}
                <div className="bg-indigo-500 rounded-md h-16 text-white flex items-center justify-center mt-3 text-2xl shadow-sm">
                    {ageCount[generation] || 0} {/* Display region count */}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* //! NCCS */}
      <div className="flex justify-center">
        <div className="w-5/6 bg-gray-50 p-4 m-4 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-xl">
          <h1 className="text-3xl text-indigo-800">NCCS-🔣</h1>
          <div className="flex flex-wrap justify-center">
            {[
              "NCCS A (17% quota)",
              "NCCS B (22% quota)",
              "NCCS C (29% quota)",
              "NCCS D/E (32% quota)",
            ].map((nccs) => (
              <div
                key={nccs}
                className="w-56 h-40 bg-slate-50 p-4 m-3 rounded-md shadow-lg flex-col text-center text-gray-700 font-light text-lg"
              >
                {nccs}
                <div className="bg-indigo-500 rounded-md h-16 text-white flex items-center justify-center mt-3 text-2xl shadow-sm">
                  xyx
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
