import { IsString, IsNumberString } from "class-validator";

export class QuestionDTO {

    @IsString()
    question: string;

}