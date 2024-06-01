import { IsNotEmpty, IsNumber, IsString } from "class-validator"



export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsNumber()
    @IsNotEmpty()
    price: number


}