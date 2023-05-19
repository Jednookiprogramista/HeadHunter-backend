import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HR } from './HR.entity';
import { CreateHRResponse, UpdateHRResponse } from '../interfaces/hr';
import { HRDto } from './dto/hr.dto';

@Injectable()
export class HRService {
  constructor(
    @InjectRepository(HR)
    private HRRepository: Repository<HR>,
  ) {}

  async getOneHR(id: string): Promise<HR> {
    return await this.HRRepository.findOneByOrFail({ id });
  }

  async getHRByUserId(userId: string): Promise<HR> {
    return await this.HRRepository.createQueryBuilder('hr')
      .leftJoinAndSelect('hr.user', 'user', 'userId = :userId', { userId })
      .getOneOrFail();
  }

  async removeHR(id: string): Promise<void> {
    await this.HRRepository.delete(id);
  }

  async createHR(newHR: HRDto): Promise<CreateHRResponse> {
    return await this.HRRepository.save(newHR);
  }

  async updateHR(
    id: string,
    updatedHRData: UpdateHRResponse,
  ): Promise<UpdateHRResponse> {
    await this.HRRepository.update(id, updatedHRData);
    return await this.HRRepository.findOneByOrFail({ id });
  }
}
