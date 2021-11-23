import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  await app.listen(PORT).then(() => console.log(`Server is listening on http://localhost:${PORT}`));
}
bootstrap();
