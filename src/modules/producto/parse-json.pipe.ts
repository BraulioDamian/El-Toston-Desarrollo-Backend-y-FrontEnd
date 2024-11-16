// src/pipes/parse-json.pipe.ts

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform<string, any> {
  transform(value: string): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new BadRequestException('El JSON proporcionado es inválido');
    }
  }
}
