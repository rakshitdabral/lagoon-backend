import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({
  limit: '32kb',
}));

app.use(express.urlencoded({
  extended: true,
  limit: '32kb',
}));

app.use(express.static('public'));
app.use(cookieParser());

// routes import
import hireRouter from './routes/hiringform.routes.js';
import templateRouter from './routes/template.routes.js';
import featureRouter from './routes/feature.routes.js';
import webhookRoutes from './routes/webhook.router.js';
import settingsRouter from './routes/form.settings.routes.js';  
import awsRouter from './routes/awsuploader.routes.js'

// Routes declaration
app.use(webhookRoutes);
app.use('/api/v1/hire', hireRouter);
app.use('/api/v1/template', templateRouter);
app.use('/api/v1/feature', featureRouter);
app.use('/api/v1/settings', settingsRouter);  
app.use('/api/v1/upload' , awsRouter)

export { app };
