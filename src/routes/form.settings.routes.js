import express from 'express';
import { getFormSettings, updateFormSettings } from '../controllers/form.settings.controller.js';

const router = express.Router();

// Update form settings
router.put('/:formId', updateFormSettings);

// Get form settings
router.get('/:formId', getFormSettings);

export default router;
