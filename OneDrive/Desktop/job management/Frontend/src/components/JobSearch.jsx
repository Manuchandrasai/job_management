import React from "react";
import { Search, MapPin, Briefcase } from "lucide-react";

const JobSearch = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedJobType,
  setSelectedJobType,
  salaryRange,
  setSalaryRange,
}) => {
  const min = 20;
  const max = 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Search Input */}
        <div className="relative w-full lg:w-1/4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative w-full lg:w-1/4">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                       appearance-none bg-white"
          >
            <option value="">Preferred Location</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Job Type Dropdown */}
        <div className="relative w-full lg:w-1/4">
          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                       appearance-none bg-white"
          >
            <option value="">Job type</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Salary Range Slider */}
        <div className="w-full lg:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary Per Month
          </label>

          {/* Display range */}
          <div className="text-sm font-semibold text-gray-900">
            ₹{salaryRange[0]}k – ₹{salaryRange[1]}k
          </div>

          {/* Slider */}
          <div className="relative mt-4 h-2">
            {/* Track */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>

            {/* Filled Track */}
            <div
              className="absolute top-1/2 h-1 bg-black rounded-full transform -translate-y-1/2 transition-all duration-200"
              style={{
                left: `${((salaryRange[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((salaryRange[1] - min) / (max - min)) * 100}%`,
              }}
            ></div>

            {/* Left Knob */}
            <input
              type="range"
              min={min}
              max={max}
              step="1"
              value={salaryRange[0]}
              onChange={(e) =>
                setSalaryRange([
                  Math.min(+e.target.value, salaryRange[1] - 1),
                  salaryRange[1],
                ])
              }
              className="absolute w-full bg-transparent appearance-none pointer-events-auto
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-black 
                [&::-webkit-slider-thumb]:cursor-pointer 
                [&::-webkit-slider-thumb]:transition-all 
                [&::-webkit-slider-thumb]:duration-200
                [&::-moz-range-thumb]:h-3
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-black
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-200"
            />

            {/* Right Knob */}
            <input
              type="range"
              min={min}
              max={max}
              step="1"
              value={salaryRange[1]}
              onChange={(e) =>
                setSalaryRange([
                  salaryRange[0],
                  Math.max(+e.target.value, salaryRange[0] + 1),
                ])
              }
              className="absolute w-full bg-transparent appearance-none pointer-events-auto
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-black 
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-all 
                [&::-webkit-slider-thumb]:duration-200
                [&::-moz-range-thumb]:h-3
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-black
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
