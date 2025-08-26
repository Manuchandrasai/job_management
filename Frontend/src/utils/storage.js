const JOBS_STORAGE_KEY = 'jobPortalJobs';

export const saveJobs = (jobs) => {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error('Error saving jobs to localStorage:', error);
  }
};

export const loadJobs = () => {
  try {
    const savedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
    return savedJobs ? JSON.parse(savedJobs) : [];
  } catch (error) {
    console.error('Error loading jobs from localStorage:', error);
    return [];
  }
};

export const exportJobsToJSON = (jobs) => {
  const dataStr = JSON.stringify(jobs, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = `jobs_${new Date().toISOString().split('T')[0]}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};
