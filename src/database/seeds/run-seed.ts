import { NestFactory } from '@nestjs/core';
import { ItemSeedService } from './item/item-seed.service';
import { SeedsModule } from './seeds.module';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedsModule);

  await app.get(UserSeedService).run();
  await app.get(ItemSeedService).run();

  await app.close();
};

void runSeed();
