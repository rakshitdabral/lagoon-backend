import { Router } from "express";
import { deleteFeature, getFeatureById, getFeatures, reqFeature, updateFeature, upvoteFeature } from "../controllers/feature.controller.js";

const router = Router()

//create feature request post
router.post('/feature-req', reqFeature);

//get latest feature request
router.get('/feature-req',getFeatures)

//get feature by id
router.get('/feature-req/:id',getFeatureById)

//update feature by id
router.put('/feature-req/:id',updateFeature)

//delete feature
router.delete('/feature-req/:id',deleteFeature)

//upvote feature
router.put('/feature-req/upvote/:id' , upvoteFeature)

export default router;