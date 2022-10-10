
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of =>LessonType)
export class LessonResolver{
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ){}

    @Query(returns => LessonType)
    lesson(
        @Args('id')id: string,
    ){
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons(){
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLessonInput(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ){
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentTolesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput,
    ){
        const {lessonId, studentIds} = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson){
        return this.studentService.getManyStudent(lesson.students)
    }
}