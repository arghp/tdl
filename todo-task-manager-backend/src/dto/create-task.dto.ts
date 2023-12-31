import { IsDate, IsDateString, IsEnum, IsNotEmpty } from "class-validator";
import { Priority } from "./../models/priority.enum";
import { Status } from "./../models/status.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    readonly title: string;

    readonly description: string;

    @IsNotEmpty()
    @IsEnum(Status)
    readonly status: Status;

    @IsNotEmpty()
    readonly category: string;

    @IsNotEmpty()
    @IsEnum(Priority)
    readonly priority: Priority;

    @IsNotEmpty()
    @IsDateString()
    readonly dueDate: Date;
}