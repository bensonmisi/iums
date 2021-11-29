import { Controller } from '@nestjs/common';
import { SuspensereceiptService } from './suspensereceipt.service';

@Controller('suspensereceipt')
export class SuspensereceiptController {
  constructor(private readonly suspensereceiptService: SuspensereceiptService) {}
}
