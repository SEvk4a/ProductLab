import { ICommentWithUser } from "./IComment";

export interface ICard {
    _id: string;
    imgSrc: string;
    comments: ICommentWithUser[];
}