import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

// @Module({
//   providers: [LessonService]
// })
// export class LessonModule {}

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    StudentModule
  ],
  providers: [
    LessonService,
    LessonResolver
  ]
})

export class LessonModule{}
