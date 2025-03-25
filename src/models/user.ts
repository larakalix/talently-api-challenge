import type { CommonModel } from "./generic";

export type User = CommonModel<string> & {
    email: string;
    name: string;
};
