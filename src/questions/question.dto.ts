import { IsString, IsNumberString } from "class-validator";

export class QuestionDTO {

    @IsString()
    question: string;

    @IsNumberString()
    request_id: string;

}