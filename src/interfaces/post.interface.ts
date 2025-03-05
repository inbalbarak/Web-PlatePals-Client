export interface PostAttributes {
  _id?: string;
  title: string;
  author: string;
  tags: string[];
  ratingCount?: number;
  averageRating?: number;
  imageUrl?: string;
  ingredients: string;
  instructions: string;
  createdAt?: string;
}
