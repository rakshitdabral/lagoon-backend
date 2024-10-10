import express from 'express';
import { uploadResume } from '../controllers/aws.controller.js';

const router = express.Router();

router.put('/upload-resume', uploadResume);

export default router;