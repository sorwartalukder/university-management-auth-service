import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
}); // this process is synchronous

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    // logger.info(`🛢___Database is connected successfully`)
    console.log(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      // logger.info(`Application listening on port ${config.port}`)
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect 🛢__Database`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received'); // SIGTERM= signal termination
  if (server) {
    server.close();
  }
});
