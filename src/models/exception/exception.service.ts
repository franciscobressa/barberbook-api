import { HttpException, Injectable } from '@nestjs/common';
@Injectable()
export class ExcepetionService {
  newError(statusCode: number, message: string) {
    return new HttpException(
      {
        status: statusCode,
        error: message,
      },
      statusCode,
    );
  }
}
