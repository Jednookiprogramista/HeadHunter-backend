import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from '../errors/error.message';

export const hashData = async (data: string): Promise<string> => {
  try {
    return await bcrypt.hash(data, 10);
  } catch (error: unknown) {
    throw new HttpException(
      ErrorMessage.InternalServerError,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

/** dane z bcrypt, któe można importować i korzystać z nich
 * w projekcie, zamiast przepisywać ręcznie, jeżeli będziemy z tego korzystać w  wielu miejscach  */
