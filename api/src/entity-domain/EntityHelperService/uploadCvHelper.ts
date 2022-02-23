import {v4 as uuidV4} from 'uuid'
var mime = require('mime-types')
export class UploadCvHelper{
    static customFileName(req, file, cb) {      
        let fileExtension = "";
        if(file.mimetype.indexOf("pdf") > -1){
            fileExtension = "pdf"
        }
        cb(null, uuidV4()+"."+fileExtension);
      }
     
      static destinationPath(req, file, cb) {
        cb(null, './signature/')
      }

      static isFileSafe(req,file,cb){
          
      }
}