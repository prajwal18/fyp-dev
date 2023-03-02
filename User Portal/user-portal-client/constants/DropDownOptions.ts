import { DDOptionT } from "./CustomTypes";
import { UserTypes } from "./Constants";

export const UserRoleDD: Array<DDOptionT> = [
    {
        name:"Student", value: UserTypes.STUDENT
    },
    {
        name:"Teacher", value: UserTypes.TEACHER
    }
];