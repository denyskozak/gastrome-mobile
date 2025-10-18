export type VideoAuthor = {
  name: string;
  avatar: string;
};

export type VideoItem = {
  id: string;
  source: string;
  poster?: string;
  title: string;
  author: VideoAuthor;
  description?: string;
  tags?: string[];
  duration?: number;
};
