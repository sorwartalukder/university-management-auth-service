import express, { Application, Request, Response } from 'express'
import cors from "cors";
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('University management auth service server is raning')
})

export default app;