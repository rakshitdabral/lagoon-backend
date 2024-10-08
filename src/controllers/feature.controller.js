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

export const getLatestFeature = async (req,res) =>{
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.send(features);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve feature requests' });
  }
}

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