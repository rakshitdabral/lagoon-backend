import { Router } from "express";
import {
  createHiringForm,
  deleteHiringForm,
  getAllHiringForms,
  getHiringFormById,
  updateHiringForm,
} from './../controllers/hiringform.controller.js';

const router = Router()

//create hiring form
router.post('/hiring-forms', createHiringForm);

// Retrieve all hiring forms
router.get('/hiring-forms', getAllHiringForms);

// Retrieve a single hiring form by ID
router.get('/hiring-forms/:id', getHiringFormById);

// Update a hiring form
router.put('/hiring-forms/:id', updateHiringForm);

// Delete a hiring form
router.delete('/hiring-forms/:id', deleteHiringForm);

export default router;