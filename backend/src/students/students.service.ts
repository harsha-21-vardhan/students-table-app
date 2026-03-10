import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with id "${id}" not found`);
    }
    return student;
  }

  async create(dto: CreateStudentDto) {
    const existing = await this.prisma.student.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException(`Email "${dto.email}" is already in use`);
    }
    return this.prisma.student.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        age: dto.age,
      },
    });
  }

  async update(id: string, dto: UpdateStudentDto) {
    await this.findOne(id);

    if (dto.email) {
      const existing = await this.prisma.student.findFirst({
        where: { email: dto.email.toLowerCase(), NOT: { id } },
      });
      if (existing) {
        throw new ConflictException(`Email "${dto.email}" is already in use`);
      }
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name.trim() }),
        ...(dto.email && { email: dto.email.trim().toLowerCase() }),
        ...(dto.age !== undefined && { age: dto.age }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.student.delete({ where: { id } });
    return { message: `Student "${id}" deleted successfully` };
  }
}
