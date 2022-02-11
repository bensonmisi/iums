import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('bidder/contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
 async create(@Body() createContactDto: CreateContactDto,@Request() req) {
    const user = req.user
    return await this.contactsService.create(createContactDto,user.userId);
  }

 
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto,@Request() req) {
    const user = req.user
    return this.contactsService.update(+id, updateContactDto,user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.contactsService.remove(+id,user.userId);
  }
}
