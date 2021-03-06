import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://bukreo-bf72d.firebaseio.com',
  });
}
bootstrap();
