  // hiring.controller.js
  import { Hire } from '../models/hiringform.model.js';
import { Template } from '../models/template.model.js';


  // export const createHiringForm = async (req, res) => {
  //   try {
  //     const { title, status,fields } = req.body;
  //     console.log(fields)
  //     const hiringForm = new Hire({ title, status,fields }); // Include dynamicFields
  //     await hiringForm.save();
  //     res.status(201).json({ message: 'Hiring form created successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error creating hiring form' });
  //   }
  // };

  export const createHiringForm = async (req, res) => {
    try {
      const { title, templateId, fields,settings } = req.body;
      let template;
      if (templateId) {
        template = await Template.findById(templateId);
        if (!template) {
          throw new Error('Template not found');
        }
      }
      const mergedFields = template ? [...template.fields, ...fields] : fields;
      const hiringForm = new Hire({ title, template: templateId, fields: mergedFields, settings });
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
      const { 
        title, 
        status, 
        templateId, 
        sortBy, 
        orderBy, 
        limit, 
        page 
      } = req.query;
  
      const query = {};
  
      if (title) {
        query.title = { $regex: title, $options: 'i' };
      }
  
      if (status) {
        query.status = status;
      }
  
      if (templateId) {
        query.template = templateId;
      }
  
      let sort = {};
      if (sortBy && orderBy) {
        sort[sortBy] = orderBy === 'asc' ? 1 : -1;
      } else {
        sort.createdAt = -1; // default sorting by creation date in descending order
      }
  
      const limitNumber = parseInt(limit) || 10;
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * limitNumber;
  
      const hiringForms = await Hire.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .exec();
  
      const totalForms = await Hire.countDocuments(query).exec();
      const totalPages = Math.ceil(totalForms / limitNumber);
  
      res.status(200).json({
        hiringForms,
        pagination: {
          totalForms,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber,
        },
      });
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
      const updateData = {}; 

      // Dynamically build the update object
      if (req.body.title) {
        updateData['title'] = req.body.title; 
      }

      if(req.body.status){
        updateData['status'] = req.body.status
      }

      if (req.body.fields) {
        // Replace all fields with the new fields
        updateData['fields'] = req.body.fields;
      }

      // If there are any updates to be made
      if (Object.keys(updateData).length > 0) {
        const hiringForm = await Hire.findByIdAndUpdate(id,
          { $set: updateData },
          { new: true }
        ).exec();

        if (!hiringForm) {
          return res.status(404).json({ message: 'Hiring form not found' });
        }

        res.status(200).json(hiringForm);
      } else {
        return res.status(400).json({ message: 'No updates provided' });
      }
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