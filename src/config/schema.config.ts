import { taskSchema } from "./../models/task.model";
import { userSchema } from "./../models/user.model";

export const SCHEMAS = {
    users: {
        name: "users",
        properties: userSchema,
    },
    tasks: {
        name: "tasks",
        properties: taskSchema,
    },
};
