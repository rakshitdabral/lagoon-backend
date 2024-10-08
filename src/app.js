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

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);
      const { id, ...attributes } = evt.data;
      // Handle the webhooks
      const eventType = evt.type;
      if (eventType === 'user.created') {
        console.log(`User ${id} was ${eventType}`);
                console.log(attributes)
      }
      res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);


//routes import
import hireRouter from './routes/hiringform.routes.js'
import templateRouter from './routes/template.routes.js'

//routes declaration
app.use("/api/v1/hire", hireRouter)
app.use('/api/v1/template',templateRouter)





export {app}