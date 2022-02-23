import {v4 as uuidV4} from 'uuid'
export class UploadSignatureHelper{
    static customFileName(req, file, cb) {      
        let fileExtension = "";
        if(file.mimetype.indexOf("jpeg") > -1){
            fileExtension = "jpg"
        }else if(file.mimetype.indexOf("png") > -1){
            fileExtension = "png";
        }
        cb(null, uuidV4()+"."+fileExtension);
      }
     
      static destinationPath(req, file, cb) {
        cb(null, './signature/')
      }
}