import express from 'express'
import { createJob, deleteJob, getAllJobs, showStatus, updateJob } from '../controllers/jobsController.js'

const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/stats').get(showStatus)
router.route('/:id').patch(updateJob).delete(deleteJob)

export default router