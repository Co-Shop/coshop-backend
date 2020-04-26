import { IsString, IsLatitude, IsLongitude } from "class-validator";

export class ShopDTO {

    @IsString()
    name: string;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lon: number;

}