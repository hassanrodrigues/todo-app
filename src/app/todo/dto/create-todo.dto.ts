import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty, IsIn } from "class-validator";

export class CreateTodoDto {

    @IsNotEmpty()
    @ApiProperty()
    task: string;

    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsIn([0, 1])
    isDone: number;
}