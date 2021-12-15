import { Injectable } from '@nestjs/common';
import { join } from 'path';
import readXlsxFile from 'read-excel-file';
import { CreateImporttransactionDto } from './dto/create-importtransaction.dto';
import { UpdateImporttransactionDto } from './dto/update-importtransaction.dto';
 import reader from 'xlsx'
@Injectable()
export class ImporttransactionService {
  create(filepath:any,userId:number) {
    /* console.log(filepath)
     readXlsxFile(filepath).then(rows=>{
       rows.forEach(row=>{
         console.log(row)
       })
     }).catch(err=>{
       console.log(err)
     }) */
     let dir = "./b3836e2f-c80e-4b22-a2ab-116e92ac9397.xlsx"
     const file = reader.readFile(dir)
     const sheets = file.SheetNames
     let data =[]

     for (let index = 0; index < sheets.length; index++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[index]])
         temp.forEach((res)=>{
           data.push(res)
         })
     }

     console.log(data)
  }

  findAll() {
    return `This action returns all importtransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importtransaction`;
  }

  update(id: number, updateImporttransactionDto: UpdateImporttransactionDto) {
    return `This action updates a #${id} importtransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} importtransaction`;
  }
}
