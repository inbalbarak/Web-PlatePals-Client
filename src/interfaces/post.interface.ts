import { TagAttributes } from "services/tags.service";

export interface PostAttributes {
  _id?: string;
  title: string;
  author: {
    _id: string;
    username: string;
  };
  tags: TagAttributes[];
  ratingCount?: number;
  averageRating?: number;
  imageUrl?: string;
  ingredients: string;
  instructions: string;
  createdAt?: string;
  commentCount: number;
}

export interface PostDTOAttributes
  extends Omit<PostAttributes, "tags" | "author"> {
  tags: string[];
  author: string;
}
