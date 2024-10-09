import { Template } from '../models/template.model.js';

export const createTemplate = async (req, res) => {
  try {
    const { templateName, description, fields } = req.body;
    if (!templateName || !description || !fields) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const template = new Template({
      templateName,
      description,
      fields,
    });
    await template.save();
    res.status(201).json({ message: 'Template created successfully', template });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating template' });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Please provide a valid template ID' });
    }
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving template' });
  }
};


export const deleteTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Please provide a valid template ID' });
    }
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }else{
      await  Template.findByIdAndDelete(id)
    }
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting template' });
  }
};