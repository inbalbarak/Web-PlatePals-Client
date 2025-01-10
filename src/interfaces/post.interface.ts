export interface PostAttributes {
  _id?: string;
  title: string;
  author: string;
  tags: string[];
  rating?: number;
  ingredients: string;
  instructions: string;
}
