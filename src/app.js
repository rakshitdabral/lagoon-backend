import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';

const app = express()

dotenv.config();

app.use(cors({
  origin : process.env.CORS_ORIGIN,
  credentials : true
}))


app.use(express.json({
  limit:"32kb"
}))

app.use(express.urlencoded({
  extended : true,
  limit : "32kb"
}))

app.use(express.static("public"))
app.use(cookieParser())



//routes import
import hireRouter from './routes/hiringform.routes.js'
import templateRouter from './routes/template.routes.js'
import featureRouter from './routes/feature.routes.js'
import webhookRoutes from './routes/webhook.router.js';
//routes declaration
app.use(webhookRoutes);
app.use("/api/v1/hire", hireRouter)
app.use('/api/v1/template',templateRouter)
app.use('/api/v1/feature',featureRouter)




export {app}