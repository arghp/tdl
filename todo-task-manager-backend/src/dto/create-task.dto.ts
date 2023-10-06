import { Priority } from "src/models/priority.enum";
import { Status } from "src/models/status.enum";

export class CreateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly status: Status;
    readonly category: string;
    readonly priority: Priority;
    readonly dueDate: Date;
}