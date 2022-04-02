const getAllJobs = async (req, res) => {
  res.send('getAllJobs')
}
const createJob = async (req, res) => {
  res.send('createJob')
}
const updateJob = async (req, res) => {
  res.send('updateJob')
}
const deleteJob = async (req, res) => {
  res.send('deleteJob')
}
const showStatus = async (req, res) => {
  res.send('showStatus')
}

export { getAllJobs, createJob, updateJob, deleteJob, showStatus }