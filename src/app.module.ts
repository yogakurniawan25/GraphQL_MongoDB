import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import { StudentModule } from './student/student.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb://localhost/school',
    synchronize: true,
    useUnifiedTopology: true,
    autoLoadEntities: true,
    // entities:[Lesson]
  }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: true
  }), LessonModule, StudentModule],
})
export class AppModule {}
