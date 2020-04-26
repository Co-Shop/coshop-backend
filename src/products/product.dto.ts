import { IsString, IsNumber } from "class-validator";

export class ProductDTO {

    @IsString()
    name: string;

    @IsString()
    producer: string;

}