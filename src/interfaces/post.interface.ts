import { TagAttributes } from "services/tags.service";

export interface PostAttributes {
  _id?: string;
  title: string;
  author: string;
  tags: TagAttributes[];
  ratingCount?: number;
  imageUrl?: string;
  averageRating?: number;
  ingredients: string;
  instructions: string;
  createdAt?: string;
}

export interface PostDTOAttributes extends Omit<PostAttributes, "tags"> {
  tags: string[];
}
