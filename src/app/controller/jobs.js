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
const getJobById = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: 'Record retrieved successfully',
    data: job,
  })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: 'Job updated successfully',
    data: job,
  })
}

const deleteJob = async (req, res) => {
  res.send('Job deleted successfully')
}

module.exports = { getJobById, getAllJobs, deleteJob, createJob, updateJob }
