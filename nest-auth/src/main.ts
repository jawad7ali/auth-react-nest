import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log('Server is running on http://localhost:8000');
  await app.listen(8000);
}
bootstrap();
