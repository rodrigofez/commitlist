import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('CommitList API')
  .setDescription('CommitList Rest API Documentation V1')
  .setVersion('1.0')
  .build();
