import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HRController } from './hr.controller';
import { HR } from './hr.entity';
import { HRService } from './hr.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([HR])],
  controllers: [HRController],
  providers: [HRService, AuthService],
  exports: [HRService],
})
export class HRModule {}
