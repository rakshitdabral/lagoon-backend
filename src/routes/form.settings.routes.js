import express from 'express';
import { updateFormSettings, getFormSettings } from '../controllers/form.settings.controller.js';

const router = express.Router();

// Update form settings
router.put('/:formId/settings', updateFormSettings);

// Get form settings
router.get('/:formId/settings', getFormSettings);

export default router;
