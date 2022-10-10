import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './student.input';
import { Student } from './studnet.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,  
    ){}

    async getStudent(id: string): Promise<Student>{
        return this.studentRepository.findOne({
            where: {id:id}
        })
    }

    async getStudents(): Promise<Student[]>{
        return this.studentRepository.find();
    }

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student>{
        const {firstName, lastName} = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });
        return this.studentRepository.save(student);
    }

    async getManyStudent(studentIds: string[]) : Promise<Student[]>{
        return this.studentRepository.find({
            where: {
                id : In([...studentIds])
            }
        })
    }

    // async update(id: string, updateUserInput: UpdateUserInput) {
    //     const existingUser = await this.userModel
    //       .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
    //       .exec();
    
    //     if (!existingUser) {
    //       throw new NotFoundException(`User ${id} not found`);
    //     }
    //     return existingUser;
    //   }
    
    //   async remove(id: string) {
    //     const student = await this.findOne(id);
    //     return student.remove();
    //   }
}
