import type { Comment } from './comment';

export interface Post {
    id: number;
    title: string;
    content: string;
    comments: Comment[];
}