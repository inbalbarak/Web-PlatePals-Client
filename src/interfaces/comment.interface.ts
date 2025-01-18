export interface CommentAttributes {
  _id?: string;
  content: string;
  author: {
    username: string;
    imageUrl: string;
  };
  postId: string;
  rating: number;
}

export interface CommentDTOAttributes
  extends Omit<CommentAttributes, "author"> {
  author: string;
}
