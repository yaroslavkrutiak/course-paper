import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {resolve, join} from 'path'
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.use(cookieParser());
    app.use(cors())
    await app.listen(PORT).then(() => console.log(`Server is listening on http://localhost:${PORT}`));
}

bootstrap();
