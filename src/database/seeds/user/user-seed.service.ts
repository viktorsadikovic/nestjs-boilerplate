import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../modules/user/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectModel(User.name)
    private repository: Model<UserDocument>,
  ) {}

  async run() {
    const admin = await this.repository.findOne({
      firstName: 'Super',
      lastName: 'Admin',
    });

    if (!admin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('Test123', salt);

      await this.repository.create({
        firstName: 'Super',
        lastName: 'Admin',
        age: 20,
        email: 'admin@example.com',
        password: password,
      });
    }
  }
}
