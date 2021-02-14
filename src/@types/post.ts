export type Post = {
  createdAt: string;
  url: string;
  votesCount: number;
  description: string;
  name: string;
  id: number;
  thumbnail: {
    url: string;
  };
};