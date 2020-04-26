import { IsString, IsNumberString } from "class-validator";

export class ResponseDTO {

    @IsString()
    content: string;

    @IsNumberString()
    question_id: string;

}