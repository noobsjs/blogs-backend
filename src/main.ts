import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ParseIntPipe } from "src/common/Pipes/ParseInt.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ParseIntPipe(), new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
