import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import ApiError from './errors/ApiError'
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplication routes
app.use('/api/v1/users/', UserRoutes);

// Testing
app.get('/', async (req: Request, res: Response) => {
  // Promise.reject(new Error('unhandle promise rejection'))
  // console.log(x)
  // throw new Error('generic error')
  // throw new ApiError(400, 'generic error')
  // next('generic error')
  res.json({ success: true });
});

//globar error handler
app.use(globalErrorHandler);

export default app;
