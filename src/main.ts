import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT).then(() => console.log(`SERVER IS LISTETING ON http://localhost:${PORT}`));
}
bootstrap();
