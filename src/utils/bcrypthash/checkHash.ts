import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from '../errors/error.message';

export const checkHash = async (data: string, encrypted: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(data, encrypted);
  } catch (error: unknown) {
    throw new HttpException(ErrorMessage.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

/** sprawdzenie hasła, któe można importować i korzystać z nich
 * w projekcie, zamiast przepisywać ręcznie, jeżeli będziemy z tego korzystać w  wielu miejscach  */