import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';  
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Enable CORS with default settings or customize if needed
  app.enableCors({
    // origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true, // Allow cookies, authentication, etc.
    methods: 'GET,POST,PUT,DELETE', // Allow specific methods
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Datatys APIs')
    .setDescription('API documentation for my NestJS project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' is the path where Swagger will be available

  app.useStaticAssets(join(__dirname, '..', 'uploads'));  // Serve uploaded files

  await app.listen(3000);
}
bootstrap();
