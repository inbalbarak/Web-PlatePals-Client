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
  imageUrl?: string;
  averageRating?: number;
  imageUrl?: string;
  ingredients: string;
  instructions: string;
  createdAt?: string;
}

export interface PostDTOAttributes
  extends Omit<PostAttributes, "tags" | "author"> {
  tags: string[];
  author: string;
}
