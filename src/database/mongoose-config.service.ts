import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { Environment } from '../common/enums';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    if (this.configService.get('app.env') === Environment.LOCAL) {
      return {
        uri: `mongodb://${this.configService.get(
          'database.mongoDB.user',
        )}:${this.configService.get(
          'database.mongoDB.password',
        )}/${this.configService.get(
          'database.mongoDB.db',
        )}?retryWrites=true&w=majority`,
        retryAttempts: this.configService.get('database.mongoDB.retryAttepmts'),
      };
    }

    return {
      uri: `mongodb+srv://${this.configService.get(
        'database.mongoDB.user',
      )}:${this.configService.get(
        'database.mongoDB.password',
      )}@${this.configService.get(
        'database.mongoDB.host',
      )}/${this.configService.get(
        'database.mongoDB.db',
      )}?retryWrites=true&w=majority`,
      retryAttempts: this.configService.get('database.mongoDB.retryAttepmts'),
    };
  }
}
