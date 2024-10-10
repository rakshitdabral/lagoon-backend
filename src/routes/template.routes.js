import { Router } from 'express';
import { createTemplate, deleteTemplateById, getTemplateById, getTemplates } from './../controllers/template.controller.js';

const router = Router()


// create new template
router.post('/templates', createTemplate);

// get template by id
router.get('/templates/:id',getTemplateById)

//get template
router.get('/templates' , getTemplates)


// Delete a template form
router.delete('/templates/:id' , deleteTemplateById)

export default router;