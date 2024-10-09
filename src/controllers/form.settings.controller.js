import { Hire } from '../models/hiringform.model.js';

// Update Settings for a form
export const updateFormSettings = async (req, res) => {
  const { formId } = req.params;
  const { settings } = req.body;

  try {
    const form = await Hire.findByIdAndUpdate(
      formId,
      { settings },
      { new: true } 
    );
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form.settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update form settings', details: error });
  }
};

// Fetch Settings for a form

export const getFormSettings = async (req, res) => {
//   console.log(req)
  try {
    const formId = req.params.formId;
    const form = await Hire.findById(formId);
    console.log(form)
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // res.json({ settings: form.settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
