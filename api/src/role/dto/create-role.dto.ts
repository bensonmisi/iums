 import{IsNotEmpty} from 'class-validator'
export class CreateRoleDto {

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    level:string

    creator?:number

}
