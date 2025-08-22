import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobSearch from "./components/JobSearch";
import JobCard from "./components/JobCard";
import CreateJobModal from "./components/CreateJobModal";
import JobsList from "./components/JobsList";
import LoginModal from "./components/LoginModal";
import { AuthProvider } from "./contexts/AuthContext";
import SignupModal from "./components/SignupModal";
import { fetchJobs, createJob } from "./utils/api"; // Add these imports

// Import other pages
import FindTalents from "./pages/FindTalents";
import FindJobs from "./pages/FindJobs";
import AboutUs from "./pages/AboutUs";
import Testimonials from "./pages/Testimonials";

function App() {
  const [jobs, setJobs] = useState([]);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState([50, 80]);

  // Fetch jobs from backend on mount and after create
  useEffect(() => {
    loadJobsFromBackend();
  }, []);

  const loadJobsFromBackend = async () => {
    try {
      const backendJobs = await fetchJobs();  // fetch from backend API
      console.log("Fetched jobs from backend:", backendJobs);
      setJobs(backendJobs);
    } catch (error) {
      console.error("Failed to load jobs", error);
    }
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowLoginModal(false);
  };

  const handleSignup = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Create job by sending to backend API, then reload jobs
  const handleCreateJob = async (jobData) => {
    try {
      // Add user ID if available
      jobData.postedByUserId = currentUser?.id || 1;

      await createJob(jobData);  // POST to backend

      await loadJobsFromBackend();  // Refresh job list

      setShowCreateJobModal(false);
    } catch (error) {
      alert("Failed to create job: " + error.message);
    }
  };

  // For testing: use full jobs array without filtering
  // const filteredJobs = jobs;

  // Use filtering logic - optional chaining to avoid errors
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesJobType = !selectedJobType || job.jobType?.toLowerCase().includes(selectedJobType.toLowerCase());

    return matchesSearch && matchesLocation && matchesJobType;
  });

  console.log("Filtered jobs:", filteredJobs);

  const JobListingPage = () => (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <JobSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filteredJobs.length === 0 ? (
          <p className="text-center col-span-full">No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        )}
      </div>
    </main>
  );

  return (
     <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header
          onCreateJob={() => setShowCreateJobModal(true)}
          onLogin={() => setShowLoginModal(true)}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          currentUser={currentUser}
        />

        <Routes>
          <Route path="/" element={<JobListingPage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talents" element={<FindTalents />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/jobs-list" element={<JobsList />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>

        {showCreateJobModal && (
          <CreateJobModal
            onClose={() => setShowCreateJobModal(false)}
            onCreateJob={handleCreateJob}
          />
        )}

        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
            onSwitchToSignup={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
          />
        )}

        {showSignupModal && (
          <SignupModal
            onClose={() => setShowSignupModal(false)}
            onSignup={handleSignup}
            onSwitchToLogin={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
          />
        )}
      </div>
    </Router>
     </AuthProvider>
  );
}

export default App;
