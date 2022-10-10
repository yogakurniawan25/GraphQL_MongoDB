import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { Student } from './studnet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student])
  ],
  exports: [StudentService],
  providers: [StudentService, StudentResolver]
})
export class StudentModule {}
