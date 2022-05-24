const getAllJobs = async (req, res) => {
  res.send('get all jobs')
}
const createJob = async (req, res) => {
  res.send('job created successfully')
}
const getAllJobById = async (req, res) => {
  res.send('get single job')
}

const updateJob = async (req, res) => {
  res.send('job updated successfully')
}

const deleteJob = async (req, res) => {
  res.send('Job deleted successfully')
}

module.exports = { getAllJobById, getAllJobs, deleteJob, createJob, updateJob }
