import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from '../interfaces/CreateUser.input';
import { UpdateUserInput } from '../interfaces/UpdateUser.input';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserInput) {
    // TODO: アバターを登録する処理を追加する
    const decodedToken = await admin
      .auth()
      .verifyIdToken(payload.firebaseIdToken)
      .catch((e) => {
        console.log(e);
        throw new UnauthorizedException('Invalid firebaseIdToken.');
      });

    return this.userRepository.save({
      firebaseUid: decodedToken.uid,
      name: payload.name,
      email: payload.email,
    });
  }

  async update(currentUser: User, payload: UpdateUserInput) {
    // TODO: アバターを更新する処理を追加する
    return this.userRepository.update(currentUser.id, { ...payload });
  }

  async findOne({ userId }: { userId: string }) {
    return this.userRepository.findOne(userId);
  }

  async findByFirebaseUid({ firebaseUid }: { firebaseUid: string }) {
    return this.userRepository.findOne({ firebaseUid });
  }
}
