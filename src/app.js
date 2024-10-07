import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';

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

//routes declaration
app.use("/api/v1/hire", hireRouter)






export {app}