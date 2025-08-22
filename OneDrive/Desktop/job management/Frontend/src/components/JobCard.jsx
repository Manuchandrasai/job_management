import React from 'react';
import { MapPin, Clock, Briefcase } from 'lucide-react';

const JobCard = ({ job }) => {
  const logo = job.logoPath  // lowercase!
    ? (
      <img
        src={`http://localhost:5044${job.logoPath}`}
        alt={job.companyName || "Logo"}  // lowercase!
        className="w-12 h-12 rounded-full object-contain bg-white border mr-4"
      />
    )
    : (
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
        <Briefcase className="text-gray-400" />
      </div>
    );

  const formatSalary = () => {
    if (job.salaryMin && job.salaryMax)  // lowercase!
      return `₹${job.salaryMin / 100000}LPA - ₹${job.salaryMax / 100000}LPA`;
    if (job.salaryMin)  // lowercase!
      return `₹${job.salaryMin / 100000}LPA+`;
    if (job.salaryMax)  // lowercase!
      return `Up to ₹${job.salaryMax / 100000}LPA`;
    return 'Salary not disclosed';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        {logo}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize mb-1">
            {job.title || "No Title"}  {/* lowercase! */}
          </h3>
          <div className="text-gray-500 text-sm">
            {job.companyName || "No Company"}  {/* lowercase! */}
          </div>
        </div>
        <span className="ml-auto text-xs bg-blue-100 text-blue-600 rounded-full px-3 py-1">
          24h Ago
        </span>
      </div>
      <div className="flex items-center text-gray-500 text-sm gap-6 mb-2">
        <span className="flex items-center">
          <MapPin className="mr-1" size={16} />
          {job.location || "No Location"}  {/* lowercase! */}
        </span>
        <span className="flex items-center">
          <Clock className="mr-1" size={16} />
          {formatSalary()}
        </span>
      </div>
      <div className="text-sm text-gray-700 mb-4">
        {job.description || "No description"}  {/* lowercase! */}
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
