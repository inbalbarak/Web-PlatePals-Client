export interface PostAttributes {
  _id?: string;
  title: string;
  author: string;
  tags: string[];
  ratingCount?: number;
  imageUrl?: string;
  averageRating?: number;
  ingredients: string;
  instructions: string;
  createdAt?: string;
}
