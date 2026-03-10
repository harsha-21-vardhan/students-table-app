import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, StudentsModule],
})
export class AppModule {}
