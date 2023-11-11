import { IUser } from "./IUser";

export interface ICommentWithUser {
    comment: IComment;
    user: IUser;
}

export interface IComment {
    _id?: string;
    text: string;
    cardId: string;
    userId: string | undefined;
}