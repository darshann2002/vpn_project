import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = Number(9001);

  const options = new DocumentBuilder()
    .setTitle('vpn_project')
    .setDescription('API documentation for VPN project')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
