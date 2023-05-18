import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HR } from './HR.entity';
import { HRService } from './hr.service';
import { UpdateHRResponse } from '../interfaces/hr';
import { HRDto } from './dto/hr.dto';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.entity';

@Controller('/hr')
export class HRController {
  constructor(
    @Inject(HRService) private hrService: HRService,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  @Get('/:id')
  getOneHR(@Param('id') id: string): Promise<HR> {
    return this.hrService.getOneHR(id);
  }

  @Delete('/:id')
  removeHR(@Param('id') id: string): Promise<void> {
    return this.hrService.removeHR(id);
  }

  @Post('/')
  async createHR(
    @Body() newHR: HRDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await User.findOneBy({ id: req.query.user as string });
      if (user && user.role === 'admin') {
        const createdHR = await this.hrService.createHR(newHR);
        return res.status(200).json(createdHR);
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Put('/:id')
  updateHR(
    @Param('id') id: string,
    @Body() updatedHRData: HRDto,
  ): Promise<UpdateHRResponse> {
    return this.hrService.updateHR(id, updatedHRData);
  }
}
