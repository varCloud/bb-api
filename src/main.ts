import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de la API de Gimnasio')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  return app;
}

if (require.main === module) {
  bootstrap()
    .then((app) => app.listen(3000))
    .catch((err) => console.error(err));
}
