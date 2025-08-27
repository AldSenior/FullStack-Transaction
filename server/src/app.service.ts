import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello s!s<h1/>';
  }
  getProfile(): string {
    return 'It s my profile';
  }
}
