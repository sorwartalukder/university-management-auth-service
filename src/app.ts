import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Aplication routes
app.use('/api/v1/users/', usersRouter)

// Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // throw new Error('generic error')
  next('generic error')
})

//globar error handler
app.use(globalErrorHandler)

export default app
