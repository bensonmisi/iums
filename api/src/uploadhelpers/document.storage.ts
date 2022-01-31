import {diskStorage} from 'multer'
import {v4 as uuidV4} from 'uuid'
import path  = require('path')
import fs from 'fs'
const fs2 = require('fs');
import * as pdf from 'pdf-page-counter'
import FileType from 'file-type'
import { Document } from 'src/documents/entities/document.entity'
import { HttpException, HttpStatus } from '@nestjs/common';
var mime = require('mime-types')

type validfileExtention = "pdf";
type validMimeType ="application/pdf"

const validFileExtentions:validfileExtention[] = ['pdf']
const validMimeTypes:validMimeType[]=["application/pdf"]

export const uploadBidderDocuments={

storage:diskStorage({
    destination:'./public/documents',
    filename:(req,file,cb)=>{
        const fileExtention:string = path.extname(file.originalname);
        const filename:string= uuidV4()+fileExtention;
        cb(null,filename)
    }  
}),
fileFilter:(req,file,cb)=>{
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null,true):cb(null,false)
}
};

 export const  isFileSafe=async (filepath:string)=>{
 const lookup = await mime.lookup(filepath)
 const allowedMimeTypes:validMimeType[]=validMimeTypes;
 return allowedMimeTypes.includes(lookup)
} 
export const pageCount = async (filepath:string,documentId:number)=>{
    const doc = await Document.findOne({where:{id:documentId}})
    const pages = doc.pages
    console.log(filepath)
    let databuffer = await fs2.readFileSync(filepath)
   return await pdf(databuffer).then(function(data){
        if(data.numpages>=pages){
            return {status:'success',message:''}
        }
        else{
          return {status:'error',message:"Uploaded document has "+data.numpages+" pages. Minimum  of "+pages+" pages is required "}
        }
    })
}

export const  removeFile=async (filepath:string)=>{
    try {
       await fs2.unlinkSync(filepath)
    } catch (error) {
         console.log(error)
    }
}

