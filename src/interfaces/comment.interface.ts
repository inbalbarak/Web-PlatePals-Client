export interface CommentAttributes {
  _id?: string;
  content: string;
  author: {
    username: string;
    imageUrl?: string;
  };
  createdAt: string;
  postId: string;
  rating: number;
}

export interface CommentDTOAttributes
  extends Omit<CommentAttributes, "author" | "createdAt"> {
  author: string;
}
