const express = require('express')
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobById,
} = require('../../app/controller/jobs')
const router = express.Router()

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJobById)

module.exports = router
