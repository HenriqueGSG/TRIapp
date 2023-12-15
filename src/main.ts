import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TRI api docs')
    .setDescription('The documentation of TRI api')
    .setVersion('1.0')
    .addTag('TRI')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: '.swagger-ui .topbar { background-color: #0038A8; }',
    customSiteTitle: 'TRI APP',
  });
  app.use(cors());

  await app.listen(3000);
}
bootstrap();
