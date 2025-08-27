import React, { useState, useEffect } from "react";
const BASE_URL = "https://13.233.28.44:8080/";
export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL+"api/Jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData = await response.json();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle search
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    setFilteredJobs(
      jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(lowerSearch) ||
          job.companyName?.toLowerCase().includes(lowerSearch) ||
          job.location?.toLowerCase().includes(lowerSearch)
      )
    );
  }, [searchTerm, jobs]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Jobs</h1>
      <p className="text-gray-600 mb-6">
        Search and explore jobs that match your skills and interest.
      </p>

      {/* Search Bar */}
      <div className="flex mb-8">
        <input
          type="text"
          placeholder="Search by job title, company, or location..."
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-purple-600 text-white px-6 py-2 rounded-r-lg hover:bg-purple-700">
          Search
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              {/* Company Logo and Header */}
              <div className="flex items-center mb-4">
                {job.logoPath ? (
                  <img
                    src={`https://13.233.28.44:8080${job.logoPath}`}
                    alt={job.companyName}
                    className="w-12 h-12 rounded-full object-contain bg-gray-100 border mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-400 font-bold">
                      {job.companyName?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">
                    {job.title || "No Title"}
                  </h2>
                  <p className="text-gray-600">{job.companyName || "No Company"}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                <span>📍 {job.location || "No Location"}</span>
                <span className="inline-block px-3 py-1 text-xs text-white bg-purple-600 rounded-full">
                  {job.jobType || "FullTime"}
                </span>
              </div>

              {/* Salary */}
              {job.salaryMin || job.salaryMax ? (
                <div className="mb-3 text-sm text-green-600 font-medium">
                  💰 {job.salaryMin && job.salaryMax 
                    ? `₹${job.salaryMin / 100000}LPA - ₹${job.salaryMax / 100000}LPA`
                    : job.salaryMin 
                    ? `₹${job.salaryMin / 100000}LPA+`
                    : `Up to ₹${job.salaryMax / 100000}LPA`
                  }
                </div>
              ) : (
                <div className="mb-3 text-sm text-gray-500">💰 Salary not disclosed</div>
              )}

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {job.description || "No description provided"}
              </p>

              {/* Apply Button */}
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No jobs found for your search.</p>
            <p className="text-gray-400 text-sm mt-2">Try different keywords or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
