import { Module } from '@nestjs/common';
import { RidersService } from './riders.service';

@Module({
  providers: [RidersService]
})
export class RidersModule {}
