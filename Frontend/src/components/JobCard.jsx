import React from "react";
import { MapPin, Clock, Briefcase } from "lucide-react";

const JobCard = ({ job }) => {
  const logo = job.logoPath ? (
    <img
      src={`http://13.233.28.44:8080${job.logoPath}`}
      alt={job.companyName || "Logo"}
      className="w-15 h-14 rounded-full object-contain bg-white border mr-3"
    />
  ) : (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
      <Briefcase className="text-gray-400" />
    </div>
  );

  const formatSalary = () => {
    if (typeof job.salaryMax === "number") {
      return `₹${Math.round(job.salaryMax / 100000)}LPA`;
    }
    return "Not disclosed";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center mb-3">
        {logo}
        <div className="ml-auto text-xs bg-blue-100 text-blue-600 rounded-full px-3 py-1">
          24h Ago
        </div>
      </div>

      {/* Title */}
      <h3 className="text-md font-semibold text-gray-900 mb-2 capitalize">
        {job.title || "No Title"}
      </h3>

      {/* Details */}
      <div className="flex items-center text-gray-500 text-sm gap-4 mb-3">
        <span className="flex items-center">
          <MapPin className="mr-1" size={16} />
          {job.location || "Unknown"}
        </span>
        <span className="flex items-center">
          <Clock className="mr-1" size={16} />
          {formatSalary()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-8 line-clamp-10">
        {job.description || "No description available"}
      </p>

      {/* Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
