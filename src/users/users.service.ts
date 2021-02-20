import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async findByFirebaseUid(firebaseUid: string) {
    return this.userRepository.find({ firebaseUid });
  }

  async create(payload: CreateUserInput) {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(payload.firebaseIdToken)
      .catch((e) => {
        console.log(e);
        throw new UnauthorizedException();
      });

    return this.userRepository.save({
      firebaseUid: decodedToken.uid,
      name: payload.name,
      email: payload.email,
    });
  }

  async update(id: string, payload: UpdateUserInput) {
    return this.userRepository.update(id, { ...payload });
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    return this.findOne(id);
  }
}
