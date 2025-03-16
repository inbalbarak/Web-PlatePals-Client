export interface UserAttributes {
  _id?: string;
  username: string;
  password: string;
  email: string;
  savedPosts?: string[];
  imageUrl?: string;
}
