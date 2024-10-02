// hiring.controller.js
import { Hire } from '../models/hiringform.model.js';

export const createHiringForm = async (req, res) => {
  try {
    const { title, status,fields } = req.body;
    console.log(fields)
    const hiringForm = new Hire({ title, status,fields }); // Include dynamicFields
    await hiringForm.save();
    res.status(201).json({ message: 'Hiring form created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating hiring form' });
  }
};

export const publishHiringForm = async (req, res) => {
  try {
    const id = req.params.id;
    const hiringForm = await Hire.findByIdAndUpdate(id, { $set: { status: 'published' }, $unset: { draftAt: '' } }, { new: true }).exec();
    if (!hiringForm) {
      return res.status(404).json({ message: 'Hiring form not found' });
    }
    res.status(200).json(hiringForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error publishing hiring form' });
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


export const trashHiringForm = async (req, res) => {
  try {
    const id = req.params.id;
    const hiringForm = await Hire.findByIdAndUpdate(id, { $set: { status: 'trashed', trashedAt: new Date() } }, { new: true }).exec();
    if (!hiringForm) {
      return res.status(404).json({ message: 'Hiring form not found' });
    }
    res.status(200).json({ message: 'Hiring form sent to trash' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error trashing hiring form' });
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
    const hiringForm = await Hire.findByIdAndDelete({ _id: id, status: 'trashed' }).exec();
    if (!hiringForm) {
      return res.status(404).json({ message: 'Hiring form not found or not trashed' });
    }
    res.status(204).json({ message: 'Trashed hiring form deleted permanently' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting trashed hiring form' });
  }
};

export const getDraftHiringForms = async (req, res) => {
  try {
    const hiringForms = await Hire.find({ status: 'draft' }).exec();
    if (hiringForms.length === 0) {
      res.status(200).json({ message: 'No draft hiring forms found' });
    } else {
      res.status(200).json(hiringForms);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching draft hiring forms' });
  }
};

export const getTrashedHiringForms = async (req, res) => {
  try {
    const hiringForms = await Hire.find({ status: 'trashed' }).exec();
    res.status(200).json(hiringForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trashed hiring forms' });
  }
};