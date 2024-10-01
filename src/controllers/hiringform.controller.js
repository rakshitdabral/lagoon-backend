// hiring.controller.js
import { Hire } from '../models/hiringform.model.js';

export const createHiringForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    console.log(fields)
    const hiringForm = new Hire({ title, fields }); // Include dynamicFields
    await hiringForm.save();
    res.status(201).json({ message: 'Hiring form created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating hiring form' });
  }
};

export const getAllHiringForms = async (req, res) => {
  try {
    const hiringForms = await Hire.find().exec();
    res.status(200).json(hiringForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching hiring forms' });
  }
};

export const getHiringFormById = async (req, res) => {
  try {
    const id = req.params.id;
    const hiringForm = await Hire.findById(id).exec();
    if (!hiringForm) {
      res.status(404).json({ message: 'Hiring form not found' });
    } else {
      res.status(200).json(hiringForm);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching hiring form' });
  }
};

export const updateHiringForm = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, fields } = req.body;

    const hiringForm = await Hire.findByIdAndUpdate(id,
      { $set: { title, fields } },
      { new: true } // Return the updated document
    ).exec();

    if (!hiringForm) {
      return res.status(404).json({ message: 'Hiring form not found' });
    }

    res.status(200).json(hiringForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating hiring form' });
  }
};

export const deleteHiringForm = async (req, res) => {
  try {
    const id = req.params.id;
    await Hire.findByIdAndDelete(id).exec();
    res.status(204).json({ message: 'Hiring form deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting hiring form' });
  }
};