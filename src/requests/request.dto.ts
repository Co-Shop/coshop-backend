import {
    IsString,
    IsNumber,
    IsDate,
    IsLatitude,
    IsLongitude,
    IsDateString,
} from 'class-validator';
import { ProductDTO } from 'src/products/product.dto';

export class RequestDTO {
    @IsLatitude()
    lat: number;

    @IsLongitude()
    lon: number;

    @IsNumber()
    range: number;

    product: ProductDTO;

    @IsDateString()
    expires: Date | null;
}
