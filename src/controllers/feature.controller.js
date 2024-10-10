import { Feature } from "../models/feature.model.js";

export const reqFeature = async (req,res) =>{
  try {
    const feature = new Feature(req.body);
    await feature.save();
    res.status(201).send(feature);
  } catch (err) {
    res.status(500).send({ error: 'Failed to create feature request' });
  }
}

export const getFeatures = async (req, res) => {
  try {
    const { 
      headline, 
      sections,
      urgency,
      sortBy, 
      orderBy, 
      limit, 
      page 
    } = req.query;

    const query = {};

    if (headline) {
      query.headline = { $regex: headline, $options: 'i' };
    }

    if(sections){
      query.sections = {$regex: sections , $options : 'i'}
    }

    if(urgency){
      query.urgency = {$regex : urgency , $options : 'i'}
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

    const features = await Feature.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .exec();

    const totalFeatures = await Feature.countDocuments(query).exec();
    const totalPages = Math.ceil(totalFeatures / limitNumber);

    res.status(200).json({
      features,
      pagination: {
        totalFeatures,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching features' });
  }
};

export const getFeatureById = async (req,res)=>{
  try {
    const id = req.params.id;
    const feature = await Feature.findById(id);
    if (!feature) {
      return res.status(404).send({ error: 'Feature not found' });
    }
    res.send(feature);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve feature request' });
  }
}

export const updateFeature = async (req,res)=>{
  try {
    const id = req.params.id;
    const feature = await Feature.findByIdAndUpdate(id, req.body, { new: true });
    if (!feature) {
      return res.status(404).send({ error: 'Feature not found' });
    }
    res.send(feature);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update feature request' });
  }
}

export const deleteFeature = async (req,res) =>{
  try {
    const id = req.params.id;
    await Feature.findByIdAndDelete(id);
    res.status(204).send({ message: 'Feature request deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete feature request' });
  }
}

export const upvoteFeature = async (req,res) =>{
  try {
    const featureId = req.params.id;
    const feature = await Feature.findById(featureId);
    if (!feature) {
      return res.status(404).send({ error: 'Feature not found' });
    }
    feature.upvotes += 1;
    await feature.save();
    res.send(feature);
  } catch (err) {
    res.status(500).send({ error: 'Failed to upvote feature request' });
  }
}