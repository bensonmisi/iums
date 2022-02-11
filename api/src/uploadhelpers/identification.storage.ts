import {diskStorage} from 'multer'
import {v4 as uuidV4} from 'uuid'
import path  = require('path')
import fs from 'fs'
import FileType from 'file-type'
var mime = require('mime-types')

type validfileExtention = "pdf";
type validMimeType ="application/pdf"

const validFileExtentions:validfileExtention[] = ['pdf']
const validMimeTypes:validMimeType[]=["application/pdf"]

export const identificationStorage={

storage:diskStorage({
    destination:'./public/identification',
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

export const  removeFile=async (filepath:string)=>{
    try {
        fs.unlinkSync(filepath)
    } catch (error) {
         console.log(error)
    }
}

