import { PartialType } from '@nestjs/mapped-types';
import { CreatePaynowPaymentDto } from './create-paynow-payment.dto';

export class UpdatePaynowPaymentDto extends PartialType(CreatePaynowPaymentDto) {}
