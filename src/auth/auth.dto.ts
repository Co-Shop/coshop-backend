import { IsString, IsNotEmpty, IsAlphanumeric, NotContains, MaxLength, MinLength, IsEmail } from "class-validator";

export class AuthDTO {

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric('en-US', {
        message: 'Password must be alphanumeric',
    })
    @NotContains(' ', {
        message: 'Password should not contain spaces',
    })
    @MaxLength(128)
    @MinLength(8)
    password: string;

    @IsEmail()
    @IsString()
    email: string;

}