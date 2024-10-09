import express from 'express';
import { getFormSettings, updateFormSettings } from '../controllers/form.settings.controller.js';

const router = express.Router();

// Update form settings
router.put('/:formId/formsettings', updateFormSettings);

// Get form settings
router.get('/:formId/formsettings', getFormSettings);

export default router;
