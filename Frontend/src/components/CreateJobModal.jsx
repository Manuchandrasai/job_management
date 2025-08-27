import React, { useState, useRef } from "react";
import { X, Calendar, ChevronDown, UploadCloud } from "lucide-react";

const locations = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune"];
const jobTypes = ["FullTime", "Internship", "Partime", "Contract"];

const BASE_URL = "http://13.233.28.44:8080/";


const CreateJobModal = ({ onClose, refreshJobs }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: locations[0], // default to first location
    jobType: jobTypes[0],   // default to first type (IMPORTANT FIX)
    salaryMin: "",
    salaryMax: "",
    applicationDeadline: "",
    jobDescription: "",
    logoFile: null,
    postedByUserId: 1,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef();

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);

  function handleFileChange(file) {
    setFormData((prev) => ({ ...prev, logoFile: file }));
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (isDraft) => {
    if (
      !formData.jobTitle.trim() ||
      !formData.companyName.trim() ||
      !formData.location.trim() ||
      !formData.jobType.trim() ||
      !formData.jobDescription.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("Title", formData.jobTitle);          // ✅ "Title" not "title"
data.append("CompanyName", formData.companyName); // ✅ "CompanyName" not "companyname"
data.append("Location", formData.location);       // ✅ "Location" 
data.append("JobType", formData.jobType);         // ✅ "JobType"
data.append("SalaryMin", parseInt(formData.salaryMin, 10));
data.append("SalaryMax", parseInt(formData.salaryMax, 10));
data.append("Description", formData.jobDescription);
data.append("PostedByUserId", formData.postedByUserId.toString());
    if (formData.salaryMin) data.append("SalaryMin", parseInt(formData.salaryMin, 10));
    if (formData.salaryMax) data.append("SalaryMax", parseInt(formData.salaryMax, 10));
    if (formData.applicationDeadline) data.append("ApplicationDeadline", formData.applicationDeadline);
    if (formData.logoFile) data.append("logo", formData.logoFile);

    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const res = await fetch(BASE_URL+"api/Jobs", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || JSON.stringify(err.errors));
      }
      alert("Job created successfully!");
      if (refreshJobs) await refreshJobs();
      if (onClose) onClose();
    } catch (err) {
      alert("Failed to create job: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create Job Opening</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="Full Stack Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Amazon, Microsoft, Swiggy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left flex items-center justify-between"
              >
                <span className={formData.location ? "text-gray-900" : "text-gray-500"}>
                  {formData.location || "Choose Preferred Location"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showLocationDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {locations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, location });
                        setShowLocationDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Job Type Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <button
                type="button"
                onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left flex items-center justify-between"
              >
                <span className={formData.jobType ? "text-gray-900" : "text-gray-500"}>
                  {formData.jobType || "FullTime"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showJobTypeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, jobType: type });
                        setShowJobTypeDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    placeholder="Min"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    placeholder="Max"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              placeholder="Please share a description to let the candidate know more about the job role"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
            <div
              onClick={() => fileInputRef.current.click()}
              className="flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-contain" />
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-500">Drag and drop or click to select a logo</span>
                  <span className="text-xs text-gray-400">PNG, JPG, GIF up to 2MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={() => handleSubmit(true)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Save Draft ↑
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Publish ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal;
