import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {json} from 'express';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });

    app.use(
        json({
            limit: '3000kb',
        }),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            // disableErrorMessages: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    await app.listen(3001);
}

bootstrap();
