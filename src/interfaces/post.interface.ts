export interface PostAttributes {
  _id?: string;
  title: string;
  author: string;
  tags: string[];
  ratingCount?: number;
  averageRating?: number;
  ingredients: string;
  instructions: string;
}
