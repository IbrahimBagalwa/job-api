const { StatusCodes } = require('http-status-codes')
const Job = require('../model/jobs')
const { BadRequestError, NotFoundError } = require('../helpers/errors')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: 'Record retrieved successfully',
    count: jobs.length,
    data: jobs,
  })
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: 'Job created successfully',
    data: job,
  })
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
