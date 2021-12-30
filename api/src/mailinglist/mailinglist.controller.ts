import { Controller } from '@nestjs/common';
import { MailinglistService } from './mailinglist.service';

@Controller('mailinglist')
export class MailinglistController {
  constructor(private readonly mailinglistService: MailinglistService) {}
}
