import { Controller } from '@nestjs/common';
import { BidbondapplicationService } from './bidbondapplication.service';

@Controller('bidbondapplication')
export class BidbondapplicationController {
  constructor(private readonly bidbondapplicationService: BidbondapplicationService) {}
}
